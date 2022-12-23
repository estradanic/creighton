import { Observation } from "../types/ObservationTypes";
import { isFirstCycleDay } from "./assertions";

function byCycle (observationsByDay: Record<string, Observation[]>): Array<Record<string, Observation[]>> {
  const observationsByCycle: Array<Record<string, Observation[]>> = [];

  let currentCycle = 0;
  const sorted = Object.keys(observationsByDay).sort();
  sorted.forEach((day) => {
    if (!observationsByDay[day][0]) {
      return;
    }
    if (isFirstCycleDay(observationsByDay[day][0], observationsByDay)) {
      currentCycle++;
    }
    if (observationsByCycle[currentCycle] === undefined) {
      observationsByCycle[currentCycle] = {};
    }
    observationsByCycle[currentCycle][day] = observationsByDay[day];
  });

  return observationsByCycle;
}

export default byCycle;
