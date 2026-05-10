import { NextResponse } from "next/server";
import { getRun, HyperclipError } from "@/lib/hyperclip";

export async function GET(
  _request: Request,
  context: { params: Promise<{ runId: string }> },
) {
  const { runId } = await context.params;

  if (!runId || !/^[a-zA-Z0-9-]+$/.test(runId)) {
    return NextResponse.json({ error: "Invalid run id" }, { status: 400 });
  }

  try {
    const run = await getRun(runId);
    return NextResponse.json({
      status: run.status,
      currentStep: run.current_step,
      videoUrl: run.video_url,
      errorCode: run.error_code,
      errorMessage: run.error_message,
      startedAt: run.started_at,
      completedAt: run.completed_at,
    });
  } catch (error) {
    if (error instanceof HyperclipError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.status >= 400 && error.status < 600 ? error.status : 502 },
      );
    }
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
