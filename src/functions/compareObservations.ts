import {
  Observation,
  AppearanceHierarchy,
  StretchabilityHierarchy,
  ConsistencyHierarchy,
  SensationHierarchy,
  ColorHierarchy,
  MenstruationHierarchy,
  CoverageHierarchy,
} from "../types/ObservationTypes";
import { isMenstruation, isPeakMucus } from "./assertions";

function compareOnDetails (a: Observation, b: Observation): number {
  const aTotal = (MenstruationHierarchy[a.menstruation] ?? 0) +
    (AppearanceHierarchy[a.appearance] ?? 0) +
    (StretchabilityHierarchy[a.stretchability] ?? 0) +
    (ConsistencyHierarchy[a.consistency] ?? 0) +
    (SensationHierarchy[a.sensation] ?? 0) +
    (ColorHierarchy[a.color] ?? 0) +
    (CoverageHierarchy[a.coverage] ?? 0);
  const bTotal = (MenstruationHierarchy[b.menstruation] ?? 0) +
    (AppearanceHierarchy[b.appearance] ?? 0) +
    (StretchabilityHierarchy[b.stretchability] ?? 0) +
    (ConsistencyHierarchy[b.consistency] ?? 0) +
    (SensationHierarchy[b.sensation] ?? 0) +
    (ColorHierarchy[b.color] ?? 0) +
    (CoverageHierarchy[b.coverage] ?? 0);

  return bTotal - aTotal;
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
