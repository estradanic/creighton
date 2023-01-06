import cycleDay from "../src/functions/cycleDay";
import { Observation } from "../src/types/ObservationTypes";
import { OB } from "./observations.mock";
import { assert, assertShallowEquals } from "./testUtils";

export function testCycleDay (): boolean {
  const obd1 = {
    "2019-01-01": [new OB().dt("2019-01-01")._],
    "2019-01-02": [new OB().dt("2019-01-02").vl._],
    "2019-01-03": [new OB().dt("2019-01-03")._],
  } satisfies Record<string, Observation[]>;

  const obd2 = {
    "2020-01-01": [new OB().dt("2020-01-01").vl._],
    "2020-01-02": [new OB().dt("2020-01-02")._],
    "2020-01-03": [new OB().dt("2020-01-03").vl._],
  } satisfies Record<string, Observation[]>;

  const obd3 = {
    "2021-01-01": [new OB().dt("2021-01-01")._],
    "2021-01-02": [new OB().dt("2021-01-02")._, new OB().vl._],
    "2021-01-03": [new OB().dt("2021-01-03").vl._],
  } satisfies Record<string, Observation[]>;

  return assert(
    assertShallowEquals(cycleDay(obd1["2019-01-01"][0], obd1), "??", "2019-01-01 -> ??"),
    assertShallowEquals(cycleDay(obd1["2019-01-02"][0], obd1), "1", "2019-01-02 -> 1"),
    assertShallowEquals(cycleDay(obd1["2019-01-03"][0], obd1), "2", "2019-01-03 -> 2"),
    assertShallowEquals(cycleDay(obd2["2020-01-01"][0], obd2), "??", "2020-01-01 -> ??"),
    assertShallowEquals(cycleDay(obd2["2020-01-02"][0], obd2), "??", "2020-01-02 -> ??"),
    assertShallowEquals(cycleDay(obd2["2020-01-03"][0], obd2), "1", "2020-01-03 -> 1"),
    assertShallowEquals(cycleDay(obd3["2021-01-01"][0], obd3), "??", "2021-01-01 -> ??"),
    assertShallowEquals(cycleDay(obd3["2021-01-02"][0], obd3), "1", "2021-01-02 -> 1"),
    assertShallowEquals(cycleDay(obd3["2021-01-03"][0], obd3), "2", "2021-01-03 -> 2"),
  );
};
