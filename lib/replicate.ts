import Replicate from "replicate";

export const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN! });

export async function startRestoration(jobId: string, imageUrl: string, index: number): Promise<void> {
  const webhookUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhook?jobId=${jobId}&index=${index}&step=restore`;
  await replicate.predictions.create({
    version: "0fbacf7afc6817f26a7f27e40408d7e74a0e24f0b1f0e49e39aa48f7c60ef600",
    input: { img: imageUrl, version: "v1.4", scale: 2 },
    webhook: webhookUrl,
    webhook_events_filter: ["completed"],
  });
}

export async function startAnimation(jobId: string, imageUrl: string, index: number): Promise<void> {
  const webhookUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhook?jobId=${jobId}&index=${index}&step=animate`;
  await replicate.predictions.create({
    version: "wavespeedai/wan-2.1-i2v-480p",
    input: {
      image: imageUrl,
      prompt: "Gentle cinematic life, subtle movement, soft natural lighting, warm nostalgic feel",
      num_frames: 81,
    },
    webhook: webhookUrl,
    webhook_events_filter: ["completed"],
  });
}
