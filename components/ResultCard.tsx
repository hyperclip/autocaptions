"use client";

import { Download, RotateCcw } from "lucide-react";

type Props = {
  videoUrl: string;
  onReset: () => void;
};

export function ResultCard({ videoUrl, onReset }: Props) {
  return (
    <div className="flex flex-col gap-5">
      <div
        className="rounded-2xl overflow-hidden border"
        style={{ background: "#000", borderColor: "var(--border)" }}
      >
        <video
          src={videoUrl}
          controls
          playsInline
          className="w-full block aspect-video"
        />
      </div>
      <div className="flex items-center gap-3">
        <a
          href={videoUrl}
          download="captioned.mp4"
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-opacity hover:opacity-85"
          style={{ background: "var(--accent)", color: "var(--accent-fg)" }}
        >
          <Download className="h-4 w-4" strokeWidth={2} />
          Download
        </a>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
          style={{ color: "var(--muted)" }}
        >
          <RotateCcw className="h-4 w-4" strokeWidth={1.75} />
          Caption another
        </button>
      </div>
      <p className="text-xs" style={{ color: "var(--muted)" }}>
        This download link expires in 24 hours. Save it now if you want a
        permanent copy.
      </p>
    </div>
  );
}
