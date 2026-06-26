import { NextRequest, NextResponse } from "next/server";
import { getJob, setJob } from "@/lib/redis";
import { startRestoration, startAnimation } from "@/lib/replicate";
import { uploadToR2 } from "@/lib/r2";
import { Resend } from "resend";

export const maxDuration = 30;

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get("jobId")!;
  const index = parseInt(searchParams.get("index")!);
  const step = searchParams.get("step") as "restore" | "animate";

  const body = await req.json();
  if (body.status !== "succeeded") {
    console.error(`Job ${jobId} step ${step}[${index}] failed:`, body.error);
    return NextResponse.json({ ok: false });
  }

  const job = await getJob(jobId);
  if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });

  if (step === "restore") {
    const tempUrl = Array.isArray(body.output) ? body.output[0] : body.output;

    // Re-upload restored image to R2 so animation model can access it permanently
    const imgRes = await fetch(tempUrl);
    const imgBuffer = Buffer.from(await imgRes.arrayBuffer());
    const imgKey = `jobs/${jobId}/restored/restored-${index}.png`;
    const restoredUrl = await uploadToR2(imgKey, imgBuffer, "image/png");

    const restored = [...job.restoredUrls];
    restored[index] = restoredUrl;
    await setJob(jobId, { ...job, restoredUrls: restored });

    // Start animation with permanent R2 URL
    await startAnimation(jobId, restoredUrl, index);

  } else if (step === "animate") {
    // Download the video and re-upload to R2 for a permanent URL
    const videoUrl = Array.isArray(body.output) ? body.output[0] : body.output;
    const videoRes = await fetch(videoUrl);
    const videoBuffer = Buffer.from(await videoRes.arrayBuffer());
    const key = `jobs/${jobId}/clips/clip-${index}.mp4`;
    const permanentUrl = await uploadToR2(key, videoBuffer, "video/mp4");

    const clips = [...job.clipUrls];
    clips[index] = permanentUrl;
    const updatedJob = { ...job, clipUrls: clips };
    await setJob(jobId, updatedJob);

    const nextIndex = index + 1;

    if (nextIndex < job.total) {
      // Start restoration of the next image
      await setJob(jobId, { ...updatedJob, currentIndex: nextIndex });
      await startRestoration(jobId, job.imageUrls[nextIndex], nextIndex);
    } else {
      // All clips done — send email
      await setJob(jobId, { ...updatedJob, phase: "done" });

      // For now link all clips individually — stitching comes later
      const clipLinks = clips
        .map((url, i) => `<li><a href="${url}">Photo ${i + 1}</a></li>`)
        .join("");

      await resend.emails.send({
        from: "Revive <onboarding@resend.dev>",
        to: job.email,
        subject: "Your revived memories are ready!",
        html: `
          <p>Hi there,</p>
          <p>Your photos have been restored and animated. Here are your clips:</p>
          <ul>${clipLinks}</ul>
          <p>Links expire in 24 hours.</p>
          <p>— The Revive team</p>
        `,
      });
    }
  }

  return NextResponse.json({ ok: true });
}
