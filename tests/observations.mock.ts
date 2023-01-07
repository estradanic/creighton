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

  /** build */
  get _ (): Observation {
    return this.observation;
  }
}
