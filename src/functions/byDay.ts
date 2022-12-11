import { DateTime } from "luxon";
import { Observation } from "../types/ObservationTypes";

/** Function to take a flattened list of observations and group them by day */
const byDay = (observations: Observation[]): Record<string, Observation[]> => {
  const observationsByDay: Record<string, Observation[]> = {};
  for (const observation of observations) {
    const day = DateTime.fromISO(observation.datetime).toISODate();
    if (!observationsByDay[day]) {
      observationsByDay[day] = [];
    }
    observationsByDay[day].push(observation);
  }
  for (const day of Object.keys(observationsByDay)) {
    const nextDay = DateTime.fromISO(day).plus({ days: 1 }).toISODate();
    if (!observationsByDay[nextDay]) {
      observationsByDay[nextDay] = [];
    }
  }
  return observationsByDay;
};

export default byDay;
