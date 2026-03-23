"use client";

import { FormEvent, useState } from "react";
import { StoredDescription } from "@/lib/types";

type EntryFormProps = {
  initialEntries: StoredDescription[];
};

type SubmitState = {
  message: string;
  error: boolean;
};

const initialState: SubmitState = {
  message: "",
  error: false,
};

export function EntryForm({ initialEntries }: EntryFormProps) {
  const [entries, setEntries] = useState(initialEntries);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitState, setSubmitState] = useState(initialState);
  const [isPending, setIsPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState(initialState);
    setIsPending(true);

    try {
      const response = await fetch("/api/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });

      const payload = (await response.json()) as
        | { entry: StoredDescription }
        | { error: string };

      if (!response.ok || !("entry" in payload)) {
        setSubmitState({
          message: "error" in payload ? payload.error : "Unable to save your note.",
          error: true,
        });
        return;
      }

      setEntries((current) => [payload.entry, ...current]);
      setName("");
      setDescription("");
      setSubmitState({
        message: "Your description has been added.",
        error: false,
      });
    } catch {
      setSubmitState({
        message: "Unable to save your note right now.",
        error: true,
      });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <section className="card">
      <p className="season-kicker">Collaborative Notes</p>
      <h2>Describe this microseason in your own words</h2>
      <form className="form-grid" onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            maxLength={80}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="description">What feels seasonal right now?</label>
          <textarea
            id="description"
            name="description"
            maxLength={600}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <button className="button" type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save note"}
        </button>
      </form>
      {submitState.message ? (
        <p className="message" role="status" aria-live="polite">
          {submitState.message}
        </p>
      ) : null}

      <div className="entries">
        {entries.length > 0 ? (
          entries.map((entry) => (
            <article className="entry" key={entry.id}>
              <header>
                <strong>{entry.name}</strong>
                <time dateTime={entry.submittedAt}>
                  {new Intl.DateTimeFormat("en-AU", {
                    dateStyle: "medium",
                    timeStyle: "short",
                    timeZone: "Australia/Sydney",
                  }).format(new Date(entry.submittedAt))}
                </time>
              </header>
              <span>{entry.australiaTitle}</span>
              <p>{entry.description}</p>
            </article>
          ))
        ) : (
          <p className="message">No descriptions yet. Add the first local note for this season.</p>
        )}
      </div>
    </section>
  );
}
