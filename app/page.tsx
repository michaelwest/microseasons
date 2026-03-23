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
        <h1>Sydney Microseasons</h1>
      </section>

      <div className="stack">
        <section className="card">
          <p className="season-kicker">Current Window</p>
          <div className="date-chip">
            <span>{context.todayLabel}</span>
          </div>
          <div className="date-chip">
            {context.currentWindowRangeLabel}
          </div>
          <div className="date-chip">
            Window {context.currentWindow.windowIndex + 1} of 72
          </div>
        </section>

        <div className="season-grid">
          <section className="card">
            <p className="season-kicker">Shifted Japanese Kō</p>
            <h2 className="season-title">{context.shiftedJapaneseWindow.japaneseTitle}</h2>
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
