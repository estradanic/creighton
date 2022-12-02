import { DateTime } from "luxon";
import { Accessor } from "solid-js";
import { Observation } from "../components/ExistingObservation";
import { isMenstruation, isFertile } from "./assertions";

const stamp = (observation: Accessor<Observation>, observationsByDay: Accessor<Record<string, Observation[]>>) => {
  const dateTime = DateTime.fromISO(observation().datetime);
  const dayBefore = dateTime.minus({days: 1}).toISODate();
  const secondDayBefore = dateTime.minus({days: 2}).toISODate();
  const thirdDayBefore = dateTime.minus({days: 3}).toISODate();
  if (isMenstruation(observation())) {
    return "red";
  }
  if (isFertile(observation())) {
    return "white";
  }
  for (const curObservation of observationsByDay()[dayBefore] ?? []) {
    if (isFertile(curObservation)) {
      return "green-baby p-plus-one";
    }
  }
  for (const curObservation of observationsByDay()[secondDayBefore] ?? []) {
    if (isFertile(curObservation)) {
      return "green-baby p-plus-two";
    }
  }
  for (const curObservation of observationsByDay()[thirdDayBefore] ?? []) {
    if (isFertile(curObservation)) {
      return "green-baby p-plus-three";
    }
  }
  return "green";
};

export default stamp;
