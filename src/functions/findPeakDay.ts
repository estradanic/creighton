import { DateTime } from "luxon";
import { Info } from "./infoForDay";

/**
 * Function to find the peak day given cycle info.
 * This is convoluted and complicated, so every step is commented
 */
function findPeakDay (cycle: Record<string, Info>): string | undefined {
  let eligibleDays: string[] = [];

  // All days between the 9th and 17th from the end of the cycle
  const daysNinthToSeventeenthFromCycleEnd = Object.keys(cycle).reverse().slice(8, 17).reverse();
  // If there are no days in this range, exit
  if (daysNinthToSeventeenthFromCycleEnd.length === 0) {
    return undefined;
  }
  // Otherwise, set eligible days to this range
  eligibleDays = daysNinthToSeventeenthFromCycleEnd;

  // Days with a peak stamp in the eligible days range
  const daysWithPeaks = eligibleDays.filter((day) => cycle[day].stamp.includes("peak"));
  // If there's only one, return it.
  if (daysWithPeaks.length === 1) {
    return daysWithPeaks[0];
  }

  // If there are more than one, all of those are eligible.
  // If there are none, then don't change eligible days.
  if (daysWithPeaks.length > 1) {
    eligibleDays = daysWithPeaks;
  }

  // Days just preceding a down direction in the eligible days range.
  // If there were multiple days with peaks, this will narrow that collection.
  // If there were no days with peaks, this will narrow the original eligible days range.
  const daysPrecedingDownDirection = eligibleDays.filter((day) =>
    cycle[DateTime.fromISO(day).plus({ days: 1 }).toISODate()].direction === "down");
  // If there's only one, return it.
  if (daysPrecedingDownDirection.length === 1) {
    return daysPrecedingDownDirection[0];
  }

  // If there are more than one, all of those are eligible.
  // If there are none, then don't change eligible days.
  if (daysPrecedingDownDirection.length > 1) {
    eligibleDays = daysPrecedingDownDirection;
  }

  // Associate all eligible days with their temps and 3 preceding for easy data manipulation.
  const eligibleDaysWithTemps = eligibleDays.map((day) => {
    const dayIndex = Object.keys(cycle).indexOf(day);
    const dayTemps = Object.keys(cycle).slice(dayIndex - 3, dayIndex + 1).map((day) => cycle[day].temperature);
    return { day, dayTemps };
  });

  // Days with a minimum of 0.4 difference across an ascending temp streak of 4 days
  // This will either narrow the original eligible days range if there were no peaks or down directions,
  // or it will narrow the days with peaks if there were no down directions,
  // or it will narrow the days preceding down directions if there were no peaks,
  // or it will narrow the days with peaks and preceding down directions if there were both peaks and down directions.
  const daysWithMinimumOfFourTenthsDifferenceAcrossAscendingTempStreak =
    eligibleDaysWithTemps.filter((day) => {
      const firstTemp = parseFloat(day.dayTemps[0]?.replace(/[^0-9]/g, "") ?? "1000");
      const lastTemp = parseFloat(day.dayTemps[3]?.replace(/[^0-9]/g, "") ?? "0");
      return lastTemp - firstTemp >= 0.4;
    }).filter((day) => day.dayTemps.every((temp) => !(temp?.includes("-"))));

  // If there's only one, return it.
  if (daysWithMinimumOfFourTenthsDifferenceAcrossAscendingTempStreak.length === 1) {
    return daysWithMinimumOfFourTenthsDifferenceAcrossAscendingTempStreak[0].day;
  }

  // If there are more than one, all of those are eligible.
  if (daysWithMinimumOfFourTenthsDifferenceAcrossAscendingTempStreak.length > 1) {
    eligibleDays = daysWithMinimumOfFourTenthsDifferenceAcrossAscendingTempStreak.map((day) => day.day);

    // Nothing else to narrow down, so just return the last day in the eligible days range.
    return eligibleDays[eligibleDays.length - 1];
  }

  // If there are no eligible days, or if nothing has narrowed anything down exit.
  if (eligibleDays.length === 0 || eligibleDays.length === daysNinthToSeventeenthFromCycleEnd.length) {
    return undefined;
  }

  // Return the last day in the eligible days range. Nothing else to narrow down.
  return eligibleDays[eligibleDays.length - 1];
}

export default findPeakDay;
