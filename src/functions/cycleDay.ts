import { DateTime } from "luxon";
import { Accessor } from "solid-js";
import { Observation } from "../components/ExistingObservation";
import { isMenstruation } from "./assertions";

const cycleDay = (observation: Accessor<Observation>, observationsByDay: Accessor<Record<string, Observation[]>>) => {
  let curDateTime = DateTime.fromISO(observation().datetime);
  let backtrackedDays = 0;
  let foundMenstruation = false;
  while (true) {
    let foundMenstruationInCurDay = false;
    const observations = observationsByDay()[curDateTime.toISODate()];
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
    curDateTime = curDateTime.minus({days: 1});
    backtrackedDays++;
  }
};

export default cycleDay;

