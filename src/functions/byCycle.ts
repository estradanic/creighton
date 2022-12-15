import { Observation } from "../types/ObservationTypes";
import cycleDay from "./cycleDay";

function byCycle (observationsByDay: Record<string, Observation[]>): Array<Record<string, Observation[]>> {
  const observationsByCycle: Array<Record<string, Observation[]>> = [];

  Object.keys(observationsByDay).sort().forEach((day) => {
    let currentCycle = 0;
    let currentCycleDay = "??";
    let observationCycleDay = "??";
    if (observationsByDay[day][0]) {
      observationCycleDay = cycleDay(observationsByDay[day][0], observationsByDay);
    } else {
      return;
    }
    if ((currentCycleDay === "??" && observationCycleDay !== "??") ||
        (parseInt(observationCycleDay) < parseInt(currentCycleDay))) {
      currentCycle++;
    }
    currentCycleDay = observationCycleDay;
    if (observationsByCycle[currentCycle] === undefined) {
      observationsByCycle[currentCycle] = {};
    }
    observationsByCycle[currentCycle][day] = observationsByDay[day];
  });

  return observationsByCycle;
}

export default byCycle;
