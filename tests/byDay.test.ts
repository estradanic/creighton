import { assertDeepEquals } from "./testUtils";
import byDay from "../src/functions/byDay";
import { OB } from "./observations.mock";
import { Observation } from "../src/types/ObservationTypes";

export function testByCycle (): boolean {
  const observations = [
    new OB().dt("2019-01-01T00:00:00.000")._,
    new OB().dt("2019-01-01T01:00:00.000")._,
    new OB().dt("2019-01-02")._,
    new OB().dt("2019-01-03")._,
    new OB().dt("2019-01-04")._,
    new OB().dt("2019-01-05")._,
  ] satisfies Observation[];
  const _byDay = byDay(observations);

  return assertDeepEquals(_byDay, {
    "2019-01-01": [
      new OB().dt("2019-01-01T00:00:00.000")._,
      new OB().dt("2019-01-01T01:00:00.000")._,
    ],
    "2019-01-02": [new OB().dt("2019-01-02")._],
    "2019-01-03": [new OB().dt("2019-01-03")._],
    "2019-01-04": [new OB().dt("2019-01-04")._],
    "2019-01-05": [new OB().dt("2019-01-05")._],
    "2019-01-06": [],
  }, "byDay should return observations grouped by day, padded with one more empty day");
}
