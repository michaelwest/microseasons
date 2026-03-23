import { z } from "zod";

export const entryInputSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Description is required.")
    .max(600, "Description is too long."),
});

export const observationInputSchema = z.object({
  observation: z
    .string()
    .trim()
    .min(1, "Observation is required.")
    .max(180, "Observation is too long."),
});
