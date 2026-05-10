# Autocaptions

A minimal web app: drop in a video, get it back with captions burned in. Built on the [Hyperclip API](https://docs.hyperclip.co/api/overview).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fhyperclip%2Fautocaptions&env=HYPERCLIP_BASE_URL,HYPERCLIP_API_KEY,HYPERCLIP_FLOW_ID,HYPERCLIP_VIDEO_STEP_INDEX&envDescription=See%20.env.example%20for%20what%20each%20variable%20does&stores=%5B%7B%22type%22%3A%22blob%22%7D%5D)

## How it works

1. Browser uploads the video directly to **Vercel Blob** (handles files of any size, bypasses serverless body limits).
2. The server kicks off a Hyperclip run by POSTing the Blob URL to `/runs`.
3. The browser polls `/runs/:id` through a thin server proxy until the run completes.
4. The captioned MP4 is shown in a `<video>` preview with a download button.

The Hyperclip API key only ever lives on the server.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS
- `@vercel/blob` for client-side uploads
- Deploys to Vercel with zero config

## Setup

### 1. Prerequisites

- A Hyperclip account with a saved **autocaption flow** that takes a video as input.
- A Vercel account.

### 2. Clone and install

```bash
git clone https://github.com/hyperclip/autocaptions.git
cd autocaptions
npm install
```

### 3. Configure environment

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

| Variable | Where to get it |
| --- | --- |
| `HYPERCLIP_BASE_URL` | Your project-scoped Hyperclip API base, e.g. `https://YOUR-PROJECT.supabase.co/functions/v1/api-v1`. |
| `HYPERCLIP_API_KEY` | Hyperclip app → **Settings → API Keys → New key**. Looks like `hck_live_...`. |
| `HYPERCLIP_FLOW_ID` | The UUID of your saved autocaption flow. List them with `curl $HYPERCLIP_BASE_URL/flows -H "Authorization: Bearer $HYPERCLIP_API_KEY"`. |
| `HYPERCLIP_VIDEO_STEP_INDEX` | Zero-based index of the `media_input` node in your flow. Inspect with `curl $HYPERCLIP_BASE_URL/flows/$HYPERCLIP_FLOW_ID -H "Authorization: Bearer $HYPERCLIP_API_KEY"` and read `required_inputs`. Defaults to `0`. |
| `BLOB_READ_WRITE_TOKEN` | On Vercel: enable Blob storage on the project and this is injected automatically. Locally: copy it from the Vercel dashboard. |

### 4. Run

```bash
npm run dev
```

Open [localhost:3000](http://localhost:3000), drop a short MP4 (try 5–30 seconds first), and watch the run progress.

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import it in Vercel.
3. In the project's **Storage** tab, create a new **Blob** store. `BLOB_READ_WRITE_TOKEN` is wired up automatically.
4. Add the four `HYPERCLIP_*` variables under **Settings → Environment Variables** for Production and Preview.
5. Deploy.

## Cost / spend control

This app has **no authentication**. Anyone with the deployed URL can spend your Hyperclip credits. Before sharing it publicly, set:

- A **monthly credit cap** on the API key (Hyperclip → Settings → API Keys).
- A **per-run credit cap** to bound the worst case from a single user.
- A reasonable autorefill ceiling (or disable autorefill).

For real production use, put this behind auth before exposing it.

## Project layout

```
app/
  page.tsx                       # State machine + UI shell
  layout.tsx                     # Geist font, metadata
  globals.css                    # Tailwind + theme tokens
  api/
    upload/route.ts              # Vercel Blob client-upload handler
    captions/route.ts            # POST: create a Hyperclip run
    captions/[runId]/route.ts    # GET: proxy run status
components/
  Dropzone.tsx                   # Drag-and-drop + file picker
  ProgressCard.tsx               # Upload progress + processing status
  ResultCard.tsx                 # <video> preview + download button
  ErrorCard.tsx                  # Inline error display
lib/
  env.ts                         # Reads + validates server env vars
  hyperclip.ts                   # Typed wrappers around /runs endpoints
```

## License

MIT — see [LICENSE](./LICENSE).
