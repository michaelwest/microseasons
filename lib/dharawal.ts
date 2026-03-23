export type DharawalSeason = {
  id: string;
  title: string;
  monthsLabel: string;
  summary: string;
  indicators: string[];
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
};

export const DHARAWAL_CALENDAR_SOURCE =
  "https://www.bom.gov.au/resources/indigenous-weather-knowledge/indigenous-seasonal-calendars/dharawal-calendar";

// The BOM page presents these as broad seasonal spans rather than day-exact cutovers.
// This app uses fixed calendar ranges so a single Dharawal season can be shown for any date.
const DHARAWAL_SEASONS: DharawalSeason[] = [
  {
    id: "burran",
    title: "Time of Burran",
    monthsLabel: "January to March",
    summary:
      "Hot and dry, with male kangaroos becoming aggressive and weetjellan blooming as a sign of storms and caution with fire.",
    indicators: [
      "Gadalung Marool - hot and dry",
      "Male kangaroos aggressive",
      "Meat forbidden",
      "Weetjellan blooming",
    ],
    startMonth: 1,
    startDay: 1,
    endMonth: 3,
    endDay: 31,
  },
  {
    id: "marraigang",
    title: "Time of Marrai'gang",
    monthsLabel: "April to June",
    summary:
      "Wet weather becomes cooler, quolls seek mates, and lilly pilly ripening marks the turn toward the colder season.",
    indicators: [
      "Bana'murrai'yung - wet becoming cooler",
      "Quolls seeking mates",
      "Lilly pilly ripens",
    ],
    startMonth: 4,
    startDay: 1,
    endMonth: 6,
    endDay: 30,
  },
  {
    id: "burrugin",
    title: "Time of Burrugin",
    monthsLabel: "June to late July",
    summary:
      "Cold, frosty short days, echidna mating activity, and burringoa flowering mark this season.",
    indicators: [
      "Tugarah Tuli - cold, frosty, short days",
      "Echidna seeking mates",
      "Burringoa flowering",
      "Shellfish forbidden",
    ],
    startMonth: 7,
    startDay: 1,
    endMonth: 7,
    endDay: 31,
  },
  {
    id: "wiritjiribin",
    title: "Time of Wiritjiribin",
    monthsLabel: "August",
    summary:
      "Cold and windy weather, lyrebird mound-building, flowering signs, and gentle spring rains define this month.",
    indicators: [
      "Tugarah Gunya'marri - cold and windy",
      "Lyrebird building mounds",
      "Marrai'uo flowering",
      "Boo'kerrikin flowering",
      "Gentle spring rains",
    ],
    startMonth: 8,
    startDay: 1,
    endMonth: 8,
    endDay: 31,
  },
  {
    id: "ngoonungi",
    title: "Time of Ngoonungi",
    monthsLabel: "September to October",
    summary:
      "Cool weather warms, flying foxes gather overhead, and waratah flowering marks an important ceremonial time.",
    indicators: [
      "Murrai'yunggory - cool, getting warmer",
      "Flying foxes appear",
      "Ceremonial time",
      "Miwa gawaian in flower",
    ],
    startMonth: 9,
    startDay: 1,
    endMonth: 10,
    endDay: 31,
  },
  {
    id: "parradowee",
    title: "Time of Parra'dowee",
    monthsLabel: "November to December",
    summary:
      "Warm and wet conditions settle in, summer heat begins, and stable weather marks the season.",
    indicators: [
      "Goray'murrai - warm and wet",
      "Summer heat starts",
      "Stable weather",
    ],
    startMonth: 11,
    startDay: 1,
    endMonth: 12,
    endDay: 31,
  },
];

export function getDharawalSeason(month: number, day: number): DharawalSeason {
  const season = DHARAWAL_SEASONS.find((candidate) => {
    const afterStart =
      month > candidate.startMonth || (month === candidate.startMonth && day >= candidate.startDay);
    const beforeEnd =
      month < candidate.endMonth || (month === candidate.endMonth && day <= candidate.endDay);

    return afterStart && beforeEnd;
  });

  return season ?? DHARAWAL_SEASONS[0];
}
