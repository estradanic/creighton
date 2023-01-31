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
  if (peakDay === undefined || Object.values(cycle).every((day) => day.cycleDay === "??")) {
    return "??";
  }

  let mucusCycleDays = Object.keys(cycle).filter((day) =>
    DateTime.fromISO(day).diff(DateTime.fromISO(peakDay)).as("days") <= 0 &&
      !(cycle[day].abbreviation.startsWith("H") ||
        cycle[day].abbreviation.startsWith("M")
      ) &&
      Object.keys(cycle).slice(Object.keys(cycle).indexOf(day)).every((day) =>
        !(cycle[day].abbreviation.startsWith("H") ||
          cycle[day].abbreviation.startsWith("M"))));

  mucusCycleDays = mucusCycleDays
    .filter((day) => mucusCycleDays.slice(0, mucusCycleDays.indexOf(day) + 1).some((day) =>
      !(cycle[day].abbreviation.includes("0AD")) &&
      !(cycle[day].abbreviation.startsWith("L")) &&
      !(cycle[day].abbreviation.startsWith("VL"))));

  let score = 0;

  for (const day of mucusCycleDays) {
    score += mucusScoreForDay(cycle[day].abbreviation);
  }

  const _mucusScore = Math.round(score / mucusCycleDays.length * 10) / 10;
  if (isNaN(_mucusScore)) {
    return "??";
  }
  return `${_mucusScore}`;
}

export default mucusScore;
