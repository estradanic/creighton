import { assert, assertShallowEquals } from "./testUtils";
import findPeakDay from "../src/functions/findPeakDay";
import infoForDay from "../src/functions/infoForDay";
import { OB } from "./observations.mock";
import { DateTime } from "luxon";

export function testFindPeakDay (): boolean {
  const c1 = {
    "2021-01-01": infoForDay([new OB().m.r._], DateTime.fromISO("2021-01-01")),
    "2021-01-02": infoForDay([new OB().m.r._], DateTime.fromISO("2021-01-02")),
    "2021-01-03": infoForDay([new OB().m.r._], DateTime.fromISO("2021-01-03")),
    "2021-01-04": infoForDay([new OB().m.r._], DateTime.fromISO("2021-01-04")),
    "2021-01-05": infoForDay([new OB().vl.sh.r._], DateTime.fromISO("2021-01-05")),
    "2021-01-06": infoForDay([new OB().vl.sh.st.r._], DateTime.fromISO("2021-01-06")),
    "2021-01-07": infoForDay([new OB().vl.sh.t.cc._], DateTime.fromISO("2021-01-07")),
    "2021-01-08": infoForDay([new OB().m._], DateTime.fromISO("2021-01-08")), // continue
    "2021-01-09": infoForDay([new OB().m._], DateTime.fromISO("2021-01-09")),
    "2021-01-10": infoForDay([new OB().m._], DateTime.fromISO("2021-01-10")),
    "2021-01-11": infoForDay([new OB().m._], DateTime.fromISO("2021-01-11")),
    "2021-01-12": infoForDay([new OB().m._], DateTime.fromISO("2021-01-12")),
    "2021-01-13": infoForDay([new OB().m._], DateTime.fromISO("2021-01-13")),
    "2021-01-14": infoForDay([new OB().m._], DateTime.fromISO("2021-01-14")),
    "2021-01-15": infoForDay([new OB().m._], DateTime.fromISO("2021-01-15")),
    "2021-01-16": infoForDay([new OB().m._], DateTime.fromISO("2021-01-16")),
    "2021-01-17": infoForDay([new OB().m._], DateTime.fromISO("2021-01-17")),
    "2021-01-18": infoForDay([new OB().m._], DateTime.fromISO("2021-01-18")),
    "2021-01-19": infoForDay([new OB().m._], DateTime.fromISO("2021-01-19")),
    "2021-01-20": infoForDay([new OB().m._], DateTime.fromISO("2021-01-20")),
    "2021-01-21": infoForDay([new OB().m._], DateTime.fromISO("2021-01-21")),
    "2021-01-22": infoForDay([new OB().m._], DateTime.fromISO("2021-01-22")),
    "2021-01-23": infoForDay([new OB().m._], DateTime.fromISO("2021-01-23")),
    "2021-01-24": infoForDay([new OB().m._], DateTime.fromISO("2021-01-24")),
    "2021-01-25": infoForDay([new OB().m._], DateTime.fromISO("2021-01-25")),
    "2021-01-26": infoForDay([new OB().m._], DateTime.fromISO("2021-01-26")),
    "2021-01-27": infoForDay([new OB().m._], DateTime.fromISO("2021-01-27")),
    "2021-01-28": infoForDay([new OB().m._], DateTime.fromISO("2021-01-28")),
    "2021-01-29": infoForDay([new OB().m._], DateTime.fromISO("2021-01-29")),
    "2021-01-30": infoForDay([new OB().m._], DateTime.fromISO("2021-01-30")),
    "2021-01-31": infoForDay([new OB().m._], DateTime.fromISO("2021-01-31")),
    "2021-02-01": infoForDay([new OB().m._], DateTime.fromISO("2021-02-01")),
  };

  return assert(
    assertShallowEquals(findPeakDay(c1), "2021-01-21", "findPeakDay(c1) === 2021-01-21"),
  );
}
