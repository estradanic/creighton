import { DateTime } from "luxon";
import { Info } from "./infoForDay";

/** Function to find the peak day given cycle info */
function findPeakDay (cycle: Record<string, Info>): string | undefined {
  // count backwards from the end of the cycle and get the 9th - 17th days
  const eligibleDays = Object.keys(cycle).reverse().slice(8, 17).reverse();
  if (eligibleDays.length === 0) {
    return undefined;
  }

  // filter out days that don't have a peak observation or a down direction
  let possibleDays = eligibleDays.filter((day) => {
    return cycle[day].stamp.includes("peak") ||
      cycle[DateTime.fromISO(day).plus({ days: 1 }).toISODate()].direction === "down";
  });

  if (possibleDays.length === 1) {
    return possibleDays[0];
  } else if (possibleDays.length === 0) {
    possibleDays = eligibleDays;
  }

  const possibleDaysWithTemps = possibleDays.map((day) => {
    const dayIndex = Object.keys(cycle).indexOf(day);
    const dayTemps = Object.keys(cycle).slice(dayIndex - 4, dayIndex).map((day) => cycle[day].temperature);
    return { day, dayTemps };
  });
  const likelyDays = possibleDaysWithTemps.filter((day) => day.dayTemps.every((temp) => !(temp?.includes("-"))));

  if (likelyDays.length === 1) {
    return likelyDays[0].day;
  } else if (likelyDays.length === 0) {
    return undefined;
  }

  const certainDays = likelyDays.filter((day) => {
    const firstTemp = parseFloat(day.dayTemps[0]?.replace(/[^0-9]/g, "") ?? "0");
    const lastTemp = parseFloat(day.dayTemps[3]?.replace(/[^0-9]/g, "") ?? "0");
    return lastTemp - firstTemp >= 0.4;
  });

  if (certainDays.length === 1) {
    return certainDays[0].day;
  } else if (certainDays.length === 0) {
    return undefined;
  }

  return certainDays[certainDays.length - 1].day;
}

export default findPeakDay;
