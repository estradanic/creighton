import { DateTime } from "luxon";
import { Info } from "./infoForDay";

/** Function to calculate the mucus score for a day given the abbreviation */
export function mucusScoreForDay (abbreviation: string): number {
  switch (
    abbreviation.replace(/((^VL)|(^L))(R|B)*/, "").trim()
      .replace(/R|B|C\/K/g, "K").replace(/Y/g, "C").replace(/PL$/, "L")
  ) {
    case "10KL":
      return 16;
    case "10CL":
    case "8KL":
    case "6KL":
      return 14;
    case "8CL":
    case "6CL":
      return 12;
    case "10K":
    case "10KG":
      return 10;
    case "10WL":
    case "10SL":
    case "10DL":
    case "6K":
    case "8K":
    case "10C":
    case "10KP":
      return 8;
    case "6C":
    case "8C":
    case "6CG":
    case "8CG":
    case "10CG":
    case "8KP":
    case "6KP":
      return 6;
    case "10CP":
    case "8CP":
    case "6CP":
      return 4;
  }
  return 0;
}

/** Function to calculate the mucus score given a cycle and the peak day */
function mucusScore (cycle: Record<string, Info>, peakDay: string | undefined): string {
  if (peakDay === undefined) {
    return "??";
  }

  // get 7 days before peak day inclusive
  const mucusCycleDays: string[] = [];
  let day = DateTime.fromISO(peakDay);
  for (let i = 0; i < 6; i++) {
    mucusCycleDays.push(day.toISODate());
    day = day.minus({ days: 1 });
  }

  let score = 0;
  for (const day of mucusCycleDays) {
    if (cycle[day]?.abbreviation) {
      score += mucusScoreForDay(cycle[day].abbreviation);
    } else {
      return "??";
    }
  }

  const _mucusScore = Math.round(score / 6 * 10) / 10;
  if (isNaN(_mucusScore)) {
    return "??";
  }
  return `${_mucusScore}`;
}

export default mucusScore;
