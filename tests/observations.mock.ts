import { Observation } from "../src/types/ObservationTypes";

export class OB {
  observation: Observation;

  constructor () {
    this.observation = {
      id: "id",
      sensation: "dry",
      stretchability: "none",
      color: "na",
      menstruation: "none",
      consistency: "na",
      datetime: "2021-01-01T00:00:00.000Z",
      notes: "",
      appearance: "dry",
      yellowOverride: false,
      pms: false,
      intercourse: false,
      coverage: "na",
    };
  }

  id (id: string): OB {
    this.observation.id = id;
    return this;
  }

  /** intercourse */
  get i (): OB {
    this.observation.intercourse = true;
    return this;
  }

  /** pms */
  get pms (): OB {
    this.observation.pms = true;
    return this;
  }

  /** smooth */
  get sm (): OB {
    this.observation.sensation = "smooth";
    return this;
  }

  /** lubricative */
  get lub (): OB {
    this.observation.sensation = "lubricative";
    return this;
  }

  /** sticky */
  get st (): OB {
    this.observation.stretchability = "sticky";
    return this;
  }

  /** tacky */
  get t (): OB {
    this.observation.stretchability = "tacky";
    return this;
  }

  /** stretchy */
  get str (): OB {
    this.observation.stretchability = "stretchy";
    return this;
  }

  /** cloudy-white */
  get cw (): OB {
    this.observation.color = "cloudy-white";
    return this;
  }

  /** cloudy-clear */
  get cc (): OB {
    this.observation.color = "cloudy-clear";
    return this;
  }

  /** clear */
  get c (): OB {
    this.observation.color = "clear";
    return this;
  }

  /** red */
  get r (): OB {
    this.observation.color = "red";
    return this;
  }

  /** brown */
  get b (): OB {
    this.observation.color = "brown";
    return this;
  }

  /** yellow */
  get y (): OB {
    this.observation.color = "yellow";
    return this;
  }

  /** very-light */
  get vl (): OB {
    this.observation.menstruation = "very-light";
    return this;
  }

  /** light */
  get l (): OB {
    this.observation.menstruation = "light";
    return this;
  }

  /** medium */
  get m (): OB {
    this.observation.menstruation = "medium";
    return this;
  }

  /** heavy */
  get h (): OB {
    this.observation.menstruation = "heavy";
    return this;
  }

  /** very-heavy */
  get vh (): OB {
    this.observation.menstruation = "very-heavy";
    return this;
  }

  /** pasty */
  get p (): OB {
    this.observation.consistency = "pasty";
    return this;
  }

  /** gummy */
  get g (): OB {
    this.observation.consistency = "gummy";
    return this;
  }

  /** ropey */
  get rp (): OB {
    this.observation.consistency = "ropey";
    return this;
  }

  /** stringy */
  get stgy (): OB {
    this.observation.consistency = "stringy";
    return this;
  }

  /** datetime */
  dt (datetime: string): OB {
    this.observation.datetime = datetime;
    return this;
  }

  /** shiny */
  get sh (): OB {
    this.observation.appearance = "shiny";
    return this;
  }

  /** damp */
  get d (): OB {
    this.observation.appearance = "damp";
    return this;
  }

  /** wet */
  get w (): OB {
    this.observation.appearance = "wet";
    return this;
  }

  /** yellowOverride */
  get yo (): OB {
    this.observation.yellowOverride = true;
    return this;
  }

  /** blip */
  get bp (): OB {
    this.observation.coverage = "blip";
    return this;
  }

  /** little */
  get ll (): OB {
    this.observation.coverage = "little";
    return this;
  }

  /** much */
  get mch (): OB {
    this.observation.coverage = "much";
    return this;
  }

  /** all */
  get a (): OB {
    this.observation.coverage = "all";
    return this;
  }

  tmp (tmp: number): OB {
    this.observation.temperature = tmp;
    return this;
  }

  /** build */
  get _ (): Observation {
    return this.observation;
  }
}

export const singlePeakInRange = [
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

export const noPeakInRange = [
  new OB().vh.r.dt("2021-01-01").pms.i._,
  new OB().c.sh.dt("2021-01-02").tmp(97)._,
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
  new OB().t.cc.dt("2021-01-26").id("2nd")._,
  new OB().str.cw.p.dt("2021-01-27")._,
  new OB().str.cw.p.dt("2021-01-28")._,
  new OB().t.c.dt("2021-01-29")._,
  new OB().str.cc.p.dt("2021-01-30")._,
  new OB().t.c.dt("2021-01-31")._,
  new OB().t.cc.dt("2021-02-01")._,
];

export const noPeakInRangeWithDownDirection = [
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

export const noPeakInRangeNoDirectionWithTemps = [
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

export const multiplePeaksDifferentiatedByDirection = [
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
  new OB().st.r.dt("2021-01-13")._,
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

export const multiplePeaksDifferentiatedByTemps = [
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
  new OB().str.r.dt("2021-01-13").tmp(97)._,
  new OB().str.cw.dt("2021-01-14").tmp(97.5)._,
  new OB().str.cw.dt("2021-01-15").tmp(98)._,
  new OB().str.cw.p.dt("2021-01-16").tmp(98.5)._,
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
