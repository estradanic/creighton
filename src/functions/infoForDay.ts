import { DateTime } from "luxon";
import { Direction, Observation } from "../types/ObservationTypes";
import stamp from "./stamp";
import byDay from "./byDay";
import abbreviation from "./abbreviation";
import getCycleDay from "./cycleDay";
import {
  compareObservationsForAbbreviation,
  compareObservationsForStamp,
  blurryCompareObservations,
} from "./compareObservations";

export type Info = {
  stamp: string
  abbreviation: string
  cycleDay: string
  times: number
  direction: Direction
  pms: boolean
  temperature?: string
  intercourse: boolean
};

const DUMMY_INFO = {
  stamp: "",
  abbreviation: "??",
  cycleDay: "??",
  times: 0,
  pms: false,
  intercourse: false,
  direction: "none",
} as const;

/**
 * Function to get the relevant info for a cycle day
 */
function infoForDay (observations: Observation[], dateTime: DateTime, large: boolean = true): Info {
  if (!observations || observations.length === 0) {
    return DUMMY_INFO;
  }
  const observationsByDay = byDay(observations);
  const observationsForDay = observationsByDay[dateTime.toISODate()];
  if (!observationsForDay || observationsForDay.length === 0) {
    return DUMMY_INFO;
  }
  const cycleDay = getCycleDay(observationsForDay[0], observationsByDay);

  let temperature: number | undefined = Math.max(...observationsForDay
    .map((observation) => observation.temperature ?? 0));
  if (temperature === 0 || isNaN(temperature)) {
    temperature = undefined;
  }

  let pms = false;
  let intercourse = false;
  observationsForDay.forEach((observation) => {
    if (observation.pms) {
      pms = true;
    }
    if (observation.intercourse) {
      intercourse = true;
    }
  });

  const mostFertileObservationForStamp = observationsForDay.sort(compareObservationsForStamp)[0];
  const mostFertileObservationForAbbreviation = observationsForDay.sort(compareObservationsForAbbreviation)[0];

  let mostFertileStamp = stamp(mostFertileObservationForStamp, observationsByDay);
  if (mostFertileStamp.includes("p-plus") && large) {
    mostFertileStamp += " p-plus-large";
  }

  const mostFertileAbbreviation = abbreviation(mostFertileObservationForAbbreviation, observationsForDay);

  let times = 1;
  observationsForDay.forEach((observation) => {
    if (observation.id === mostFertileObservationForStamp.id) {
      return;
    }
    const _abbreviation = abbreviation(observation, observationsForDay);
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
    const yesterdayMostFertileObservation = observationsForYesterday.sort(compareObservationsForAbbreviation)[0];
    const comparison = blurryCompareObservations(
      mostFertileObservationForAbbreviation,
      yesterdayMostFertileObservation,
    );
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
    pms,
    intercourse,
  };
}

export default infoForDay;
