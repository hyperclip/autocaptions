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
  const res = await fetch(`${baseUrl}${path}`, {
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
    const errBody = body as { error_code?: string; error_message?: string; message?: string } | null;
    const message =
      errBody?.error_message ??
      errBody?.message ??
      (typeof body === "string" ? body : `Hyperclip request failed (${res.status})`);
    throw new HyperclipError(message, res.status, errBody?.error_code);
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
