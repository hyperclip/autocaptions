import { Tool } from "@/components/Tool";
import { SiteHeader } from "@/components/SiteHeader";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { FAQ } from "@/components/FAQ";
import { SiteFooter } from "@/components/SiteFooter";

const PILLS = [
  "100% free",
  "No signup",
  "No watermark",
  "Word-level sync",
  "Up to 500MB",
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero with the tool */}
        <section className="mx-auto max-w-3xl px-6 pt-14 pb-20 sm:pt-20 sm:pb-24">
          <div className="text-center">
            <div
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs mb-6"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
                color: "var(--muted)",
              }}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: "#22c55e" }}
              />
              Free AI autocaptions · No signup
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.05]">
              Add captions to any video.
              <br />
              <span style={{ color: "var(--muted)" }}>In one click.</span>
            </h1>
            <p
              className="mt-5 text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              Drop in a video, get it back with bold TikTok-style captions
              burned in. Word-level sync, no watermark, no signup — powered by
              AI transcription.
            </p>
          </div>

          <div className="mt-10">
            <Tool />
          </div>

          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs">
            {PILLS.map((p) => (
              <li
                key={p}
                className="inline-flex items-center gap-1.5"
                style={{ color: "var(--muted)" }}
              >
                <span aria-hidden style={{ color: "#22c55e" }}>
                  ✓
                </span>
                {p}
              </li>
            ))}
          </ul>
        </section>

        <HowItWorks />
        <Features />
        <FAQ />
      </main>
      <SiteFooter />
    </>
  );
}
