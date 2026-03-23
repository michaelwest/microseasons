export type DharawalSeason = {
  id: string;
  title: string;
  monthsLabel: string;
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
    indicators: [
      "Gadalung Marool - hot and dry",
      "Male kangaroos aggressive",
      "Eating meat is forbidden because the heat means it does not keep well and food poisoning becomes a risk",
      "Weetjellan blooming means fires should only be lit on sand and well away from bushland",
      "Weetjellan also signals violent storms and heavy rain, so camping near creeks and rivers is not recommended",
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
    indicators: [
      "Bana'murrai'yung - wet becoming cooler",
      "The cries of marrai'gang, the quoll, can be heard through forests and woodlands as mates are sought",
      "Lilly pilly ripens on the trees",
      "When the fruit starts to fall, it is time to mend old warm cloaks or make new ones",
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
    indicators: [
      "Tugarah Tuli - cold, frosty, short days",
      "Male echidnas form lines of up to 10 and follow a female through the woodlands",
      "Burringoa (forest red gum) flowering signals it is time to collect nectar for ceremonies",
      "Shellfish must not be eaten again until the boo'kerrikin blooms",
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
    indicators: [
      "Tugarah Gunya'marri - cold and windy",
      "Gentle spring rains",
      "The lyrebird's calls ring through the bushland while he builds dancing mounds to attract mates",
      "Marrai'uo (gossamer wattle) flowering signals that fish are swimming in the rivers",
      "Boo'kerrikin flowering",
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
    indicators: [
      "Murrai'yunggory - cool, getting warmer",
      "Flying foxes gather in the darkening skies just after sunset",
      "The blooming of bright red miwa gawaian (waratah) marks the beginning of ceremonies",
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
    indicators: [
      "Goray'murrai - warm and wet",
      "Summer heat starts; stable weather",
      "The Great Eel Spirit is said to call his children, and the eels move down rivers to the ocean to mate",
      "Kai'arrewan (coast myall) blooming indicates fish in the bays and estuaries",
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
