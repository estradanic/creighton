import { DateTime } from "luxon";
import { Observation } from "../types/ObservationTypes";
import { isMenstruation, isFertile, isPeakMucus } from "./assertions";

/** Function to get the stamp css classes for an observation, given the context of the observations by day */
const stamp = (observation: Observation, observationsByDay: Record<string, Observation[]>): string => {
  let stamp: string = "";
  const dateTime = DateTime.fromISO(observation.datetime);
  const dayAfter = dateTime.plus({ days: 1 }).toISODate();
  const dayBefore = dateTime.minus({ days: 1 }).toISODate();
  const secondDayBefore = dateTime.minus({ days: 2 }).toISODate();
  const thirdDayBefore = dateTime.minus({ days: 3 }).toISODate();
  if (observation.yellowOverride) {
    stamp = "yellow";
  } else if (isMenstruation(observation) || observation.color === "red" || observation.color === "brown") {
    stamp = "red";
  } else if (isFertile(observation)) {
    stamp = "white";
  } else {
    stamp = "green";
  }
  if (!isPeakMucus(observation)) {
    for (const curObservation of observationsByDay[dayBefore] ?? []) {
      if (isPeakMucus(curObservation)) {
        if (stamp === "green") {
          stamp = "green-baby p-plus-one p-plus";
        } else {
          stamp += " p-plus-one p-plus";
        }
      }
    }
    if (!stamp.includes("p-plus-one")) {
      for (const curObservation of observationsByDay[secondDayBefore] ?? []) {
        if (isPeakMucus(curObservation)) {
          if (stamp === "green") {
            stamp = "green-baby p-plus-two p-plus";
          } else {
            stamp += " p-plus-two p-plus";
          }
        }
      }
    }
    if (!stamp.includes("p-plus-one") && !stamp.includes("p-plus-two")) {
      for (const curObservation of observationsByDay[thirdDayBefore] ?? []) {
        if (isPeakMucus(curObservation)) {
          if (stamp === "green") {
            stamp = "green-baby p-plus-three p-plus";
          } else {
            stamp += " p-plus-three p-plus";
          }
        }
      }
    }
  } else {
    let foundPeak = false;
    for (const curObservation of observationsByDay[dayAfter] ?? []) {
      if (isPeakMucus(curObservation)) {
        foundPeak = true;
        break;
      }
    }
    if (!foundPeak) {
      stamp += " p-plus peak";
    }
  }
  return stamp;
};

export default stamp;
