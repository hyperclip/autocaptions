"use client";

type Props = {
  filename: string;
  phase:
    | { kind: "uploading"; pct: number }
    | { kind: "submitting" }
    | { kind: "processing"; status: string; currentStep: number | null };
};

function formatPhase(phase: Props["phase"]): string {
  switch (phase.kind) {
    case "uploading":
      return `Uploading · ${Math.floor(phase.pct)}%`;
    case "submitting":
      return "Submitting to Hyperclip…";
    case "processing": {
      if (phase.status === "queued") return "Queued";
      if (phase.status === "running") {
        return phase.currentStep != null
          ? `Processing · step ${phase.currentStep + 1}`
          : "Processing";
      }
      return phase.status;
    }
  }
}

export function ProgressCard({ filename, phase }: Props) {
  const showBar = phase.kind === "uploading";
  return (
    <div
      className="rounded-2xl border p-6"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}
    >
      <div className="flex items-center gap-3">
        <span
          className="pulse-dot h-2 w-2 rounded-full"
          style={{ background: "var(--fg)" }}
        />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">{filename}</div>
          <div className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
            {formatPhase(phase)}
          </div>
        </div>
      </div>

      {showBar && (
        <div
          className="mt-5 h-1 w-full rounded-full overflow-hidden"
          style={{ background: "var(--border)" }}
        >
          <div
            className="h-full transition-[width] duration-150 ease-out"
            style={{
              width: `${phase.pct}%`,
              background: "var(--fg)",
            }}
          />
        </div>
      )}
    </div>
  );
}
