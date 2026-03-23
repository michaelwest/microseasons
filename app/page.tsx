import { EntryForm } from "@/components/entry-form";
import { ObservationForm } from "@/components/observation-form";
import { readEntries } from "@/lib/entries-store";
import { getAustralianDescription, getCurrentMicroseasonContext } from "@/lib/microseasons";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const context = getCurrentMicroseasonContext();
  const entries = await readEntries();
  const localDescription = getAustralianDescription(context.currentWindow.windowIndex);

  return (
    <main className="page-shell">
      <section className="hero">
        <p className="eyebrow">Sydney Microseasons</p>
        <h1>Read the year in smaller pieces.</h1>
        <p>
          Today is anchored to a five-day kō-style window, a six-month-shifted Japanese microseason,
          and a Sydney-specific seasonal cue written for this app.
        </p>
      </section>

      <div className="stack">
        <section className="card">
          <p className="season-kicker">Current Window</p>
          <div className="date-chip">
            <span>{context.todayLabel}</span>
          </div>
          <h2>{context.currentWindowRangeLabel}</h2>
          <p className="season-copy">
            Window {context.currentWindow.windowIndex + 1} of 72, aligned to the roughly five-day
            rhythm of the traditional Japanese microseason calendar.
          </p>
        </section>

        <div className="season-grid">
          <section className="card">
            <p className="season-kicker">Shifted Japanese Kō</p>
            <h2 className="season-title">{context.shiftedJapaneseWindow.japaneseTitle}</h2>
            <p className="season-copy">
              This uses the canonical Japanese window mapped to the date six months from Sydney&apos;s
              current day: <strong>{context.shiftedDateIso}</strong>.
            </p>
          </section>

          <section className="card">
            <p className="season-kicker">Sydney Suggestion</p>
            <h2 className="season-title">{context.currentWindow.australiaTitle}</h2>
            <p className="season-copy">{localDescription}</p>
          </section>
        </div>

        <EntryForm initialEntries={entries} />
        <ObservationForm />
      </div>
    </main>
  );
}
