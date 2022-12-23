import { DateTime } from "luxon";
import { Observation } from "../types/ObservationTypes";

/** Function to say whether an observation has peak type mucus */
export const isPeakMucus = ({
  sensation,
  stretchability,
  color,
  menstruation,
}: Pick<Observation, "sensation" | "stretchability" | "color" | "menstruation">): boolean => {
  return sensation === "lubricative" ||
    stretchability === "stretchy" ||
    (color === "clear" && stretchability !== "none") ||
    (!isMenstruation({ menstruation }) && (color === "red" || color === "brown"));
};

/** Function to say whether an observation is considered fertile */
export const isFertile = ({
  sensation,
  stretchability,
  color,
  consistency,
  menstruation,
}: Pick<Observation, "sensation" | "stretchability" | "color" | "consistency" | "menstruation">): boolean => {
  return isPeakMucus({ sensation, stretchability, color, menstruation }) ||
    consistency !== "na" ||
    stretchability !== "none";
};

/** Function to say whether an observation has menstruation */
export const isMenstruation = ({ menstruation }: Pick<Observation, "menstruation">): boolean => {
  return menstruation !== "none";
};

/** Function to say whether an observation occurs on the first cycle day */
export function isFirstCycleDay (observation: Observation, observationsByDay: Record<string, Observation[]>): boolean {
  const today = DateTime.fromISO(observation.datetime);
  const todaysObservations = observationsByDay[today.toISODate()];
  const yesterdaysObservations = observationsByDay[today.minus({ days: 1 }).toISODate()];
  if (todaysObservations === undefined || yesterdaysObservations === undefined) {
    return false;
  }
  const todaysObservationsMenstruation = todaysObservations.filter((observation) => isMenstruation(observation));
  const yesterdaysObservationsMenstruation = yesterdaysObservations.filter((observation) =>
    isMenstruation(observation));
  return (todaysObservationsMenstruation.length > 0 && yesterdaysObservationsMenstruation.length === 0);
}
