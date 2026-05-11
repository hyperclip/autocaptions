import { Github } from "lucide-react";

export function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-10 backdrop-blur"
      style={{
        background:
          "color-mix(in srgb, var(--bg) 80%, transparent)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2.5 group">
          <span
            className="inline-flex h-7 w-7 items-center justify-center rounded-md text-[13px] font-bold"
            style={{
              background: "var(--accent)",
              color: "var(--accent-fg)",
            }}
          >
            AC
          </span>
          <span className="text-sm font-semibold tracking-tight">
            Autocaptions
          </span>
        </a>
        <nav className="flex items-center gap-5 text-sm">
          <a
            href="#how"
            className="hidden sm:inline transition-opacity hover:opacity-70"
            style={{ color: "var(--muted)" }}
          >
            How it works
          </a>
          <a
            href="#features"
            className="hidden sm:inline transition-opacity hover:opacity-70"
            style={{ color: "var(--muted)" }}
          >
            Features
          </a>
          <a
            href="#faq"
            className="hidden sm:inline transition-opacity hover:opacity-70"
            style={{ color: "var(--muted)" }}
          >
            FAQ
          </a>
          <a
            href="https://github.com/hyperclip/autocaptions"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-70"
            style={{ color: "var(--muted)" }}
            aria-label="View source on GitHub"
          >
            <Github className="h-4 w-4" strokeWidth={1.75} />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
