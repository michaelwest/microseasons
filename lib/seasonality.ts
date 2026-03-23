import OpenAI from "openai";
import { z } from "zod";
import { SeasonalityAssessment } from "@/lib/types";

const seasonalitySchema = z.object({
  classification: z.enum(["brief-only", "seasonal", "year-round"]),
  reason: z.string().trim().min(1).max(240),
});

const SYSTEM_PROMPT = [
  "You classify how seasonal an observation is in Sydney, Australia.",
  "Use exactly one classification:",
  "- brief-only: mostly limited to a few weeks",
  "- seasonal: usually present for a few months",
  "- year-round: common or possible across much of the year",
  "Return concise JSON only, with classification and a short reason.",
  "Base the answer on common seasonal patterns, not certainty.",
].join(" ");

let client: OpenAI | null = null;

function getClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  client ??= new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return client;
}

export async function assessObservationSeasonality(
  observation: string,
): Promise<SeasonalityAssessment> {
  const response = await getClient().responses.create({
    model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
    instructions: SYSTEM_PROMPT,
    input: `Observation: ${observation}`,
    text: {
      format: {
        type: "json_schema",
        name: "seasonality_assessment",
        strict: true,
        schema: {
          type: "object",
          additionalProperties: false,
          required: ["classification", "reason"],
          properties: {
            classification: {
              type: "string",
              enum: ["brief-only", "seasonal", "year-round"],
            },
            reason: {
              type: "string",
              minLength: 1,
              maxLength: 240,
            },
          },
        },
      },
    },
  });

  const payload = response.output_text;

  if (!payload) {
    throw new Error("The model returned an empty response.");
  }

  return seasonalitySchema.parse(JSON.parse(payload));
}

export function parseSeasonalityPayload(payload: unknown): SeasonalityAssessment {
  return seasonalitySchema.parse(payload);
}
