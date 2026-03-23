import { MicroseasonContext, MicroseasonEntry } from "@/lib/types";

const JAPANESE_TITLES = [
  "East wind melts the ice",
  "Bush warblers begin singing",
  "Fish emerge from the ice",
  "Rain moistens the soil",
  "Mist starts to linger",
  "Grass sprouts, trees bud",
  "Hibernating insects awaken",
  "Peach blossoms begin to bloom",
  "Caterpillars become butterflies",
  "Sparrows start nesting",
  "Wild geese fly north",
  "First rainbows appear",
  "Swallows return",
  "Wild geese depart",
  "Reeds sprout",
  "Frogs begin singing",
  "Worms surface",
  "Bamboo shoots sprout",
  "Silkworms feast on mulberry leaves",
  "Safflowers bloom",
  "Wheat ripens",
  "Praying mantises hatch",
  "Fireflies rise from the grass",
  "Plums turn yellow",
  "Self-heal withers",
  "Warm winds blow",
  "Hawks learn to fly",
  "Paulownia trees bear seeds",
  "The air grows humid",
  "Great rains sometimes fall",
  "Cool winds arrive",
  "Evening cicadas sing",
  "Thick mist rises",
  "Cotton flowers bloom",
  "The heat begins to fade",
  "Rice ripens",
  "Dew glistens white",
  "Wagtails call",
  "Swallows leave",
  "Thunder ceases",
  "Insects retreat underground",
  "Farmers drain the fields",
  "Red leaves begin to flutter",
  "Crickets sing by the door",
  "Dew becomes frost",
  "Maples and ivy turn yellow",
  "The ground begins to freeze",
  "Daffodils bloom",
  "Rainbows hide away",
  "North winds strip the leaves",
  "Citrus turns golden",
  "Salmon gather upstream",
  "Earthworms seal their burrows",
  "Bears begin hibernating",
  "Winter earth hardens",
  "Narcissus opens",
  "Cold settles over the land",
  "Wheat pushes beneath snow",
  "Parsley grows thick",
  "Bears stir from winter sleep",
  "Ice thickens on the streams",
  "The first plum scent drifts",
  "Spring rain softens the earth",
  "Skylarks begin to sing",
  "Distant hills grow hazy",
  "Tree sap rises",
  "The river loosens",
  "First petals begin to fall",
  "Fields pulse with new green",
  "Dragonflies skim the water",
  "Summer light lengthens",
  "Grasses nod in the heat",
];

