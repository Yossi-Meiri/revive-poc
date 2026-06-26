import Replicate from "replicate";

export const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN! });

export async function startRestoration(jobId: string, imageUrl: string, index: number): Promise<void> {
  const webhookUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhook?jobId=${jobId}&index=${index}&step=restore`;
  await replicate.predictions.create({
    version: "cc4956dd26fa5a7185d5660cc9100fab1b8070a1d1654a8bb5eb6d443b020bb2",
    input: { image: imageUrl, codeformer_fidelity: 0.7, background_enhance: true, face_upsample: true, upscale: 2 },
    webhook: webhookUrl,
    webhook_events_filter: ["completed"],
  });
}

export async function startAnimation(jobId: string, imageUrl: string, index: number): Promise<void> {
  const webhookUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhook?jobId=${jobId}&index=${index}&step=animate`;
  await replicate.predictions.create({
    version: "3f0457e4619daac51203dedb472816fd4af51f3149fa7a9e0b5ffcf1b8172438",
    input: {
      input_image: imageUrl,
      video_length: "25_frames_with_svd_xt",
      frames_per_second: 6,
      motion_bucket_id: 60,
    },
    webhook: webhookUrl,
    webhook_events_filter: ["completed"],
  });
}
