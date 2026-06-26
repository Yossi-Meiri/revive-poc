import { NextRequest, NextResponse } from "next/server";
import { uploadToR2 } from "@/lib/r2";
import { setJob } from "@/lib/redis";
import { startRestoration } from "@/lib/replicate";
import { randomUUID } from "crypto";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const email = form.get("email") as string;
  const music = form.get("music") as string;
  const images = form.getAll("images") as File[];

  if (!email || !images.length) {
    return NextResponse.json({ error: "Missing email or images" }, { status: 400 });
  }

  const jobId = randomUUID();

  // Upload all images to R2
  const imageUrls: string[] = [];
  for (const image of images) {
    const buffer = Buffer.from(await image.arrayBuffer());
    const key = `jobs/${jobId}/input/${randomUUID()}-${image.name}`;
    const url = await uploadToR2(key, buffer, image.type);
    imageUrls.push(url);
  }

  // Save initial job state to Redis
  await setJob(jobId, {
    email,
    music,
    imageUrls,
    restoredUrls: [],
    clipUrls: [],
    total: images.length,
    phase: "restoring",
    currentIndex: 0,
  });

  // Kick off restoration of the first image — webhook chain handles the rest
  await startRestoration(jobId, imageUrls[0], 0);

  return NextResponse.json({ jobId });
}
