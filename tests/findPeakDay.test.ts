import { assert, assertShallowEquals } from "./testUtils";
import findPeakDay from "../src/functions/findPeakDay";
import infoForDay, { Info } from "../src/functions/infoForDay";
import { OB } from "./observations.mock";
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
  const singlePeakInRange = [
    new OB().vh.r.dt("2021-01-01")._,
    new OB().h.r.dt("2021-01-02")._,
    new OB().h.r.dt("2021-01-03")._,
    new OB().m.r.dt("2021-01-04")._,
    new OB().m.r.dt("2021-01-05")._,
    new OB().m.r.dt("2021-01-06")._,
    new OB().l.sh.r.dt("2021-01-07")._,
    new OB().vl.st.r.dt("2021-01-08")._,
    new OB().vl.str.r.dt("2021-01-09")._,
    new OB().cw.str.dt("2021-01-10")._,
    new OB().cc.str.dt("2021-01-11")._,
    new OB().t.r.dt("2021-01-12")._,
    new OB().str.r.dt("2021-01-13")._,
    new OB().str.cw.lub.dt("2021-01-14")._,
    new OB().str.cw.lub.dt("2021-01-15")._,
    new OB().st.cw.p.dt("2021-01-16")._,
    new OB().str.c.dt("2021-01-17")._,
    new OB().str.cc.dt("2021-01-18")._,
    new OB().str.cc.dt("2021-01-19")._,
    new OB().str.cw.lub.dt("2021-01-20")._,
    new OB().st.cc.dt("2021-01-21")._,
    new OB().t.y.dt("2021-01-22")._,
    new OB().str.y.p.dt("2021-01-23")._,
    new OB().str.c.dt("2021-01-24")._,
    new OB().str.y.p.dt("2021-01-25")._,
    new OB().t.cc.dt("2021-01-26")._,
    new OB().str.cw.p.dt("2021-01-27")._,
    new OB().str.cw.p.dt("2021-01-28")._,
    new OB().t.c.dt("2021-01-29")._,
    new OB().str.cc.p.dt("2021-01-30")._,
    new OB().t.c.dt("2021-01-31")._,
    new OB().t.cc.dt("2021-02-01")._,
  ];

  const noPeakInRange = [
    new OB().vh.r.dt("2021-01-01")._,
    new OB().h.r.dt("2021-01-02")._,
    new OB().h.r.dt("2021-01-03")._,
    new OB().m.r.dt("2021-01-04")._,
    new OB().m.r.dt("2021-01-05")._,
    new OB().m.r.dt("2021-01-06")._,
    new OB().l.sh.r.dt("2021-01-07")._,
    new OB().vl.st.r.dt("2021-01-08")._,
    new OB().vl.str.r.dt("2021-01-09")._,
    new OB().cw.str.dt("2021-01-10")._,
    new OB().cc.str.dt("2021-01-11")._,
    new OB().t.r.dt("2021-01-12")._,
    new OB().str.r.dt("2021-01-13")._,
    new OB().str.cw.dt("2021-01-14")._,
    new OB().str.cw.dt("2021-01-15")._,
    new OB().st.cw.p.dt("2021-01-16")._,
    new OB().str.c.dt("2021-01-17")._,
    new OB().str.cc.dt("2021-01-18")._,
    new OB().str.cc.dt("2021-01-19")._,
    new OB().str.cw.dt("2021-01-20")._,
    new OB().st.cc.dt("2021-01-21")._,
    new OB().t.c.dt("2021-01-22")._,
    new OB().str.c.p.dt("2021-01-23")._,
    new OB().str.c.dt("2021-01-24")._,
    new OB().str.c.p.dt("2021-01-25")._,
    new OB().t.cc.dt("2021-01-26")._,
    new OB().str.cw.p.dt("2021-01-27")._,
    new OB().str.cw.p.dt("2021-01-28")._,
    new OB().t.c.dt("2021-01-29")._,
    new OB().str.cc.p.dt("2021-01-30")._,
    new OB().t.c.dt("2021-01-31")._,
    new OB().t.cc.dt("2021-02-01")._,
  ];

  const noPeakInRangeWithDownDirection = [
    new OB().vh.r.dt("2021-01-01")._,
    new OB().h.r.dt("2021-01-02")._,
    new OB().h.r.dt("2021-01-03")._,
    new OB().m.r.dt("2021-01-04")._,
    new OB().m.r.dt("2021-01-05")._,
    new OB().m.r.dt("2021-01-06")._,
    new OB().l.sh.r.dt("2021-01-07")._,
    new OB().vl.st.r.dt("2021-01-08")._,
    new OB().vl.str.r.dt("2021-01-09")._,
    new OB().cw.str.dt("2021-01-10")._,
    new OB().cc.str.dt("2021-01-11")._,
    new OB().t.r.dt("2021-01-12")._,
    new OB().str.r.dt("2021-01-13")._,
    new OB().str.cw.lub.dt("2021-01-14")._,
    new OB().str.cw.lub.dt("2021-01-15")._,
    new OB().st.cw.p.dt("2021-01-16")._,
    new OB().str.c.dt("2021-01-17")._,
    new OB().str.cc.dt("2021-01-18")._,
    new OB().str.cc.dt("2021-01-19")._,
    new OB().str.cw.lub.dt("2021-01-20")._,
    new OB().st.cc.dt("2021-01-21")._,
    new OB().t.c.dt("2021-01-22")._,
    new OB().str.c.p.dt("2021-01-23")._,
    new OB().str.c.dt("2021-01-24")._,
    new OB().str.c.p.dt("2021-01-25")._,
    new OB().t.cc.dt("2021-01-26")._,
    new OB().str.cw.p.dt("2021-01-27")._,
    new OB().str.cw.p.dt("2021-01-28")._,
    new OB().t.c.dt("2021-01-29")._,
    new OB().str.cc.p.dt("2021-01-30")._,
    new OB().t.c.dt("2021-01-31")._,
    new OB().t.cc.dt("2021-02-01")._,
  ];

  const noPeakInRangeNoDirectionWithTemps = [
    new OB().vh.r.dt("2021-01-01")._,
    new OB().h.r.dt("2021-01-02")._,
    new OB().h.r.dt("2021-01-03")._,
    new OB().m.r.dt("2021-01-04")._,
    new OB().m.r.dt("2021-01-05")._,
    new OB().m.r.dt("2021-01-06")._,
    new OB().l.sh.r.dt("2021-01-07")._,
    new OB().vl.st.r.dt("2021-01-08")._,
    new OB().vl.str.r.dt("2021-01-09")._,
    new OB().cw.str.dt("2021-01-10")._,
    new OB().cc.str.dt("2021-01-11")._,
    new OB().t.r.dt("2021-01-12")._,
    new OB().str.r.dt("2021-01-13")._,
    new OB().str.cw.dt("2021-01-14")._,
    new OB().str.cw.dt("2021-01-15").tmp(97.16)._,
    new OB().st.cw.p.dt("2021-01-16").tmp(96.97)._,
    new OB().str.c.dt("2021-01-17").tmp(97.41)._,
    new OB().str.cc.dt("2021-01-18").tmp(97.41)._,
    new OB().str.cc.dt("2021-01-19").tmp(97.88)._,
    new OB().str.cw.dt("2021-01-20").tmp(97.9)._,
    new OB().st.cc.dt("2021-01-21").tmp(97.9)._,
    new OB().t.c.dt("2021-01-22").tmp(98.11)._,
    new OB().str.c.p.dt("2021-01-23").tmp(97.73)._,
    new OB().str.c.dt("2021-01-24")._,
    new OB().str.c.p.dt("2021-01-25")._,
    new OB().t.cc.dt("2021-01-26")._,
    new OB().str.cw.p.dt("2021-01-27")._,
    new OB().str.cw.p.dt("2021-01-28")._,
    new OB().t.c.dt("2021-01-29")._,
    new OB().str.cc.p.dt("2021-01-30")._,
    new OB().t.c.dt("2021-01-31")._,
    new OB().t.cc.dt("2021-02-01")._,
  ];

  const multiplePeaksDifferentiatedByDirection = [
    new OB().vh.r.dt("2021-01-01")._,
    new OB().h.r.dt("2021-01-02")._,
    new OB().h.r.dt("2021-01-03")._,
    new OB().m.r.dt("2021-01-04")._,
    new OB().m.r.dt("2021-01-05")._,
    new OB().m.r.dt("2021-01-06")._,
    new OB().l.sh.r.dt("2021-01-07")._,
    new OB().vl.st.r.dt("2021-01-08")._,
    new OB().vl.str.r.dt("2021-01-09")._,
    new OB().cw.str.dt("2021-01-10")._,
    new OB().cc.str.dt("2021-01-11")._,
    new OB().t.r.dt("2021-01-12")._,
    new OB().str.r.dt("2021-01-13")._,
    new OB().str.cw.lub.dt("2021-01-14")._,
    new OB().str.cw.lub.dt("2021-01-15")._,
    new OB().str.cc.p.dt("2021-01-16")._,
    new OB().st.cw.dt("2021-01-17")._,
    new OB().str.cc.dt("2021-01-18")._,
    new OB().str.cc.lub.dt("2021-01-19")._,
    new OB().str.cw.dt("2021-01-20")._,
    new OB().st.cc.dt("2021-01-21")._,
    new OB().t.y.dt("2021-01-22")._,
    new OB().str.y.p.dt("2021-01-23")._,
    new OB().str.c.dt("2021-01-24")._,
    new OB().str.y.p.dt("2021-01-25")._,
    new OB().t.cc.dt("2021-01-26")._,
    new OB().str.cw.p.dt("2021-01-27")._,
    new OB().str.cw.p.dt("2021-01-28")._,
    new OB().t.c.dt("2021-01-29")._,
    new OB().str.cc.p.dt("2021-01-30")._,
    new OB().t.c.dt("2021-01-31")._,
    new OB().t.cc.dt("2021-02-01")._,
  ];

  return assert(
    assertShallowEquals(findPeakDay(createCycle(singlePeakInRange)),
      "2021-01-21", "Only peak within 9-17 days of cycle end"),
    assertShallowEquals(findPeakDay(createCycle(noPeakInRange)),
      undefined, "No peak within 9-17 days of cycle end"),
    assertShallowEquals(findPeakDay(createCycle(noPeakInRangeWithDownDirection)),
      "2021-01-20", "No explicit peak within 9-17 days of cycle end, but down direction indicates peak"),
    assertShallowEquals(findPeakDay(createCycle(noPeakInRangeNoDirectionWithTemps)),
      "2021-01-23", "No explicit peak within 9-17 days of cycle end, no down direction, but peak indicated by temps"),
    assertShallowEquals(findPeakDay(createCycle(multiplePeaksDifferentiatedByDirection)),
      "2021-01-16", "Multiple peaks within 9-17 days of cycle end, but direction indicates true peak"),
  );
}
