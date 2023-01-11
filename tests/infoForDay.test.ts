import { assert, assertDeepEquals, assertShallowEquals } from "./testUtils";
import {
  multiplePeaksDifferentiatedByDirection,
  noPeakInRange,
} from "./observations.mock";
import infoForDay from "../src/functions/infoForDay";
import { DateTime } from "luxon";
import abbreviation from "../src/functions/abbreviation";
import stamp from "../src/functions/stamp";
import byDay from "../src/functions/byDay";

export function testInfoForDay (): boolean {
  return assert(
    assertDeepEquals(infoForDay([], DateTime.fromISO("2021-01-01")), {
      abbreviation: "??",
      cycleDay: "??",
      direction: "none",
      intercourse: false,
      pms: false,
      stamp: "",
      times: 0,
    }, "returns dummy info object if there are no observations"),
    assertShallowEquals(infoForDay(noPeakInRange, DateTime.fromISO("2021-01-01"), false).stamp,
      stamp(noPeakInRange[0], byDay(noPeakInRange)),
      "passes stamp through correctly"),
    assertShallowEquals(infoForDay(noPeakInRange, DateTime.fromISO("2021-01-01")).abbreviation,
      abbreviation(noPeakInRange[0], noPeakInRange),
      "passes abbreviation through correctly"),
    assertShallowEquals(infoForDay(noPeakInRange, DateTime.fromISO("2021-01-01")).stamp,
      `${stamp(noPeakInRange[0], byDay(noPeakInRange))} large`,
      "adds 'large' to stamp when large is true or not specified"),
    assertShallowEquals(infoForDay(noPeakInRange, DateTime.fromISO("2021-01-01"), false).stamp,
      stamp(noPeakInRange[2], byDay(noPeakInRange)),
      "uses the more fertile observation for stamp when there are multiple. menstruation overrides"),
    assertShallowEquals(infoForDay(noPeakInRange, DateTime.fromISO("2021-01-02")).abbreviation,
      abbreviation(noPeakInRange[3], noPeakInRange),
      "uses the more fertile observation for abbreviation when there are multiple"),
    assertShallowEquals(
      infoForDay(multiplePeaksDifferentiatedByDirection, DateTime.fromISO("2021-01-14")).direction, "up",
      "calculates an up direction correctly",
    ),
    assertShallowEquals(
      infoForDay(multiplePeaksDifferentiatedByDirection, DateTime.fromISO("2021-01-16")).direction, "down",
      "calculates a down direction correctly",
    ),
    assertShallowEquals(
      infoForDay(multiplePeaksDifferentiatedByDirection, DateTime.fromISO("2021-01-01")).direction, "none",
      "calculates a none direction correctly",
    ),
    assertShallowEquals(infoForDay(noPeakInRange, DateTime.fromISO("2021-01-02")).temperature, "97°",
      "passes through temperature correctly"),
    assertShallowEquals(infoForDay(noPeakInRange, DateTime.fromISO("2021-01-15")).temperature, "-",
      "uses '-' for temperature if there is no temperature"),
    assertShallowEquals(infoForDay(noPeakInRange, DateTime.fromISO("2021-01-01")).pms, true,
      "passes through pms correctly"),
    assertShallowEquals(infoForDay(noPeakInRange, DateTime.fromISO("2021-01-01")).intercourse, true,
      "passes through intercourse correctly"),
    assertShallowEquals(infoForDay(noPeakInRange, DateTime.fromISO("2021-01-26")).times, 2,
      "calculates times correctly"),
  );
}
