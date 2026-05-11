import { serverEnv } from "./env";

export type RunStatus =
  | "queued"
  | "running"
  | "completed"
  | "failed"
  | "cancelled";

export type Run = {
  id: string;
  status: RunStatus;
  current_step: number | null;
  video_url: string | null;
  error_code: string | null;
  error_message: string | null;
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
};

export class HyperclipError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: string,
  ) {
    super(message);
    this.name = "HyperclipError";
  }
}

async function request<T>(
  path: string,
  init: RequestInit & { body?: string } = {},
): Promise<T> {
  const { baseUrl, apiKey } = serverEnv();
  const url = `${baseUrl}${path}`;
  const method = init.method ?? "GET";
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });

  const text = await res.text();
  let body: unknown = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text;
  }

  if (!res.ok) {
    // Log raw request/response to Vercel function logs so 4xx/5xx
    // responses can be inspected end-to-end (URL, method, status, body).
    console.error("[hyperclip] non-2xx response", {
      method,
      url,
      status: res.status,
      contentType: res.headers.get("content-type"),
      bodyPreview: typeof text === "string" ? text.slice(0, 1000) : null,
    });
  }

  if (!res.ok) {
    // Hyperclip's HTTP-level errors are shaped `{ error: { code, message } }`.
    // Run-level errors on the run object use `error_code` / `error_message` at
    // top level. Surface whichever is present so the UI shows a useful reason.
    const errBody = body as
      | {
          error?: { code?: string; message?: string };
          error_code?: string;
          error_message?: string;
          message?: string;
          code?: string;
        }
      | null;
    const message =
      errBody?.error?.message ??
      errBody?.error_message ??
      errBody?.message ??
      (typeof body === "string" && body.length > 0 ? body : null) ??
      `Hyperclip request failed (${res.status})`;
    const code = errBody?.error?.code ?? errBody?.error_code ?? errBody?.code;
    throw new HyperclipError(message, res.status, code);
  }

  return body as T;
}

export async function createRun(args: {
  videoUrl: string;
  idempotencyKey: string;
}): Promise<{ id: string; status: RunStatus; created_at: string }> {
  const { flowId, videoStepIndex } = serverEnv();
  return request("/runs", {
    method: "POST",
    headers: { "Idempotency-Key": args.idempotencyKey },
    body: JSON.stringify({
      flow_id: flowId,
      inputs: {
        media: {
          [String(videoStepIndex)]: { url: args.videoUrl, type: "video" },
        },
      },
    }),
  });
}

export async function getRun(runId: string): Promise<Run> {
  return request(`/runs/${encodeURIComponent(runId)}`);
}
