import { NextResponse } from "next/server";
import { assessObservationSeasonality } from "@/lib/seasonality";
import { observationInputSchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = observationInputSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid request body." },
      { status: 400 },
    );
  }

  try {
    const assessment = await assessObservationSeasonality(parsed.data.observation);
    return NextResponse.json(assessment);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to assess that observation right now.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
