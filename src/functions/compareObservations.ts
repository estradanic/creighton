import {
  Observation,
  AppearanceHierarchy,
  StretchabilityHierarchy,
  ConsistencyHierarchy,
  SensationHierarchy,
  ColorHierarchy,
  MenstruationHierarchy,
  AppearanceMultiplier,
  ConsistencyMultiplier,
  SensationMultiplier,
  ColorMultiplier,
  StretchabilityMultiplier,
  MenstruationMultiplier,
} from "../types/ObservationTypes";
import { isMenstruation, isPeakMucus } from "./assertions";

const LUBRICATIVE_SCORE = 1000;
const STRETCHY_SCORE = 10;
const TACKY_SCORE = 8;
const STICKY_SCORE = 6;
const CLEAR_RED_BROWN_SCORE = 10;

export function blurryCompareObservations (a: Observation, b: Observation): number {
  if (a.yellowOverride || b.yellowOverride) {
    return 0;
  }
  if (isMenstruation(a) || isMenstruation(b)) {
    return 0;
  }
  let aScore = 0;
  let bScore = 0;

  if (a.sensation === "lubricative") {
    aScore += LUBRICATIVE_SCORE;
  }
  if (b.sensation === "lubricative") {
    bScore += LUBRICATIVE_SCORE;
  }
  if (a.stretchability === "stretchy") {
    aScore += STRETCHY_SCORE;
  } else if (a.stretchability === "tacky") {
    aScore += TACKY_SCORE;
  } else if (a.stretchability === "sticky") {
    aScore += STICKY_SCORE;
  }
  if (b.stretchability === "stretchy") {
    bScore += STRETCHY_SCORE;
  } else if (b.stretchability === "tacky") {
    bScore += TACKY_SCORE;
  } else if (b.stretchability === "sticky") {
    bScore += STICKY_SCORE;
  }
  if (a.color === "clear" || a.color === "red" || a.color === "brown") {
    aScore += CLEAR_RED_BROWN_SCORE;
  }
  if (b.color === "clear" || b.color === "red" || b.color === "brown") {
    bScore += CLEAR_RED_BROWN_SCORE;
  }

  return bScore - aScore;
}

function compareOnDetails (a: Observation, b: Observation): number {
  const aScore = (MenstruationHierarchy[a.menstruation] ?? 0) * MenstruationMultiplier +
    (AppearanceHierarchy[a.appearance] ?? 0) * AppearanceMultiplier +
    (StretchabilityHierarchy[a.stretchability] ?? 0) * StretchabilityMultiplier +
    (ConsistencyHierarchy[a.consistency] ?? 0) * ConsistencyMultiplier +
    (SensationHierarchy[a.sensation] ?? 0) * SensationMultiplier +
    (ColorHierarchy[a.color] ?? 0) * ColorMultiplier;
  const bScore = (MenstruationHierarchy[b.menstruation] ?? 0) * MenstruationMultiplier +
    (AppearanceHierarchy[b.appearance] ?? 0) * AppearanceMultiplier +
    (StretchabilityHierarchy[b.stretchability] ?? 0) * StretchabilityMultiplier +
    (ConsistencyHierarchy[b.consistency] ?? 0) * ConsistencyMultiplier +
    (SensationHierarchy[b.sensation] ?? 0) * SensationMultiplier +
    (ColorHierarchy[b.color] ?? 0) * ColorMultiplier;

  return bScore - aScore;
}

/** Function to compare observations by fertility */
function compareObservations (a: Observation, b: Observation): number {
  if (a.yellowOverride === b.yellowOverride) {
    if ((isMenstruation(a) && isMenstruation(b)) || (!isMenstruation(a) && !isMenstruation(b))) {
      if ((isPeakMucus(a) && isPeakMucus(b)) || (!isPeakMucus(a) && !isPeakMucus(b))) {
        return compareOnDetails(a, b);
      } else if (isPeakMucus(a)) {
        return -1;
      } else if (isPeakMucus(b)) {
        return 1;
      }
    } else if (isMenstruation(a)) {
      return -1;
    } else if (isMenstruation(b)) {
      return 1;
    }
  } else if (a.yellowOverride) {
    return -1;
  } else if (b.yellowOverride) {
    return 1;
  }
  return compareOnDetails(a, b);
}

export default compareObservations;
