"use client";

import { FormEvent, useState } from "react";
import { SeasonalityAssessment } from "@/lib/types";

const LABELS: Record<SeasonalityAssessment["classification"], string> = {
  "brief-only": "Brief only",
  seasonal: "Seasonal",
  "year-round": "Year-round",
};

export function ObservationForm() {
  const [observation, setObservation] = useState("");
  const [assessment, setAssessment] = useState<SeasonalityAssessment | null>(null);
  const [message, setMessage] = useState("");
  const [isPending, setIsPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setIsPending(true);

    try {
      const response = await fetch("/api/seasonality", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ observation }),
      });

      const payload = (await response.json()) as
        | SeasonalityAssessment
        | { error: string };

      if (!response.ok || !("classification" in payload)) {
        setAssessment(null);
        setMessage("error" in payload ? payload.error : "Unable to assess that observation.");
        return;
      }

      setAssessment(payload);
    } catch {
      setAssessment(null);
      setMessage("Unable to assess that observation right now.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <section className="card">
      <p className="season-kicker">Seasonality Check</p>
      <h2>Ask whether an observation is truly seasonal</h2>
      <form className="form-grid" onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="observation">Observation</label>
          <input
            id="observation"
            name="observation"
            maxLength={180}
            placeholder="cicadas noisy"
            value={observation}
            onChange={(event) => setObservation(event.target.value)}
          />
        </div>
        <button className="button" type="submit" disabled={isPending}>
          {isPending ? "Checking..." : "Assess seasonality"}
        </button>
      </form>
      {message ? (
        <p className="message" role="status" aria-live="polite">
          {message}
        </p>
      ) : null}
      {assessment ? (
        <div className="assessment" aria-live="polite">
          <span className="badge">{LABELS[assessment.classification]}</span>
          <p>{assessment.reason}</p>
        </div>
      ) : null}
      <p className="footer-note">
        The model gives a practical seasonal bucket for Sydney conditions, not a scientific certainty.
      </p>
    </section>
  );
}
