import { DateTime } from "luxon";
import { Info } from "./infoForDay";

/** Function to calculate the mucus score given a cycle and the peak day */
function mucusScore (cycle: Record<string, Info>, peakDay: string | undefined): number {
  if (peakDay === undefined) {
    return 0;
  }

  let mucusCycleDays = Object.keys(cycle).filter((day) =>
    DateTime.fromISO(day).diff(DateTime.fromISO(peakDay)).as("days") < 0 &&
      !(cycle[day].abbreviation.includes("H") || cycle[day].abbreviation.includes("M")) &&
      Object.keys(cycle).slice(Object.keys(cycle).indexOf(day)).every((day) =>
        !(cycle[day].abbreviation.includes("H") || cycle[day].abbreviation.includes("M"))));

  mucusCycleDays = mucusCycleDays
    .filter((day) => mucusCycleDays.slice(0, mucusCycleDays.indexOf(day)).some((day) =>
      !(cycle[day].abbreviation.includes("0AD"))));

  let score = 0;

  for (const day of mucusCycleDays) {
    const abbreviation = cycle[day].abbreviation.replace(/((^VL)|(^L))(R|B)*/, "").trim()
      .replace(/R|B|C\/K/g, "K").replace(/Y/g, "C");
    switch (abbreviation) {
      case "10KL":
        score += 16;
        break;
      case "10CL":
      case "8KL":
      case "6KL":
        score += 14;
        break;
      case "8CL":
      case "6CL":
        score += 12;
        break;
      case "10K":
      case "10KG":
        score += 10;
        break;
      case "10WL":
      case "10SL":
      case "10DL":
      case "6K":
      case "8K":
      case "10C":
      case "10KP":
        score += 8;
        break;
      case "6C":
      case "8C":
      case "6CG":
      case "8CG":
      case "10CG":
      case "8KP":
      case "6KP":
        score += 6;
        break;
      case "10CP":
      case "8CP":
      case "6CP":
        score += 4;
    }
  }

  const _mucusScore = Math.round(score / mucusCycleDays.length * 10) / 10;
  if (isNaN(_mucusScore)) {
    return 0;
  }
  return _mucusScore;
}

export default mucusScore;