const AUSTRALIAN_MICROSEASONS = [
  ["Grass crackles underfoot", "Dry lawns fade to straw while afternoons stretch hot and bright."],
  ["Cicadas begin their electric chorus", "The first loud cicada calls start to define the edges of the day."],
  ["Salt haze hangs above the harbour", "Heat shimmers over water and the air tastes faintly of salt."],
  ["Fig leaves darken to full gloss", "Street figs hold dense shade and the canopy thickens overhead."],
  ["Lorikeets tear into summer fruit", "Bright, noisy feeding flocks gather where gardens are ripening."],
  ["Long evenings pull people outdoors", "Parks, beaches, and footpaths stay busy well past sunset."],
  ["Storm light builds inland", "Hot days start ending in bruised clouds and distant thunder."],
  ["Flying foxes sweep across dusk", "Dark silhouettes cross the evening sky in larger numbers."],
  ["The city smells of sunscreen", "Salt, chlorine, and sunscreen become part of the season's scent."],
  ["Cicadas reach full volume", "The midday soundscape turns metallic and relentless."],
  ["Holiday gardens go untended", "Lawns brown, seed heads form, and bins fill more slowly."],
  ["Late storms rinse the heat", "Evening rain briefly cools concrete before steam rises again."],
  ["Sea breezes arrive with relief", "Afternoons tip from heavy heat into moving coastal air."],
  ["Frangipani drops waxy petals", "Cream and yellow flowers begin littering warm footpaths."],
  ["School returns, summer lingers", "The calendar shifts but the weather still behaves like high summer."],
  ["The first tired leaves appear", "Some deciduous street trees begin to look dusty and worn."],
  ["Spiderwebs flash in morning light", "Dew catches fine webbing before the day burns it off."],
  ["Nights lose their tropical edge", "Evenings become easier to sit through without a fan."],
  ["The light turns cleaner", "Harsh midsummer haze eases and distances sharpen."],
  ["Garden basil bolts to seed", "Tender herbs stretch upward and lose their soft fullness."],
  ["Cockatoos strip seedheads", "White flocks work noisily through dry grasses and garden stalks."],
  ["The first cool dawns surprise", "Morning air begins to feel briefly autumnal."],
  ["Muggy nights finally break", "Sleeping gets easier as humidity stops pressing against the windows."],
  ["Beach afternoons shorten", "Swims still happen, but the sense of endless heat starts to recede."],
  ["Maples flicker at the edges", "A few ornamental trees start showing yellow and rust."],
  ["Mushrooms appear after rain", "Autumn moisture pulls sudden fungi from mulch and lawns."],
  ["The magpie warble carries farther", "Cooler mornings sharpen birdsong across suburban blocks."],
  ["Sunset slips earlier", "Light drains faster from verandas and west-facing rooms."],
  ["The first scarves return", "People start dressing for the morning, then regretting it by noon."],
  ["Plane trees begin to bronze", "Their broad leaves lose gloss and prepare to turn."],
  ["Possums grow bolder at dusk", "Longer nights bring more scratching across roofs and fences."],
  ["Smoke scents the outer suburbs", "Cool evenings sometimes carry the trace of woodfires."],
  ["Leaf litter gathers in gutters", "Street drains begin filling with brittle, windblown leaves."],
  ["Wattle buds prepare in secret", "Native shrubs hold quiet signs of the season ahead."],
  ["Days soften into gold", "Afternoon light turns gentle and low, flattering everything."],
  ["Rain feels properly cold", "Showers stop refreshing and start cutting straight through clothing."],
  ["Camellias open in sheltered gardens", "Glossy hedges brighten with waxy blooms."],
  ["The first breath clouds in dawn air", "Cold mornings become visible on the walk outside."],
  ["Bare branches redraw the street", "Deciduous avenues become graphic and spare."],
  ["Whales move north offshore", "The wider coast enters its annual migration season."],
  ["The ocean turns steel-blue", "Water looks harder, darker, and less forgiving."],
  ["Houseplants stop racing", "Indoor growth slows as light weakens."],
  ["Knitted layers start to stay on", "The coat carried for morning is now needed all day."],
  ["Westerlies scrape the sky clear", "Cold, dry winds leave sharp blue behind them."],
  ["The city waits for wattle", "Winter settles in and everyone starts scanning for yellow."],
  ["Soup weather becomes reliable", "A week of meals can finally be planned around warmth."],
  ["Bare vines show their bones", "Tendrils and latticework stand out after leaf drop."],
  ["The rain turns patient", "Drizzle lingers for hours rather than arriving in summer bursts."],
  ["Wattle breaks open", "Sudden yellow bloom lights up roadsides and rail corridors."],
  ["Mornings smell faintly sweet", "The first warm floral notes slip into the cold air."],
  ["Sun feels precious on walls", "People seek north-facing seats and patches of winter light."],
  ["The first wattleseed falls", "Pollen and fine litter begin collecting beneath blooming trees."],
  ["Jackets come off at lunch", "Midday warmth hints at spring before vanishing again."],
  ["Plum blossoms test the branches", "The earliest orchard and garden blossoms arrive hesitantly."],
  ["The breeze turns less severe", "Cold air still comes, but it loses its edge."],
  ["Myna birds start claiming territory", "Noisy small battles play out around gutters and eaves."],
  ["New grass answers the rain", "Fresh green shoots cut through winter-tired lawns."],
  ["The first jasmine drifts over fences", "Warm notes begin arriving before the flowers are obvious."],
  ["Wattle gives way to blossom", "One yellow pulse yields to white and pink street trees."],
  ["Magpies begin their spring patrols", "People remember which lanes require alert walking."],
  ["Days lengthen enough to notice", "Late afternoon regains real leisure time."],
  ["Jacaranda buds gather strength", "The trees are not purple yet, but the promise is visible."],
  ["Bees start working the herbs", "Balcony rosemary and sage become busy again."],
  ["Warm rain smells of soil", "Showers now feel generative rather than bleak."],
  ["Bottlebrush feeds the honeyeaters", "Red brushes fill with quick, argumentative birds."],
  ["Spring growth turns unruly", "Everything in the garden needs pruning at once."],
  ["The first jacaranda blooms appear", "Scattered lavender flowers start punctuating the canopy."],
  ["Hay fever edges into the day", "Pollen season announces itself in eyes and sinuses."],
  ["The harbour brightens to turquoise", "Clearer sun changes the color of the water."],
  ["Warm nights return", "Windows stay open later and blankets get kicked aside."],
  ["Jacaranda streets begin to glow", "Purple crowns and fallen petals start defining whole blocks."],
  ["Mangoes and stone fruit reappear", "Markets tip decisively back toward summer abundance."],
];

function isLeapYear(year: number): boolean {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function daysInYear(year: number): number {
  return isLeapYear(year) ? 366 : 365;
}

function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

function dayOfYearToMonthDay(year: number, dayOfYear: number) {
  const date = new Date(Date.UTC(year, 0, dayOfYear, 12));

  return {
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
  };
}

export function getSydneyDateParts(now: Date = new Date()) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Australia/Sydney",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const parts = formatter.formatToParts(now);
  const lookup = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return {
    year: Number(lookup.year),
    month: Number(lookup.month),
    day: Number(lookup.day),
  };
}

export function getDayOfYear(year: number, month: number, day: number): number {
  const start = Date.UTC(year, 0, 1);
  const current = Date.UTC(year, month - 1, day);

  return Math.floor((current - start) / 86_400_000) + 1;
}

