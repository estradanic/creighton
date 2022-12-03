import { DateTime } from "luxon";
import { Accessor } from "solid-js";
import { Observation } from "../components/ExistingObservation";
import { isMenstruation, isFertile, isPeakMucus } from "./assertions";

const stamp = (observation: Accessor<Observation>, observationsByDay: Accessor<Record<string, Observation[]>>) => {
  let stamp = undefined;
  const dateTime = DateTime.fromISO(observation().datetime);
  const dayBefore = dateTime.minus({days: 1}).toISODate();
  const secondDayBefore = dateTime.minus({days: 2}).toISODate();
  const thirdDayBefore = dateTime.minus({days: 3}).toISODate();
  if (isMenstruation(observation()) || observation().color === "red" || observation().color === "brown") {
    stamp = "red";
  } else if (isFertile(observation())) {
    stamp = "white";
  } else {
    stamp = "green";
  }
  if (!isPeakMucus(observation())) {
    for (const curObservation of observationsByDay()[dayBefore] ?? []) {
      if (isPeakMucus(curObservation)) {
        if (stamp === "green") {
          stamp = "green-baby p-plus-one p-plus";
        } else {
          stamp += " p-plus-one p-plus";
        }
      }
    }
    for (const curObservation of observationsByDay()[secondDayBefore] ?? []) {
      if (isPeakMucus(curObservation)) {
        if (stamp === "green") {
          stamp = "green-baby p-plus-two p-plus";
        } else {
          stamp += " p-plus-two p-plus";
        }
      }
    }
    for (const curObservation of observationsByDay()[thirdDayBefore] ?? []) {
      if (isPeakMucus(curObservation)) {
        if (stamp === "green") {
          stamp = "green-baby p-plus-three p-plus";
        } else {
          stamp += " p-plus-three p-plus";
        }
      }
    }
  }
  return stamp;
};

export default stamp;
