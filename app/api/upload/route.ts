import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

const MAX_SIZE_BYTES = 500 * 1024 * 1024;

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: [
          "video/mp4",
          "video/quicktime",
          "video/webm",
          "video/x-matroska",
          "video/mpeg",
        ],
        maximumSizeInBytes: MAX_SIZE_BYTES,
        addRandomSuffix: true,
      }),
      onUploadCompleted: async () => {
        // Nothing to do — the client receives the blob URL directly.
      },
    });

    return NextResponse.json(json);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
