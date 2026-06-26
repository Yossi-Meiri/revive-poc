"use client";

import { useState, useRef } from "react";

const MUSIC_TRACKS = [
  { id: "gentle", label: "Gentle Memories" },
  { id: "uplifting", label: "Uplifting Journey" },
  { id: "nostalgic", label: "Nostalgic Days" },
];

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [email, setEmail] = useState("");
  const [music, setMusic] = useState("gentle");
  const [status, setStatus] = useState<"idle" | "uploading" | "submitted">("idle");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFiles(selected: FileList | null) {
    if (!selected) return;
    const arr = Array.from(selected).filter((f) => f.type.startsWith("image/"));
    if (arr.length < 1 || arr.length > 10) {
      setError("Please select between 1 and 10 images.");
      return;
    }
    setError("");
    setFiles(arr);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!files.length || !email) return;

    setStatus("uploading");
    setError("");

    const form = new FormData();
    files.forEach((f) => form.append("images", f));
    form.append("email", email);
    form.append("music", music);

    try {
      const res = await fetch("/api/submit", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setStatus("submitted");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("idle");
    }
  }

  if (status === "submitted") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-stone-50 p-6">
        <div className="max-w-md text-center space-y-4">
          <div className="text-5xl">✉️</div>
          <h1 className="text-2xl font-semibold text-stone-800">You're all set!</h1>
          <p className="text-stone-600">
            We're restoring and animating your photos. When the video is ready we'll send it to{" "}
            <span className="font-medium text-stone-800">{email}</span>.
          </p>
          <p className="text-sm text-stone-400">This usually takes 10–20 minutes.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold text-stone-800">Revive</h1>
          <p className="text-stone-500">Upload old photos. We'll restore, animate, and send you a video.</p>
        </div>

        {/* Upload zone */}
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
          className="border-2 border-dashed border-stone-300 rounded-xl p-8 text-center cursor-pointer hover:border-stone-400 transition-colors"
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          {files.length === 0 ? (
            <div className="space-y-2 text-stone-400">
              <div className="text-4xl">📷</div>
              <p className="text-sm">Click or drag up to 10 photos here</p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2 justify-center">
                {files.map((f) => (
                  <div key={f.name} className="text-xs bg-stone-100 rounded px-2 py-1 text-stone-600 max-w-[120px] truncate">
                    {f.name}
                  </div>
                ))}
              </div>
              <p className="text-xs text-stone-400">{files.length} photo{files.length !== 1 ? "s" : ""} selected — click to change</p>
            </div>
          )}
        </div>

        {/* Music picker */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-stone-700">Background music</label>
          <div className="grid grid-cols-3 gap-2">
            {MUSIC_TRACKS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setMusic(t.id)}
                className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                  music === t.id
                    ? "border-stone-800 bg-stone-800 text-white"
                    : "border-stone-200 bg-white text-stone-600 hover:border-stone-400"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-stone-700">Your email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-stone-200 px-4 py-2.5 text-sm outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-100"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={!files.length || !email || status === "uploading"}
          className="w-full rounded-xl bg-stone-800 px-6 py-3 text-white font-medium hover:bg-stone-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {status === "uploading" ? "Uploading…" : "Revive my photos →"}
        </button>
      </form>
    </main>
  );
}
