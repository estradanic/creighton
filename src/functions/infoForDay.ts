import { DateTime } from "luxon";
import { Observation } from "../types/ObservationTypes";
import stamp from "./stamp";
import byDay from "./byDay";
import abbreviation from "./abbreviation";
import getCycleDay from "./cycleDay";
import compareObservations from "./compareObservations";

export type Info = {
  stamp: string
  abbreviation: string
  cycleDay: string
};

/**
 * Function to get the most fertile stamp/abbreviation
 * and the cycle day for a set of observations on the same day
 */
function infoForDay (observations: Observation[], dateTime: DateTime): Info {
  if (!observations || observations.length === 0) {
    return {
      stamp: "",
      abbreviation: "??",
      cycleDay: "??",
    };
  }
  const observationsByDay = byDay(observations);
  const observationsForDay = observationsByDay[dateTime.toISODate()];
  if (!observationsForDay || observationsForDay.length === 0) {
    return {
      stamp: "",
      abbreviation: "??",
      cycleDay: "??",
    };
  }
  const cycleDay = getCycleDay(observationsForDay[0], observationsByDay);
  const mostFertileObservation = observationsForDay.sort(compareObservations)[0];
  let mostFertileStamp = stamp(mostFertileObservation, observationsByDay);
  const mostFertileAbbreviation = abbreviation(mostFertileObservation);

  if (mostFertileStamp.includes("p-plus")) {
    mostFertileStamp += " p-plus-large";
  }

  return {
    cycleDay,
    stamp: mostFertileStamp,
    abbreviation: mostFertileAbbreviation,
  };
}

export default infoForDay;
