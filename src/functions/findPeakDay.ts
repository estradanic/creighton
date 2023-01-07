import { DateTime } from "luxon";
import { Info } from "./infoForDay";

/** Function to find the peak day given cycle info */
function findPeakDay (cycle: Record<string, Info>): string | undefined {
  let eligibleDays: string[] = [];

  const daysNinthToSeventeenthFromCycleEnd = Object.keys(cycle).reverse().slice(8, 17).reverse();
  if (daysNinthToSeventeenthFromCycleEnd.length === 0) {
    return undefined;
  }
  eligibleDays = daysNinthToSeventeenthFromCycleEnd;

  const daysWithPeaks = eligibleDays.filter((day) => cycle[day].stamp.includes("peak"));
  if (daysWithPeaks.length === 1) {
    return daysWithPeaks[0];
  }

  if (daysWithPeaks.length !== 0) {
    eligibleDays = daysWithPeaks;
  }

  const daysPrecedingDownDirection = eligibleDays.filter((day) =>
    cycle[DateTime.fromISO(day).plus({ days: 1 }).toISODate()].direction === "down");
  if (daysPrecedingDownDirection.length === 1) {
    return daysPrecedingDownDirection[0];
  }

  if (daysPrecedingDownDirection.length !== 0) {
    eligibleDays = daysPrecedingDownDirection;
  }

  const eligibleDaysWithTemps = eligibleDays.map((day) => {
    const dayIndex = Object.keys(cycle).indexOf(day);
    const dayTemps = Object.keys(cycle).slice(dayIndex - 4, dayIndex).map((day) => cycle[day].temperature);
    return { day, dayTemps };
  });
  const daysWith4PrecedingDaysOfNoTempDecreases = eligibleDaysWithTemps
    .filter((day) => day.dayTemps.every((temp) => !(temp?.includes("-"))));

  if (daysWith4PrecedingDaysOfNoTempDecreases.length === 1) {
    return daysWith4PrecedingDaysOfNoTempDecreases[0].day;
  } else if (daysWith4PrecedingDaysOfNoTempDecreases.length === 0) {
    return undefined;
  }

  const daysWithMinimumOfFourTenthsDifferenceAcrossAscendingTempStreak =
    daysWith4PrecedingDaysOfNoTempDecreases.filter((day) => {
      const firstTemp = parseFloat(day.dayTemps[0]?.replace(/[^0-9]/g, "") ?? "0");
      const lastTemp = parseFloat(day.dayTemps[3]?.replace(/[^0-9]/g, "") ?? "0");
      return lastTemp - firstTemp >= 0.4;
    });

  if (daysWithMinimumOfFourTenthsDifferenceAcrossAscendingTempStreak.length === 1) {
    return daysWithMinimumOfFourTenthsDifferenceAcrossAscendingTempStreak[0].day;
  } else if (daysWithMinimumOfFourTenthsDifferenceAcrossAscendingTempStreak.length === 0) {
    return undefined;
  }

  return daysWithMinimumOfFourTenthsDifferenceAcrossAscendingTempStreak[
    daysWithMinimumOfFourTenthsDifferenceAcrossAscendingTempStreak.length - 1
  ].day;
}

export default findPeakDay;
