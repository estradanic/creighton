import { DateTime } from "luxon";
import { Observation } from "../types/ObservationTypes";
import { isMenstruation, isFertile, isPeakMucus, isThreeDaysOfNonPeakMucus } from "./assertions";

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
    if (observation.menstruation === "heavy" || observation.menstruation === "very-heavy" ||
        observation.menstruation === "medium") {
      return stamp;
    }
  } else if (isFertile(observation)) {
    stamp = "white";
  } else {
    stamp = "green";
  }
  let dayHasPeakMucus = false;
  for (const curObservation of observationsByDay[dateTime.toISODate()] ?? []) {
    if (isPeakMucus(curObservation)) {
      dayHasPeakMucus = true;
      break;
    }
  }
  if (!dayHasPeakMucus || observation.yellowOverride) {
    if (observationsByDay[dayBefore]?.length &&
        observationsByDay[dayBefore].filter((o) => o.yellowOverride).length === 0) {
      for (const curObservation of observationsByDay[dayBefore] ?? []) {
        if (isPeakMucus(curObservation) || isThreeDaysOfNonPeakMucus(curObservation, observationsByDay)) {
          if (stamp === "green") {
            stamp = "green-baby p-plus-one p-plus";
          } else if (stamp === "yellow") {
            stamp = "yellow-baby p-plus-one p-plus";
          } else {
            stamp += " p-plus-one p-plus";
          }
        }
      }
    }
    if (!stamp.includes("p-plus-one") && observationsByDay[secondDayBefore]?.length &&
        observationsByDay[secondDayBefore].filter((o) => o.yellowOverride).length === 0) {
      for (const curObservation of observationsByDay[secondDayBefore] ?? []) {
        if (isPeakMucus(curObservation) || isThreeDaysOfNonPeakMucus(curObservation, observationsByDay)) {
          if (stamp === "green") {
            stamp = "green-baby p-plus-two p-plus";
          } else if (stamp === "yellow") {
            stamp = "yellow-baby p-plus-two p-plus";
          } else {
            stamp += " p-plus-two p-plus";
          }
        }
      }
    }
    if (!stamp.includes("p-plus-one") && !stamp.includes("p-plus-two") && observationsByDay[thirdDayBefore]?.length &&
        observationsByDay[thirdDayBefore].filter((o) => o.yellowOverride).length === 0) {
      for (const curObservation of observationsByDay[thirdDayBefore] ?? []) {
        if (isPeakMucus(curObservation) || isThreeDaysOfNonPeakMucus(curObservation, observationsByDay)) {
          if (stamp === "green") {
            stamp = "green-baby p-plus-three p-plus";
          } else if (stamp === "yellow") {
            stamp = "yellow-baby p-plus-three p-plus";
          } else {
            stamp += " p-plus-three p-plus";
          }
        }
      }
    }
  } else if (observationsByDay[dayAfter]?.length) {
    let foundPeak = false;
    let foundYellowStamp = false;
    for (const curObservation of observationsByDay[dayAfter] ?? []) {
      if (isPeakMucus(curObservation)) {
        foundPeak = true;
      }
      if (curObservation.yellowOverride) {
        foundYellowStamp = true;
      }
    }
    if ((!foundPeak && isPeakMucus(observation)) || (foundYellowStamp && !observation.yellowOverride)) {
      stamp += " p-plus peak";
    }
  }
  return stamp;
};

export default stamp;
