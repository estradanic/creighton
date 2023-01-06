import {
  isPeakMucus,
  isFertile,
  isMenstruation,
  isFirstCycleDay,
  isThreeDaysOfNonPeakMucus,
} from "../src/functions/assertions";
import { Observation } from "../src/types/ObservationTypes";
import { OB } from "./observations.mock";
import { assert, assertFalsy, assertTruthy } from "./testUtils";

export function testIsPeakMucus (): boolean {
  return assert(
    assertTruthy(isPeakMucus(new OB().lub._), "lubricative is peak mucus"),
    assertTruthy(isPeakMucus(new OB().str._), "stretchy is peak mucus"),
    assertTruthy(isPeakMucus(new OB().c.st._), "clear sticky is peak mucus"),
    assertTruthy(isPeakMucus(new OB().c.t._), "clear tacky is peak mucus"),
    assertTruthy(isPeakMucus(new OB().cc.st._), "cloudy-clear sticky is peak mucus"),
    assertTruthy(isPeakMucus(new OB().cc.t._), "cloudy-clear tacky is peak mucus"),
    assertTruthy(isPeakMucus(new OB().r._), "red no menstruation is peak mucus"),
    assertTruthy(isPeakMucus(new OB().b._), "brown no menstruation is peak mucus"),
    assertFalsy(isPeakMucus(new OB().cc._), "cloudy-clear no stretch is not peak mucus"),
    assertFalsy(isPeakMucus(new OB().c._), "clear no stretch is not peak mucus"),
    assertFalsy(isPeakMucus(new OB().r.vl._), "red very-light is not peak mucus"),
    assertFalsy(isPeakMucus(new OB().b.vl._), "brown very-light is not peak mucus"),
    assertFalsy(isPeakMucus(new OB()._), "dry no menstruation no stretch is not peak mucus"),
  );
}

export function testIsFertile (): boolean {
  return assert(
    assertTruthy(isFertile(new OB().lub._), "lubricative is fertile"),
    assertTruthy(isFertile(new OB().str._), "stretchy is fertile"),
    assertTruthy(isFertile(new OB().c.st._), "clear sticky is fertile"),
    assertTruthy(isFertile(new OB().c.t._), "clear tacky is fertile"),
    assertTruthy(isFertile(new OB().cc.st._), "cloudy-clear sticky is fertile"),
    assertTruthy(isFertile(new OB().cc.t._), "cloudy-clear tacky is fertile"),
    assertTruthy(isFertile(new OB().cw.st._), "cloudy-white sticky is fertile"),
    assertTruthy(isFertile(new OB().cw.t._), "cloudy-white tacky is fertile"),
    assertTruthy(isFertile(new OB().y.st._), "yellow sticky is fertile"),
    assertTruthy(isFertile(new OB().y.t._), "yellow tacky is fertile"),
    assertTruthy(isFertile(new OB().r._), "red no menstruation is fertile"),
    assertTruthy(isFertile(new OB().b._), "brown no menstruation is fertile"),
    assertFalsy(isPeakMucus(new OB().cc._), "cloudy-clear no stretch is not fertile"),
    assertFalsy(isFertile(new OB().c._), "clear no stretch is not fertile"),
    assertFalsy(isFertile(new OB().r.vl._), "red very-light is not fertile"),
    assertFalsy(isFertile(new OB().b.vl._), "brown very-light is not fertile"),
    assertFalsy(isFertile(new OB()._), "dry no menstruation no stretch is not fertile"),
  );
}

export function testIsMenstruation (): boolean {
  return assert(
    assertTruthy(isMenstruation(new OB().vl._), "very-light is menstruation"),
    assertTruthy(isMenstruation(new OB().l._), "light is menstruation"),
    assertTruthy(isMenstruation(new OB().m._), "medium is menstruation"),
    assertTruthy(isMenstruation(new OB().h._), "heavy is menstruation"),
    assertTruthy(isMenstruation(new OB().vh._), "very-heavy is menstruation"),
    assertFalsy(isMenstruation(new OB().r._), "red no menstruation is not menstruation"),
  );
}

export function testIsFirstCycleDay (): boolean {
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
    assertFalsy(isFirstCycleDay(obd1["2019-01-01"][0], obd1), "2019-01-01 is not first cycle day"),
    assertTruthy(isFirstCycleDay(obd1["2019-01-02"][0], obd1), "2019-01-02 is first cycle day"),
    assertFalsy(isFirstCycleDay(obd1["2019-01-03"][0], obd1), "2019-01-03 is not first cycle day"),
    assertFalsy(isFirstCycleDay(obd2["2020-01-01"][0], obd2), "2020-01-01 is not first cycle day"),
    assertFalsy(isFirstCycleDay(obd2["2020-01-02"][0], obd2), "2020-01-02 is not first cycle day"),
    assertTruthy(isFirstCycleDay(obd2["2020-01-03"][0], obd2), "2020-01-03 is first cycle day"),
    assertFalsy(isFirstCycleDay(obd3["2021-01-01"][0], obd3), "2021-01-01 is not first cycle day"),
    assertTruthy(isFirstCycleDay(obd3["2021-01-02"][0], obd3), "2021-01-02 is first cycle day"),
    assertFalsy(isFirstCycleDay(obd3["2021-01-03"][0], obd3), "2021-01-03 is not first cycle day"),
  );
};

export function testIsThreeDaysOfNonPeakMucus (): boolean {
  const obd1 = {
    "2019-01-01": [new OB().dt("2019-01-01").st._],
    "2019-01-02": [new OB().dt("2019-01-02").st._],
    "2019-01-03": [new OB().dt("2019-01-03").st._],
  } satisfies Record<string, Observation[]>;

  const obd2 = {
    "2020-01-01": [new OB().dt("2020-01-01").str._],
    "2020-01-02": [new OB().dt("2020-01-02").st._],
    "2020-01-03": [new OB().dt("2020-01-03").st._],
  } satisfies Record<string, Observation[]>;

  const obd3 = {
    "2021-01-01": [new OB().dt("2021-01-01")._],
    "2021-01-02": [new OB().dt("2021-01-02").st._],
    "2021-01-03": [new OB().dt("2021-01-03").st._],
  } satisfies Record<string, Observation[]>;

  return assert(
    assertTruthy(isThreeDaysOfNonPeakMucus(obd1["2019-01-03"][0], obd1), "2019-01-03 is three days of non-peak mucus"),
    assertFalsy(isThreeDaysOfNonPeakMucus(obd2["2020-01-03"][0], obd2),
      "2020-01-03 is not three days of non-peak mucus"),
    assertFalsy(isThreeDaysOfNonPeakMucus(obd3["2021-01-03"][0], obd3),
      "2021-01-03 is not three days of non-peak mucus"),
  );
};
