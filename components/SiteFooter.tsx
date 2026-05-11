import { Github } from "lucide-react";

export function SiteFooter() {
  return (
    <footer
      className="border-t"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="mx-auto max-w-5xl px-6 py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-sm" style={{ color: "var(--muted)" }}>
          Built on the{" "}
          <a
            href="https://hyperclip.co"
            target="_blank"
            rel="noreferrer"
            className="underline-offset-4 hover:underline"
            style={{ color: "var(--fg)" }}
          >
            Hyperclip API
          </a>
          .
        </div>
        <div className="flex items-center gap-5 text-sm">
          <a
            href="https://github.com/hyperclip/autocaptions"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-70"
            style={{ color: "var(--muted)" }}
          >
            <Github className="h-3.5 w-3.5" strokeWidth={1.75} />
            Source
          </a>
          <a
            href="https://docs.hyperclip.co"
            target="_blank"
            rel="noreferrer"
            className="transition-opacity hover:opacity-70"
            style={{ color: "var(--muted)" }}
          >
            API docs
          </a>
        </div>
      </div>
    </footer>
  );
}
