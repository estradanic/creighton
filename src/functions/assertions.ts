import { Observation } from "../components/ExistingObservation";

export const isPeakMucus = ({sensation, stretchability, color, consistency}: Pick<Observation, "sensation" | "stretchability" | "color" | "consistency">): boolean => {
  return sensation === "lubricative"
    || stretchability === "stretchy"
    || (color === "clear" && consistency !== "dry" && sensation !== "dry");
};

export const isFertile = ({sensation, stretchability, color, consistency}: Pick<Observation, "sensation" | "stretchability" | "color" | "consistency">): boolean => {
  return isPeakMucus({sensation, stretchability, color, consistency})
    || (
      sensation === "smooth"
      && stretchability === "tacky"
      && (consistency === "pasty" || consistency === "gummy")
    );
};

export const isMenstruation = ({menstruation}: Pick<Observation, "menstruation">): boolean => {
  return menstruation !== "none";
}
