import { describe, expect, it } from "vitest";
import {
  getDayOfYear,
  getMicroseasonContextForDate,
  getWindowBoundsForIndex,
  getWindowIndexForDayOfYear,
  shiftCivilDateByMonths,
} from "@/lib/microseasons";

describe("microseason date mapping", () => {
  it("maps early January dates into the opening windows", () => {
    expect(getWindowIndexForDayOfYear(1)).toBe(0);
    expect(getWindowIndexForDayOfYear(6)).toBe(0);
    expect(getWindowIndexForDayOfYear(7)).toBe(1);
  });

  it("maps the last day of a common year into the final window", () => {
    const dayOfYear = getDayOfYear(2025, 12, 31);
    expect(dayOfYear).toBe(365);
    expect(getWindowIndexForDayOfYear(dayOfYear)).toBe(71);
  });

  it("handles leap day without producing an out-of-range window", () => {
    const dayOfYear = getDayOfYear(2024, 2, 29);
    expect(dayOfYear).toBe(60);
    expect(getWindowIndexForDayOfYear(dayOfYear, 366)).toBe(11);
  });

  it("shifts dates by six months with end-of-month clamping", () => {
    expect(shiftCivilDateByMonths(2026, 8, 31, 6)).toEqual({
      year: 2027,
      month: 2,
      day: 28,
    });
  });

  it("resolves a current and shifted window for a fixed Sydney date", () => {
    const context = getMicroseasonContextForDate(2026, 10, 10);

    expect(context.currentWindow.windowId).toBe("window-56");
    expect(context.shiftedDateIso).toBe("2027-04-10");
    expect(context.shiftedJapaneseWindow.windowId).toBe("window-20");
  });

  it("extends the final window to the full year length", () => {
    expect(getWindowBoundsForIndex(2025, 71)).toEqual({
      startDayOfYear: 360,
      endDayOfYear: 365,
      startMonth: 12,
      startDay: 26,
      endMonth: 12,
      endDay: 31,
    });
  });
});
