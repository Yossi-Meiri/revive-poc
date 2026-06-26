import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";
import { uploadToR2 } from "@/lib/r2";
import { Resend } from "resend";

export const maxDuration = 300;

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN! });
const resend = new Resend(process.env.RESEND_API_KEY!);

async function restoreImage(imageUrl: string): Promise<string> {
  const output = await replicate.run(
    "tencentarc/gfpgan:0fbacf7afc6817f26a7f27e40408d7e74a0e24f0b1f0e49e39aa48f7c60ef600",
    { input: { img: imageUrl, version: "v1.4", scale: 2 } }
  ) as unknown as string;
  return output;
}

async function animateImage(imageUrl: string): Promise<string> {
  const output = await replicate.run(
    "wavespeedai/wan-2.1-i2v-480p",
    {
      input: {
        image: imageUrl,
        prompt: "Gentle, cinematic life — subtle movement, soft natural lighting, warm nostalgic feel",
        num_frames: 81,
      }
    }
  ) as unknown as string;
  return output;
}

export async function POST(req: NextRequest) {
  const { jobId, imageUrls, email, music } = await req.json();

  try {
    const videoUrls: string[] = [];

    for (let i = 0; i < imageUrls.length; i++) {
      const originalUrl = imageUrls[i];

      // Step 1: Restore
      const restoredUrl = await restoreImage(originalUrl);

      // Step 2: Animate restored image
      const videoUrl = await animateImage(restoredUrl);

      // Download video and re-upload to our R2 so the link is permanent
      const videoRes = await fetch(videoUrl);
      const videoBuffer = Buffer.from(await videoRes.arrayBuffer());
      const key = `jobs/${jobId}/clips/clip-${i}.mp4`;
      const ourVideoUrl = await uploadToR2(key, videoBuffer, "video/mp4");
      videoUrls.push(ourVideoUrl);
    }

    // For now, use the first clip as the "final" video
    // TODO: stitch clips + add music with ffmpeg on Render worker
    const finalVideoUrl = videoUrls[0];

    await resend.emails.send({
      from: "Revive <onboarding@resend.dev>",
      to: email,
      subject: "Your revived memories are ready!",
      html: `
        <p>Hi there,</p>
        <p>Your photos have been restored and animated. Here's your video:</p>
        <p><a href="${finalVideoUrl}" style="font-size:18px;font-weight:bold;">Watch your video →</a></p>
        <p>The link expires in 7 days.</p>
        <p>— The Revive team</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Processing error:", err);
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }
}
