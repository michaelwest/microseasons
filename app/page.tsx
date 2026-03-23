import { EntryForm } from "@/components/entry-form";
import { ObservationForm } from "@/components/observation-form";
import { DHARAWAL_CALENDAR_SOURCE, getDharawalSeason } from "@/lib/dharawal";
import { readEntries } from "@/lib/entries-store";
import { getCurrentMicroseasonContext } from "@/lib/microseasons";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const context = getCurrentMicroseasonContext();
  const entries = await readEntries();
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
          </section>

          <section className="card full-width-card">
            <p className="season-kicker">Dharawal Seasonal Calendar</p>
            <h2 className="season-title">{dharawalSeason.title}</h2>
            <div className="date-chip">{dharawalSeason.monthsLabel}</div>
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
