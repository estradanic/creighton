import { DateTime } from "luxon";
import { Direction, Observation } from "../types/ObservationTypes";
import stamp from "./stamp";
import byDay from "./byDay";
import abbreviation from "./abbreviation";
import getCycleDay from "./cycleDay";
import compareObservations, { blurryCompareObservations } from "./compareObservations";

export type Info = {
  stamp: string
  abbreviation: string
  cycleDay: string
  times: number
  direction: Direction
  temperature?: string
};

/**
 * Function to get the most fertile stamp/abbreviation
 * and the cycle day for a set of observations on the same day
 */
function infoForDay (observations: Observation[], dateTime: DateTime, large: boolean = true): Info {
  if (!observations || observations.length === 0) {
    return {
      stamp: "",
      abbreviation: "??",
      cycleDay: "??",
      times: 0,
      direction: "none",
    };
  }
  const observationsByDay = byDay(observations);
  const observationsForDay = observationsByDay[dateTime.toISODate()];
  if (!observationsForDay || observationsForDay.length === 0) {
    return {
      stamp: "",
      abbreviation: "??",
      cycleDay: "??",
      times: 0,
      direction: "none",
    };
  }
  const cycleDay = getCycleDay(observationsForDay[0], observationsByDay);

  let temperature: number | undefined = Math.max(...observationsForDay
    .map((observation) => observation.temperature ?? 0));
  if (temperature === 0 || isNaN(temperature)) {
    temperature = undefined;
  }

  const mostFertileObservation = observationsForDay.sort(compareObservations)[0];

  let mostFertileStamp = stamp(mostFertileObservation, observationsByDay);
  if (mostFertileStamp.includes("p-plus") && large) {
    mostFertileStamp += " p-plus-large";
  }

  const mostFertileAbbreviation = abbreviation(mostFertileObservation);

  let times = 1;
  observationsForDay.forEach((observation) => {
    if (observation.id === mostFertileObservation.id) {
      return;
    }
    const _abbreviation = abbreviation(observation);
    if (_abbreviation === mostFertileAbbreviation) {
      times += 1;
    }
  });

  let direction: Direction = "none";
  let tempString = `${temperature?.toLocaleString()}°`;
  if (!temperature) {
    tempString = "-";
  }
  const observationsForYesterday = observationsByDay[dateTime.minus({ days: 1 }).toISODate()];
  if (observationsForYesterday?.length) {
    const yesterdayMostFertileObservation = observationsForYesterday.sort(compareObservations)[0];
    const comparison = blurryCompareObservations(mostFertileObservation, yesterdayMostFertileObservation);
    if (comparison < -10) {
      direction = "up";
    } else if (comparison > 10) {
      direction = "down";
    }

    if (temperature) {
      let yesterdayTemperature: number | undefined = Math.max(...observationsForYesterday
        .map((observation) => observation.temperature ?? 0));
      if (yesterdayTemperature === 0 || isNaN(yesterdayTemperature)) {
        yesterdayTemperature = undefined;
      }
      if (yesterdayTemperature && yesterdayTemperature < temperature) {
        tempString += "+";
      } else if (yesterdayTemperature && yesterdayTemperature > temperature) {
        tempString += "-";
      }
    }
  }

  return {
    cycleDay,
    stamp: mostFertileStamp,
    abbreviation: mostFertileAbbreviation,
    times,
    direction,
    temperature: tempString,
  };
}

export default infoForDay;
