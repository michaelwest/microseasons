# Microseasons Sydney

A mobile-first Next.js app for exploring 72 microseason windows from Sydney, with a shifted Japanese kō, a curated local suggestion, collaborative notes, and an OpenAI-powered seasonality check.

## Development

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and set `OPENAI_API_KEY`.
3. Run `npm run dev`.

## Railway

- Set `OPENAI_API_KEY` and optionally `OPENAI_MODEL`.
- Mount a persistent volume and point `MICROSEASONS_DATA_DIR` at that mount, for example `/data`.
- Build with `npm run build` and start with `npm run start`.
