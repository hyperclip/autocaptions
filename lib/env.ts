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
};

export function serverEnv(): ServerEnv {
  const missing = REQUIRED.filter((k) => !process.env[k]);
  if (missing.length > 0) {
    throw new Error(
      `Missing required env vars: ${missing.join(", ")}. See .env.example.`,
    );
  }

  const rawIndex = process.env.HYPERCLIP_VIDEO_STEP_INDEX ?? "0";
  const videoStepIndex = Number.parseInt(rawIndex, 10);
  if (!Number.isFinite(videoStepIndex) || videoStepIndex < 0) {
    throw new Error(
      `HYPERCLIP_VIDEO_STEP_INDEX must be a non-negative integer (got "${rawIndex}").`,
    );
  }

  return {
    baseUrl: (process.env.HYPERCLIP_BASE_URL ?? DEFAULT_BASE_URL).replace(
      /\/$/,
      "",
    ),
    apiKey: process.env.HYPERCLIP_API_KEY!,
    flowId: process.env.HYPERCLIP_FLOW_ID!,
    videoStepIndex,
  };
}
