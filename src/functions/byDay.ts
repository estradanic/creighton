import { DateTime } from "luxon";
import { Accessor } from "solid-js";
import { Observation } from "../components/ExistingObservation";

const byDay = (observations: Accessor<Observation[]>) => {
  const observationsByDay: Record<string, Observation[]> = {};
  const _observations = observations();
  for (const observation of _observations) {
    const day = DateTime.fromISO(observation.datetime).toISODate();
    if (!observationsByDay[day]) {
      observationsByDay[day] = [];
    }
    observationsByDay[day].push(observation);
  }
  for (const day of Object.keys(observationsByDay)) {
    const nextDay = DateTime.fromISO(day).plus({days: 1}).toISODate();
    if (!observationsByDay[nextDay]) {
      observationsByDay[nextDay] = [];
    }
  }
  return observationsByDay;
};

export default byDay;
