import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { appendEntry, readEntries } from "@/lib/entries-store";
import { getCurrentMicroseasonContext } from "@/lib/microseasons";
import { StoredDescription } from "@/lib/types";
import { entryInputSchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function GET() {
  const entries = await readEntries();
  return NextResponse.json(entries);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = entryInputSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid request body." },
      { status: 400 },
    );
  }

  const context = getCurrentMicroseasonContext();
  const entry: StoredDescription = {
    id: randomUUID(),
    description: parsed.data.description,
    submittedAt: new Date().toISOString(),
    windowId: context.currentWindow.windowId,
    windowIndex: context.currentWindow.windowIndex,
    japaneseTitle: context.currentWindow.japaneseTitle,
    australiaTitle: context.currentWindow.australiaTitle,
  };

  await appendEntry(entry);

  return NextResponse.json({ entry }, { status: 201 });
}
