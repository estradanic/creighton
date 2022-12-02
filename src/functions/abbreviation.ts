import { Accessor } from "solid-js";
import { Observation } from "../components/ExistingObservation";

const abbreviation = (observation: Accessor<Observation>, observationsByDay: Accessor<Record<string, Observation[]>>) => {
  const {menstruation, color, sensation, stretchability, consistency} = observation();
  let abbreviation = ["", "", "", "", "", "", ""];
  if (menstruation === "very-light") {
    abbreviation[0] = "VL";
  } else if (menstruation === "light") {
    abbreviation[0] = "L";
  } else if (menstruation === "medium") {
    abbreviation[0] = "M";
  } else if (menstruation === "heavy") {
    abbreviation[0] = "H";
  }
  if (color === "red") {
    abbreviation[1] = "R ";
  } else if (color === "brown") {
    abbreviation[1] = "B ";
  } else if (menstruation !== "none") {
    abbreviation[1] = " ";
  }

  if (sensation === "dry" && consistency === "dry") {
    abbreviation[2] = "0";
  }
  if ((sensation === "dry" && (consistency === "damp" || consistency === "wet")) || (sensation === "smooth" && consistency === "dry")) {
    abbreviation[2] = "1";
  }
  if ((consistency === "damp" || consistency === "wet") && sensation === "smooth") {
    abbreviation[2] = "2";
  }
  if (consistency === "shiny") {
    abbreviation[2] = "4";
  }
  if (stretchability === "sticky") {
    abbreviation[2] = "6";
  }
  if (stretchability === "tacky") {
    abbreviation[2] = "8";
  }
  if (stretchability === "stretchy") {
    abbreviation[2] = "10";
  }
  if (consistency === "damp") {
    abbreviation[3] = "D";
  }
  if (consistency === "wet") {
    abbreviation[3] = "W";
  }
  if (consistency === "shiny") {
    abbreviation[3] = "S";
  }
  if (color === "brown") {
    abbreviation[4] = "B";
  }
  if (color === "cloudy-white") {
    abbreviation[4] = "C";
  }
  if (color === "cloudy-clear") {
    abbreviation[4] = "C/K";
  }
  if (color === "clear") {
    abbreviation[4] = "K";
  }
  if (color === "yellow") {
    abbreviation[4] = "Y";
  }
  if (color === "red") {
    abbreviation[4] = "R";
  }
  if (consistency === "gummy") {
    abbreviation[5] = "G";
  }
  if (consistency === "pasty") {
    abbreviation[5] = "P";
  }
  if (sensation === "lubricative") {
    abbreviation[2] = "10";
    abbreviation[6] = "L";
  }
  return abbreviation.join("");
};

export default abbreviation;
