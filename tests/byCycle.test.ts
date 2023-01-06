import { assertDeepEquals } from "./testUtils";
import byCycle from "../src/functions/byCycle";
import { OB } from "./observations.mock";
import { Observation } from "../src/types/ObservationTypes";

export function testByCycle (): boolean {
  const obd1 = {
    "2019-01-01": [new OB().dt("2019-01-01")._],
    "2019-01-02": [new OB().dt("2019-01-02").vl._],
    "2019-01-03": [new OB().dt("2019-01-03")._],
    "2019-01-04": [new OB().dt("2019-01-04").r._],
    "2019-01-05": [new OB().dt("2019-01-05").vl._],
  } satisfies Record<string, Observation[]>;

  const _byCycle = byCycle(obd1);

  return assertDeepEquals(_byCycle, [
    { "2019-01-01": [new OB().dt("2019-01-01")._] },
    {
      "2019-01-02": [new OB().dt("2019-01-02").vl._],
      "2019-01-03": [new OB().dt("2019-01-03")._],
      "2019-01-04": [new OB().dt("2019-01-04").r._],
    },
    { "2019-01-05": [new OB().dt("2019-01-05").vl._] },
  ], "byCycle should return an array of observations grouped by cycle");
}
