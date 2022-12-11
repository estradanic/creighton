import { DateTime } from "luxon";
import { Observation } from "../types/ObservationTypes";
import { isMenstruation } from "./assertions";

/** Function to get the cycle day for an observation given the context of the observations by day */
const cycleDay = (observation: Observation, observationsByDay: Record<string, Observation[]>): string => {
  let curDateTime = DateTime.fromISO(observation.datetime);
  let backtrackedDays = 0;
  let foundMenstruation = false;
  while (true) {
    let foundMenstruationInCurDay = false;
    const observations = observationsByDay[curDateTime.toISODate()];
    if (observations === undefined) {
      return "??";
    }
    for (const observation of observations) {
      if (isMenstruation(observation)) {
        foundMenstruation = true;
        foundMenstruationInCurDay = true;
      }
    }
    if (foundMenstruation && !foundMenstruationInCurDay) {
      return `${backtrackedDays}`;
    }
    curDateTime = curDateTime.minus({ days: 1 });
    backtrackedDays++;
  }
};

export default cycleDay;
