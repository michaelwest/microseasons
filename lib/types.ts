export type MicroseasonEntry = {
  id: string;
  windowIndex: number;
  windowId: string;
  japaneseTitle: string;
  australiaTitle: string;
  startDayOfYear: number;
  endDayOfYear: number;
};

export type MicroseasonContext = {
  todayIso: string;
  todayLabel: string;
  year: number;
  month: number;
  day: number;
  dayOfYear: number;
  currentWindow: MicroseasonEntry;
  shiftedJapaneseWindow: MicroseasonEntry;
  currentWindowRangeLabel: string;
  shiftedDateIso: string;
};

export type StoredDescription = {
  id: string;
  name: string;
  description: string;
  submittedAt: string;
  windowId: string;
  windowIndex: number;
  japaneseTitle: string;
  australiaTitle: string;
};

export type SeasonalityClassification = "brief-only" | "seasonal" | "year-round";

export type SeasonalityAssessment = {
  classification: SeasonalityClassification;
  reason: string;
};
