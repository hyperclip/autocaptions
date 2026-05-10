"use client";

import { Upload } from "lucide-react";
import { useCallback, useRef, useState } from "react";

type Props = {
  onFile: (file: File) => void;
  disabled?: boolean;
};

const MAX_BYTES = 500 * 1024 * 1024;

export function Dropzone({ onFile, disabled }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const accept = useCallback(
    (file: File) => {
      setError(null);
      if (!file.type.startsWith("video/")) {
        setError("That doesn't look like a video file.");
        return;
      }
      if (file.size > MAX_BYTES) {
        setError("File is over 500 MB.");
        return;
      }
      onFile(file);
    },
    [onFile],
  );

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (disabled) return;
          const file = e.dataTransfer.files?.[0];
          if (file) accept(file);
        }}
        disabled={disabled}
        className={[
          "w-full rounded-2xl border border-dashed",
          "px-8 py-16 sm:py-20",
          "flex flex-col items-center justify-center gap-3",
          "transition-all duration-150",
          "disabled:cursor-not-allowed disabled:opacity-50",
          dragOver
            ? "border-current bg-black/[0.03] dark:bg-white/[0.04] scale-[1.01]"
            : "hover:bg-black/[0.02] dark:hover:bg-white/[0.03]",
        ].join(" ")}
        style={{ borderColor: "var(--border)" }}
      >
        <div
          className="rounded-full p-3"
          style={{ background: "var(--surface)" }}
        >
          <Upload className="h-5 w-5" strokeWidth={1.5} />
        </div>
        <div className="text-center">
          <div className="text-sm font-medium">Drop a video here</div>
          <div className="text-xs mt-1" style={{ color: "var(--muted)" }}>
            or click to browse · MP4, MOV, WebM · up to 500&nbsp;MB
          </div>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="video/*"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) accept(file);
            e.target.value = "";
          }}
        />
      </button>
      {error && (
        <p className="mt-3 text-xs" style={{ color: "var(--danger)" }}>
          {error}
        </p>
      )}
    </div>
  );
}
