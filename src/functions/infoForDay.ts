import {DateTime} from "luxon";
import { Observation } from "../components/ExistingObservation";
import stamp from "./stamp";
import byDay from "./byDay";
import abbreviation from "./abbreviation";
import getCycleDay from "./cycleDay";
import compareInfo from "./compareInfo";

export type Info = {
  stamp: string;
  abbreviation: string;
  cycleDay: string;
};

function infoForDay(observations: Observation[], dateTime: DateTime): Info {
  if (!observations || observations.length === 0) {
    return {
      stamp: "",
      abbreviation: "??",
      cycleDay: "??",
    };
  }
  const observationsByDay = byDay(() => observations);
  const observationsForDay = observationsByDay[dateTime.toISODate()];
  if (!observationsForDay || observationsForDay.length === 0) {
    return {
      stamp: "",
      abbreviation: "??",
      cycleDay: "??",
    };
  }
  const cycleDay = getCycleDay(() => observationsForDay[0], () => observationsByDay);
  const infos = observationsForDay.map((observation) => ({
    stamp: stamp(() => observation, () => observationsByDay),
    abbreviation: abbreviation(() => observation, () => observationsByDay),
  }));

  return {
    cycleDay,
    ...infos.sort(compareInfo)[0],
  };
}

export default infoForDay;
