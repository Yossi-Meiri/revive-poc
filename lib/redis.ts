import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export type JobState = {
  email: string;
  music: string;
  imageUrls: string[];
  restoredUrls: string[];
  clipUrls: string[];
  total: number;
  phase: "restoring" | "animating" | "done" | "error";
  currentIndex: number;
};

export async function getJob(jobId: string): Promise<JobState | null> {
  return redis.get<JobState>(`job:${jobId}`);
}

export async function setJob(jobId: string, state: JobState): Promise<void> {
  await redis.set(`job:${jobId}`, state, { ex: 60 * 60 * 24 }); // 24h TTL
}
