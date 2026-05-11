"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import { Dropzone } from "@/components/Dropzone";
import { ProgressCard } from "@/components/ProgressCard";
import { ResultCard } from "@/components/ResultCard";
import { ErrorCard } from "@/components/ErrorCard";
import { StylePicker } from "@/components/StylePicker";
import { DEFAULT_STYLE_ID } from "@/lib/captionStyles";

type State =
  | { kind: "idle" }
  | { kind: "uploading"; file: File; pct: number }
  | { kind: "submitting"; file: File }
  | {
      kind: "processing";
      file: File;
      runId: string;
      status: string;
      currentStep: number | null;
    }
  | { kind: "done"; videoUrl: string }
  | { kind: "error"; message: string };

export default function Home() {
  const [state, setState] = useState<State>({ kind: "idle" });
  const [styleId, setStyleId] = useState<string>(DEFAULT_STYLE_ID);
  const cancelledRef = useRef(false);

  const reset = useCallback(() => {
    cancelledRef.current = true;
    setState({ kind: "idle" });
  }, []);

  const start = useCallback(async (file: File) => {
    cancelledRef.current = false;
    setState({ kind: "uploading", file, pct: 0 });

    let blobUrl: string;
    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
        contentType: file.type || "video/mp4",
        onUploadProgress: (e) => {
          if (cancelledRef.current) return;
          setState({ kind: "uploading", file, pct: e.percentage });
        },
      });
      blobUrl = blob.url;
    } catch (err) {
      if (cancelledRef.current) return;
      setState({
        kind: "error",
        message: err instanceof Error ? err.message : "Upload failed",
      });
      return;
    }

    if (cancelledRef.current) return;
    setState({ kind: "submitting", file });

    let runId: string;
    try {
      const res = await fetch("/api/captions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blobUrl, styleId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Failed to start captioning");
      runId = data.runId as string;
    } catch (err) {
      if (cancelledRef.current) return;
      setState({
        kind: "error",
        message: err instanceof Error ? err.message : "Failed to start",
      });
      return;
    }

    if (cancelledRef.current) return;
    setState({
      kind: "processing",
      file,
      runId,
      status: "queued",
      currentStep: null,
    });
  }, [styleId]);

  useEffect(() => {
    if (state.kind !== "processing") return;
    let stopped = false;
    const tick = async () => {
      try {
        const res = await fetch(`/api/captions/${state.runId}`, {
          cache: "no-store",
        });
        const data = await res.json();
        if (stopped || cancelledRef.current) return;
        if (!res.ok) {
          setState({
            kind: "error",
            message: data?.error ?? "Status check failed",
          });
          return;
        }
        if (data.status === "completed" && data.videoUrl) {
          setState({ kind: "done", videoUrl: data.videoUrl });
          return;
        }
        if (data.status === "failed" || data.status === "cancelled") {
          setState({
            kind: "error",
            message:
              data.errorMessage ?? `Run ${data.status}`,
          });
          return;
        }
        setState((prev) =>
          prev.kind === "processing"
            ? {
                ...prev,
                status: data.status,
                currentStep: data.currentStep,
              }
            : prev,
        );
      } catch (err) {
        if (stopped || cancelledRef.current) return;
        setState({
          kind: "error",
          message: err instanceof Error ? err.message : "Polling failed",
        });
      }
    };
    const id = setInterval(tick, 4000);
    void tick();
    return () => {
      stopped = true;
      clearInterval(id);
    };
  }, [state.kind, state.kind === "processing" ? state.runId : null]);

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col px-6 py-12 sm:py-20">
      <header className="mb-12 sm:mb-16">
        <h1 className="text-2xl font-medium tracking-tight">Autocaptions</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
          Drop in a video. Get it back with captions burned in.
        </p>
      </header>

      <section className="flex-1">
        {state.kind === "idle" && (
          <div className="flex flex-col gap-6">
            <Dropzone onFile={start} />
            <StylePicker value={styleId} onChange={setStyleId} />
          </div>
        )}

        {state.kind === "uploading" && (
          <ProgressCard
            filename={state.file.name}
            phase={{ kind: "uploading", pct: state.pct }}
          />
        )}

        {state.kind === "submitting" && (
          <ProgressCard
            filename={state.file.name}
            phase={{ kind: "submitting" }}
          />
        )}

        {state.kind === "processing" && (
          <ProgressCard
            filename={state.file.name}
            phase={{
              kind: "processing",
              status: state.status,
              currentStep: state.currentStep,
            }}
          />
        )}

        {state.kind === "done" && (
          <ResultCard videoUrl={state.videoUrl} onReset={reset} />
        )}

        {state.kind === "error" && (
          <ErrorCard message={state.message} onReset={reset} />
        )}
      </section>

      <footer className="mt-16 pt-8 text-xs" style={{ color: "var(--muted)" }}>
        Powered by{" "}
        <a
          href="https://hyperclip.co"
          target="_blank"
          rel="noreferrer"
          className="underline-offset-4 hover:underline"
        >
          Hyperclip
        </a>
        .
      </footer>
    </main>
  );
}
