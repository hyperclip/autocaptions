import {
  Mic,
  Type,
  Zap,
  ShieldCheck,
  Globe,
  Heart,
} from "lucide-react";

const FEATURES = [
  {
    icon: Mic,
    title: "Word-level sync",
    body: "Captions track audio at the word level — every word pops in exactly when it's spoken, the way the best TikToks do it.",
  },
  {
    icon: Type,
    title: "Bold viral look",
    body: "Tall Anton font, gold word highlight, thick black stroke. Calibrated to read on mobile in two seconds flat.",
  },
  {
    icon: Globe,
    title: "Any video format",
    body: "MP4, MOV, WebM, MKV, MPEG — drop the file you have, get back an MP4 anyone can play.",
  },
  {
    icon: ShieldCheck,
    title: "No watermark",
    body: "No logo, no banner, no \"Made with…\" tag. The output is clean and yours to post.",
  },
  {
    icon: Zap,
    title: "Fast",
    body: "Most clips under a minute finish in 30–90 seconds. Progress streams to your browser in real time.",
  },
  {
    icon: Heart,
    title: "Free forever",
    body: "No signup, no email, no credit card. Drop a video, hit download, move on.",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="border-t"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <div className="mb-12">
          <div
            className="text-[11px] uppercase tracking-wider mb-3"
            style={{ color: "var(--muted)" }}
          >
            Features
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Built for short-form video.
          </h2>
          <p
            className="mt-3 text-sm sm:text-base max-w-xl"
            style={{ color: "var(--muted)" }}
          >
            One tool, one job: burn in captions that look like they belong on
            TikTok, Reels, or YouTube Shorts.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="rounded-2xl border p-6 transition-colors"
                style={{
                  background: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                <div
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg mb-4"
                  style={{
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </div>
                <h3 className="text-base font-semibold mb-1.5">{f.title}</h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--muted)" }}
                >
                  {f.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
