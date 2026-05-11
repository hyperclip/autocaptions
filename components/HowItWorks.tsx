import { Upload, Sparkles, Download } from "lucide-react";

const STEPS = [
  {
    icon: Upload,
    title: "Drop your video",
    body: "MP4, MOV, WebM, or MKV up to 500MB. Browser uploads directly — your file never sits on our servers longer than needed.",
  },
  {
    icon: Sparkles,
    title: "AI transcribes and styles it",
    body: "OpenAI Whisper picks up every word with frame-accurate timing, and the captions get burned in with a bold Anton-font TikTok look.",
  },
  {
    icon: Download,
    title: "Download the captioned MP4",
    body: "Preview in-browser the moment it's ready. Download once and post it anywhere — no watermark, no signup, no email.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how"
      className="border-t"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <div className="mb-12">
          <div
            className="text-[11px] uppercase tracking-wider mb-3"
            style={{ color: "var(--muted)" }}
          >
            How it works
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Three steps. About a minute.
          </h2>
        </div>
        <ol className="grid gap-6 sm:grid-cols-3">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <li
                key={step.title}
                className="rounded-2xl border p-6"
                style={{
                  background: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg"
                    style={{
                      background: "var(--bg)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </div>
                  <span
                    className="font-mono text-xs"
                    style={{ color: "var(--muted)" }}
                  >
                    0{i + 1}
                  </span>
                </div>
                <h3 className="text-base font-semibold mb-2">{step.title}</h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--muted)" }}
                >
                  {step.body}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
