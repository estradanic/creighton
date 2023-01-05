import { DateTime } from "luxon";
import { Observation } from "../types/ObservationTypes";

/** Function to calculate the number of post-peak days given a cycle and the peak day */
function postPeakDays (cycle: Record<string, Observation[]>, peakDay: string | undefined): number {
  if (peakDay === undefined) {
    return 0;
  }
  return Object.keys(cycle).filter((day) =>
    DateTime.fromISO(day).diff(DateTime.fromISO(peakDay)).as("days") > 0).length;
}

export default postPeakDays;
