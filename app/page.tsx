import { EntryForm } from "@/components/entry-form";
import { ObservationForm } from "@/components/observation-form";
import { DHARAWAL_CALENDAR_SOURCE, getDharawalSeason } from "@/lib/dharawal";
import { readEntries } from "@/lib/entries-store";
import { getAustralianDescription, getCurrentMicroseasonContext } from "@/lib/microseasons";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const context = getCurrentMicroseasonContext();
  const entries = await readEntries();
  const localDescription = getAustralianDescription(context.currentWindow.windowIndex);
  const dharawalSeason = getDharawalSeason(context.month, context.day);

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
            <p className="season-kicker">Time-Shifted Japanese Kō</p>
            <h2 className="season-title">{context.shiftedJapaneseWindow.japaneseTitle}</h2>
          </section>

          <section className="card">
            <p className="season-kicker">Sydney Microseason</p>
            <h2 className="season-title">{context.currentWindow.australiaTitle}</h2>
            <p className="season-copy">{localDescription}</p>
          </section>

          <section className="card">
            <p className="season-kicker">Dharawal Seasonal Calendar</p>
            <h2 className="season-title">{dharawalSeason.title}</h2>
            <p className="season-copy">
              {dharawalSeason.monthsLabel}. {dharawalSeason.summary}
            </p>
            <ul className="indicator-list">
              {dharawalSeason.indicators.map((indicator) => (
                <li key={indicator}>{indicator}</li>
              ))}
            </ul>
          </section>
        </div>

        <EntryForm initialEntries={entries} />
        <ObservationForm />
      </div>
    </main>
  );
}
