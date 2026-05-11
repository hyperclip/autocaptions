const FAQS = [
  {
    q: "How long does autocaptioning take?",
    a: "Most short videos (under a minute) finish in 30–90 seconds. Longer videos scale roughly with their duration. You'll see live progress in the upload card as the AI works.",
  },
  {
    q: "What video formats can I upload?",
    a: "MP4, MOV, WebM, MKV, and MPEG, up to 500MB per file. The output is always an MP4 (H.264) so it plays anywhere.",
  },
  {
    q: "How accurate are the captions?",
    a: "Captions come from OpenAI's Whisper model with word-level timestamps, so every word lights up in sync with the audio. Accuracy is excellent for clear English speech. Heavily accented or very noisy audio may need a manual touch-up.",
  },
  {
    q: "Is my video stored anywhere after processing?",
    a: "Your upload lives in temporary cloud storage only long enough for the AI to process it. The captioned video is available via a signed download link for 24 hours and then expires.",
  },
  {
    q: "Will the output have a watermark?",
    a: "No watermark and no branding on the rendered video. It's the same MP4 you'd produce in a paid editor — just done in one click.",
  },
  {
    q: "Do I need an account?",
    a: "No. No signup, no email, no credit card. The whole point of this site is one job, zero friction.",
  },
  {
    q: "What language do the captions support?",
    a: "Whisper handles English best out of the box, but it transcribes 50+ languages with strong accuracy. Drop a clip in any major language and try it.",
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      className="border-t"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <div className="mb-10">
          <div
            className="text-[11px] uppercase tracking-wider mb-3"
            style={{ color: "var(--muted)" }}
          >
            FAQ
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Frequently asked questions
          </h2>
        </div>
        <div
          className="rounded-2xl border divide-y"
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          {FAQS.map((item, i) => (
            <details key={item.q} className="group" open={i === 0}>
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 list-none">
                <h3 className="text-base font-medium">{item.q}</h3>
                <span
                  className="text-xl transition-transform group-open:rotate-45 select-none"
                  style={{ color: "var(--muted)" }}
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <div
                className="px-6 pb-6 text-sm leading-relaxed"
                style={{ color: "var(--muted)" }}
              >
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
