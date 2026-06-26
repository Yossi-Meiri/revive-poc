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
    model: "wavespeedai/wan-2.1-i2v-480p",
    input: {
      image: imageUrl,
      prompt: "Gentle cinematic life, subtle movement, soft natural lighting, warm nostalgic feel",
    },
    webhook: webhookUrl,
    webhook_events_filter: ["completed"],
  });
}
