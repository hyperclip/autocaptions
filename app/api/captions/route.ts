import { NextResponse } from "next/server";
import { createRun, HyperclipError } from "@/lib/hyperclip";
import { getCaptionStyle, DEFAULT_STYLE_ID } from "@/lib/captionStyles";

export async function POST(request: Request) {
  let payload: { blobUrl?: unknown; styleId?: unknown };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { blobUrl, styleId } = payload;
  if (typeof blobUrl !== "string" || !/^https?:\/\//.test(blobUrl)) {
    return NextResponse.json(
      { error: "blobUrl must be an absolute http(s) URL" },
      { status: 400 },
    );
  }

  const style = getCaptionStyle(
    typeof styleId === "string" ? styleId : DEFAULT_STYLE_ID,
  );

  try {
    const run = await createRun({
      videoUrl: blobUrl,
      idempotencyKey: crypto.randomUUID(),
      captionStyle: style.override,
    });
    return NextResponse.json({ runId: run.id, status: run.status });
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
