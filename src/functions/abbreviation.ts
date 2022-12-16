import { Observation } from "../types/ObservationTypes";
import { isPeakMucus } from "./assertions";

/** Function to get the abbreviation for an observation */
const abbreviation = (observation: Observation): string => {
  const { menstruation, color, sensation, stretchability, consistency, appearance } = observation;
  const abbreviation = ["", "", "", "", "", "", ""];
  if (menstruation === "very-light") {
    abbreviation[0] = "VL";
  } else if (menstruation === "light") {
    abbreviation[0] = "L";
  } else if (menstruation === "medium") {
    abbreviation[0] = "M";
  } else if (menstruation === "heavy") {
    abbreviation[0] = "H";
  } else if (menstruation === "very-heavy") {
    abbreviation[0] = "VH";
  } else if (color === "red" || color === "brown") {
    abbreviation[0] = "VL";
  }

  if (color === "red") {
    abbreviation[1] = "R ";
  } else if (color === "brown") {
    abbreviation[1] = "B ";
  } else if (menstruation !== "none") {
    abbreviation[1] = " ";
  }
  if (stretchability === "none") {
    abbreviation[2] = "0";
    if (appearance === "damp") {
      abbreviation[2] = "2";
      abbreviation[3] = "D";
    } else if (appearance === "wet") {
      abbreviation[2] = "2";
      abbreviation[3] = "W";
    } else if (appearance === "shiny") {
      abbreviation[3] = "S";
      abbreviation[2] = "4";
    }
    if (sensation === "lubricative") {
      abbreviation[2] = "10";
    }
  } else if (stretchability === "sticky") {
    abbreviation[2] = "6";
  } else if (stretchability === "tacky") {
    abbreviation[2] = "8";
  } else if (stretchability === "stretchy") {
    abbreviation[2] = "10";
  }
  if (color === "brown") {
    abbreviation[4] = "B";
  } else if (color === "cloudy-white") {
    abbreviation[4] = "C";
  } else if (color === "cloudy-clear") {
    abbreviation[4] = "C/K";
  } else if (color === "clear") {
    abbreviation[4] = "K";
  } else if (color === "yellow") {
    abbreviation[4] = "Y";
  } else if (color === "red") {
    abbreviation[4] = "R";
  }
  if (consistency === "gummy") {
    abbreviation[5] = "G";
  } else if (consistency === "pasty") {
    abbreviation[5] = "P";
  }
  if (sensation === "lubricative") {
    abbreviation[6] = "L";
  }
  return abbreviation.join("");
};

export default abbreviation;
