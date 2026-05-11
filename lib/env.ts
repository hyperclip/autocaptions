// Production Hyperclip API base. Override with HYPERCLIP_BASE_URL only for
// staging or self-hosted setups — most callers should leave it unset.
const DEFAULT_BASE_URL =
  "https://zjasnfhprfiftozodqsz.supabase.co/functions/v1/api-v1";

const REQUIRED = ["HYPERCLIP_API_KEY", "HYPERCLIP_FLOW_ID"] as const;

export type ServerEnv = {
  baseUrl: string;
  apiKey: string;
  flowId: string;
  videoStepIndex: number;
  captionStepIndex: number;
};

function parseStepIndex(name: string, value: string | undefined, fallback: number): number {
  const raw = value ?? String(fallback);
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed < 0) {
    throw new Error(
      `${name} must be a non-negative integer (got "${raw}").`,
    );
  }
  return parsed;
}

export function serverEnv(): ServerEnv {
  const missing = REQUIRED.filter((k) => !process.env[k]);
  if (missing.length > 0) {
    throw new Error(
      `Missing required env vars: ${missing.join(", ")}. See .env.example.`,
    );
  }

  return {
    baseUrl: (process.env.HYPERCLIP_BASE_URL ?? DEFAULT_BASE_URL).replace(
      /\/$/,
      "",
    ),
    apiKey: process.env.HYPERCLIP_API_KEY!,
    flowId: process.env.HYPERCLIP_FLOW_ID!,
    videoStepIndex: parseStepIndex(
      "HYPERCLIP_VIDEO_STEP_INDEX",
      process.env.HYPERCLIP_VIDEO_STEP_INDEX,
      0,
    ),
    captionStepIndex: parseStepIndex(
      "HYPERCLIP_CAPTION_STEP_INDEX",
      process.env.HYPERCLIP_CAPTION_STEP_INDEX,
      1,
    ),
  };
}
