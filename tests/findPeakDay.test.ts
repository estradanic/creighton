import { assert, assertShallowEquals } from "./testUtils";
import findPeakDay from "../src/functions/findPeakDay";
import infoForDay, { Info } from "../src/functions/infoForDay";
import {
  multiplePeaksDifferentiatedByDirection,
  multiplePeaksDifferentiatedByTemps,
  noPeakInRange,
  noPeakInRangeNoDirectionWithTemps,
  noPeakInRangeWithDownDirection,
  singlePeakInRange,
} from "./observations.mock";
import { DateTime } from "luxon";
import { Observation } from "../src/types/ObservationTypes";

function createCycle (observations: Observation[]): Record<string, Info> {
  const cycle = {};
  observations.forEach((o) => {
    cycle[o.datetime] = infoForDay(observations, DateTime.fromISO(o.datetime));
  });
  return cycle;
}

export function testFindPeakDay (): boolean {
  return assert(
    assertShallowEquals(findPeakDay(createCycle(singlePeakInRange)),
      "2021-01-21", "Only peak within 9-17 days of cycle end"),
    assertShallowEquals(findPeakDay(createCycle(noPeakInRange)),
      undefined, "No peak within 9-17 days of cycle end"),
    assertShallowEquals(findPeakDay(createCycle(noPeakInRangeWithDownDirection)),
      "2021-01-20", "No explicit peak within 9-17 days of cycle end, but down direction indicates peak"),
    assertShallowEquals(findPeakDay(createCycle(noPeakInRangeNoDirectionWithTemps)),
      "2021-01-22", "No explicit peak within 9-17 days of cycle end, no down direction, but peak indicated by temps"),
    assertShallowEquals(findPeakDay(createCycle(multiplePeaksDifferentiatedByDirection)),
      "2021-01-16", "Multiple peaks within 9-17 days of cycle end, but direction indicates true peak"),
    assertShallowEquals(findPeakDay(createCycle(multiplePeaksDifferentiatedByTemps)),
      "2021-01-16", "Multiple peaks within 9-17 days of cycle end, but temps indicate true peak"),
  );
}
