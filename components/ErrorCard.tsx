"use client";

import { AlertCircle, RotateCcw } from "lucide-react";

type Props = {
  message: string;
  onReset: () => void;
};

export function ErrorCard({ message, onReset }: Props) {
  return (
    <div
      className="rounded-2xl border p-5"
      style={{
        background: "var(--danger-bg)",
        borderColor: "var(--danger-border)",
        color: "var(--danger)",
      }}
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" strokeWidth={1.75} />
        <div className="flex-1">
          <div className="text-sm font-medium">Something went wrong</div>
          <p className="text-sm mt-1 opacity-90 break-words">{message}</p>
          <button
            type="button"
            onClick={onReset}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
          >
            <RotateCcw className="h-3.5 w-3.5" strokeWidth={2} />
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