export function shiftCivilDateByMonths(
  year: number,
  month: number,
  day: number,
  deltaMonths: number,
) {
  const monthIndex = month - 1 + deltaMonths;
  const targetYear = year + Math.floor(monthIndex / 12);
  const normalizedMonthIndex = ((monthIndex % 12) + 12) % 12;
  const targetMonth = normalizedMonthIndex + 1;
  const targetDay = Math.min(day, daysInMonth(targetYear, targetMonth));

  return {
    year: targetYear,
    month: targetMonth,
    day: targetDay,
  };
}

function formatDateLabel(year: number, month: number, day: number) {
  const date = new Date(Date.UTC(year, month - 1, day, 12));

  return new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Sydney",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatRangeLabel(
  year: number,
  startMonth: number,
  startDay: number,
  endMonth: number,
  endDay: number,
) {
  if (startMonth === endMonth) {
    const end = new Date(Date.UTC(year, endMonth - 1, endDay, 12));
    const monthLabel = new Intl.DateTimeFormat("en-AU", {
      timeZone: "Australia/Sydney",
      month: "long",
    }).format(end);

    return `${startDay} to ${endDay} ${monthLabel}`;
  }

  const start = new Date(Date.UTC(year, startMonth - 1, startDay, 12));
  const end = new Date(Date.UTC(year, endMonth - 1, endDay, 12));
  const startLabel = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Sydney",
    month: "long",
    day: "numeric",
  }).format(start);
  const endLabel = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Sydney",
    month: "long",
    day: "numeric",
  }).format(end);

  return `${startLabel} to ${endLabel}`;
}

export function getWindowIndexForDayOfYear(dayOfYear: number, totalDays = 365): number {
  return Math.min(Math.floor(((dayOfYear * 72) - 1) / totalDays), 71);
}

export function getWindowBoundsForIndex(year: number, index: number) {
  const totalDays = daysInYear(year);
  const startDayOfYear = Math.floor((index * totalDays) / 72) + 1;
  const endDayOfYear = Math.floor(((index + 1) * totalDays) / 72);
  const start = dayOfYearToMonthDay(year, startDayOfYear);
  const end = dayOfYearToMonthDay(year, endDayOfYear);

  return {
    startDayOfYear,
    endDayOfYear,
    startMonth: start.month,
    startDay: start.day,
    endMonth: end.month,
    endDay: end.day,
  };
}

function makeEntry(year: number, index: number): MicroseasonEntry {
  const bounds = getWindowBoundsForIndex(year, index);

  return {
    id: `window-${String(index + 1).padStart(2, "0")}`,
    windowIndex: index,
    windowId: `window-${String(index + 1).padStart(2, "0")}`,
    japaneseTitle: JAPANESE_TITLES[index],
    australiaTitle: AUSTRALIAN_MICROSEASONS[index][0],
    startDayOfYear: bounds.startDayOfYear,
    endDayOfYear: bounds.endDayOfYear,
  };
}

export function getMicroseasonContextForDate(
  year: number,
  month: number,
  day: number,
): MicroseasonContext {
  const dayOfYear = getDayOfYear(year, month, day);
  const currentWindowIndex = getWindowIndexForDayOfYear(dayOfYear, daysInYear(year));
  const currentWindowBounds = getWindowBoundsForIndex(year, currentWindowIndex);
  const shifted = shiftCivilDateByMonths(year, month, day, 6);
  const shiftedDayOfYear = getDayOfYear(shifted.year, shifted.month, shifted.day);
  const shiftedWindowIndex = getWindowIndexForDayOfYear(shiftedDayOfYear, daysInYear(shifted.year));

  return {
    todayIso: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    todayLabel: formatDateLabel(year, month, day),
    year,
    month,
    day,
    dayOfYear,
    currentWindow: makeEntry(year, currentWindowIndex),
    shiftedJapaneseWindow: makeEntry(shifted.year, shiftedWindowIndex),
    currentWindowRangeLabel: formatRangeLabel(
      year,
      currentWindowBounds.startMonth,
      currentWindowBounds.startDay,
      currentWindowBounds.endMonth,
      currentWindowBounds.endDay,
    ),
    shiftedDateIso: `${shifted.year}-${String(shifted.month).padStart(2, "0")}-${String(shifted.day).padStart(2, "0")}`,
  };
}

export function getCurrentMicroseasonContext(now: Date = new Date()): MicroseasonContext {
  const today = getSydneyDateParts(now);

  return getMicroseasonContextForDate(today.year, today.month, today.day);
}

export function getAustralianDescription(windowIndex: number): string {
  return AUSTRALIAN_MICROSEASONS[windowIndex][1];
}

if (JAPANESE_TITLES.length !== 72 || AUSTRALIAN_MICROSEASONS.length !== 72) {
  throw new Error("Expected exactly 72 Japanese and 72 Australian microseason entries.");
}
