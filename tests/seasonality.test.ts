import { describe, expect, it } from "vitest";
import { parseSeasonalityPayload } from "@/lib/seasonality";
import { entryInputSchema, observationInputSchema } from "@/lib/validation";

describe("validation", () => {
  it("accepts a structured seasonality payload", () => {
    expect(
      parseSeasonalityPayload({
        classification: "seasonal",
        reason: "Cicadas are loud in Sydney for a distinct warm-season stretch, not all year.",
      }),
    ).toEqual({
      classification: "seasonal",
      reason: "Cicadas are loud in Sydney for a distinct warm-season stretch, not all year.",
    });
  });

  it("rejects an invalid classification", () => {
    expect(() =>
      parseSeasonalityPayload({
        classification: "sometimes",
        reason: "Nope",
      }),
    ).toThrow();
  });

  it("rejects empty collaborative entry fields", () => {
    expect(entryInputSchema.safeParse({ description: "" }).success).toBe(false);
  });

  it("rejects a blank seasonality observation", () => {
    expect(observationInputSchema.safeParse({ observation: "  " }).success).toBe(false);
  });
});
