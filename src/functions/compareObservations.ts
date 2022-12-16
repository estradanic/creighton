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

function compareOnDetails (a: Observation, b: Observation): number {
  const aTotal = (MenstruationHierarchy[a.menstruation] ?? 0) * MenstruationMultiplier +
    (AppearanceHierarchy[a.appearance] ?? 0) * AppearanceMultiplier +
    (StretchabilityHierarchy[a.stretchability] ?? 0) * StretchabilityMultiplier +
    (ConsistencyHierarchy[a.consistency] ?? 0) * ConsistencyMultiplier +
    (SensationHierarchy[a.sensation] ?? 0) * SensationMultiplier +
    (ColorHierarchy[a.color] ?? 0) * ColorMultiplier;
  const bTotal = (MenstruationHierarchy[b.menstruation] ?? 0) * MenstruationMultiplier +
    (AppearanceHierarchy[b.appearance] ?? 0) * AppearanceMultiplier +
    (StretchabilityHierarchy[b.stretchability] ?? 0) * StretchabilityMultiplier +
    (ConsistencyHierarchy[b.consistency] ?? 0) * ConsistencyMultiplier +
    (SensationHierarchy[b.sensation] ?? 0) * SensationMultiplier +
    (ColorHierarchy[b.color] ?? 0) * ColorMultiplier;

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
