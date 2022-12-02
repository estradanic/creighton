import { Observation } from "../components/ExistingObservation";

export const isPeakMucus = ({sensation, stretchability, color, menstruation}: Pick<Observation, "sensation" | "stretchability" | "color" | "menstruation">): boolean => {
  return sensation === "lubricative"
    || stretchability === "stretchy"
    || (color === "clear" && stretchability !== "none")
    || isMenstruation({menstruation});
};

export const isFertile = ({sensation, stretchability, color, consistency, menstruation}: Pick<Observation, "sensation" | "stretchability" | "color" | "consistency" | "menstruation">): boolean => {
  return isPeakMucus({sensation, stretchability, color, menstruation})
    || consistency !== "na"
    || stretchability !== "none";
};

export const isMenstruation = ({menstruation}: Pick<Observation, "menstruation">): boolean => {
  return menstruation !== "none";
}
