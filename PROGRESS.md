# Revive POC — Progress

## What it does
Users upload 1–10 old photos on a website. Each photo is restored and animated into a short video clip. The clips are emailed to the user as download links.

## Architecture

```
User uploads photos (browser)
        ↓
Vercel API /api/submit
  - Uploads images to Cloudflare R2
  - Saves job state to Upstash Redis
  - Kicks off CodeFormer restoration for photo[0] via Replicate
        ↓
Replicate calls /api/webhook?step=restore
  - Saves restored image URL to Redis
  - Kicks off Wan 2.1 animation via Replicate
        ↓
Replicate calls /api/webhook?step=animate
  - Downloads video, re-uploads to R2 (permanent URL)
  - If more photos remain → starts restore for photo[n+1]
  - If all done → sends email via Resend with clip links
```

## Stack
| Layer | Service | Cost |
|---|---|---|
| Frontend + API | Vercel (Next.js) | Free |
| Job state | Upstash Redis | Free |
| Image restoration | Replicate — CodeFormer | ~$0.05/image |
| Image-to-video | Replicate — Wan 2.1 480p | $0.09/sec × 5sec |
| File storage | Cloudflare R2 | Free (10GB) |
| Email | Resend | Free (3k/month) |

Estimated cost per user: ~$0.50 restoration + ~$4.50 animation = **~$5 for 10 photos**

## What's done
- [x] Next.js app scaffolded and deployed to Vercel
- [x] Upload UI with drag-and-drop, music picker, email field
- [x] Images uploaded to Cloudflare R2
- [x] Job state persisted in Upstash Redis
- [x] Webhook-driven pipeline (no Vercel timeout risk)
- [x] CodeFormer restoration via Replicate
- [x] Wan 2.1 image-to-video animation via Replicate
- [x] Email sent via Resend with per-clip download links

## What's still TODO
- [ ] **Video stitching** — currently emails individual clips, not one combined video. Need ffmpeg to concatenate clips + add music track.
- [ ] **Music** — tracks are selectable in the UI but not yet applied to the video.
- [ ] **Dissolve transition** — the original plan included a cross-dissolve from the old photo to the restored version before the animation clip. Not yet implemented.
- [ ] **Error handling for webhooks** — if a Replicate job fails, the pipeline silently stops. Should email the user that something went wrong.
- [ ] **Job status page** — nice to have: a `/status/:jobId` page the user can check instead of just waiting for email.
- [ ] **Render worker for ffmpeg** — stitching can't run on Vercel (timeout). Plan is a persistent Node.js worker on Render.com free tier that does the final ffmpeg stitch and uploads the combined video to R2.

## Known issues / decisions pending
- Resend free tier can only send to your own verified email (no custom domain). Fine for POC, needs a domain for real users.
- R2 public URLs don't expire — links in emails are permanent until manually deleted.
- Photos are processed sequentially (one at a time). Could be parallelized later for speed.
