import {
  Observation,
  AppearanceHierarchy,
  StretchabilityHierarchy,
  ConsistencyHierarchy,
  SensationHierarchy,
  ColorHierarchy,
  MenstruationHierarchy,
} from '../types/ObservationTypes';
import { isMenstruation, isPeakMucus } from "./assertions";

function compareOnDetails(a: Observation, b: Observation): number {
  const aTotal = MenstruationHierarchy[a.menstruation]
    + AppearanceHierarchy[a.appearance]
    + StretchabilityHierarchy[a.stretchability]
    + ConsistencyHierarchy[a.consistency]
    + SensationHierarchy[a.sensation]
    + ColorHierarchy[a.color];
  const bTotal = MenstruationHierarchy[b.menstruation]
    + AppearanceHierarchy[b.appearance]
    + StretchabilityHierarchy[b.stretchability]
    + ConsistencyHierarchy[b.consistency]
    + SensationHierarchy[b.sensation]
    + ColorHierarchy[b.color];

  return bTotal - aTotal;
}

function compareObservations(a: Observation, b: Observation): number {
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
}

export default compareObservations;
