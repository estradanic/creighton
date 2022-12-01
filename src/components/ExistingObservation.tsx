import {Accessor, createMemo, createSignal} from "solid-js";
import {DateTime} from "luxon";
import ColorField, { ColorFieldProps } from "./ColorField";
import DatetimeField from "./DatetimeField";
import SensationField, { SensationFieldProps } from "./SensationField";
import NotesField, { NotesFieldProps } from "./NotesField";
import StretchabilityField, { StretchabilityFieldProps } from "./StretchabilityField";
import Submit from "./Submit";
import ConsistencyField, { ConsistencyFieldProps } from "./ConsistencyField";
import MenstruationField, { MenstruationFieldProps } from "./MenstruationField";

export type Observation = {
  id: string;
  sensation: SensationFieldProps["sensation"];
  color: ColorFieldProps["color"];
  stretchability: StretchabilityFieldProps["stretchability"];
  consistency: ConsistencyFieldProps["consistency"];
  datetime: string;
  notes: NotesFieldProps["notes"];
  menstruation: MenstruationFieldProps["menstruation"];
}

export type ExistingObservationProps = Observation & {
  observations: Accessor<Observation[]>;
}

const isPeakMucus = ({sensation, stretchability, color, consistency}: Pick<Observation, "sensation" | "stretchability" | "color" | "consistency">): boolean => {
  return sensation === "lubricative"
    || stretchability === "stretchy"
    || (color === "clear" && consistency !== "dry" && sensation !== "dry");
};

const isFertile = ({sensation, stretchability, color, consistency}: Pick<Observation, "sensation" | "stretchability" | "color" | "consistency">): boolean => {
  return isPeakMucus({sensation, stretchability, color, consistency})
    || (
      sensation === "smooth"
      && stretchability === "tacky"
      && (consistency === "pasty" || consistency === "gummy")
    );
};

const isMenstruation = ({menstruation}: Pick<Observation, "menstruation">): boolean => {
  return menstruation !== "none";
}

function ExistingObservation({
  id,
  sensation,
  color,
  stretchability,
  consistency,
  datetime,
  notes,
  menstruation,
  observations,
}: ExistingObservationProps) {
  const [disabled, setDisabled] = createSignal(true);
  const observationsByDay = createMemo(() => {
    const observationsByDay: Record<string, Observation[]> = {};
    for (const observation of observations()) {
      const day = DateTime.fromISO(observation.datetime).toISODate();
      if (!observationsByDay[day]) {
        observationsByDay[day] = [];
      }
      observationsByDay[day].push(observation);
    }
    for (const day of Object.keys(observationsByDay)) {
      const nextDay = DateTime.fromISO(day).plus({days: 1}).toISODate();
      if (!observationsByDay[nextDay]) {
        observationsByDay[nextDay] = [];
      }
    }
    return observationsByDay;
  });
  const abbreviation = createMemo(() => {
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
      abbreviation[6] = "L";
    }
    return abbreviation.join("");
  });
  const stamp = createMemo(() => {
    const dateTime = DateTime.fromISO(datetime);
    const dayBefore = dateTime.minus({days: 1}).toISODate();
    const secondDayBefore = dateTime.minus({days: 2}).toISODate();
    const thirdDayBefore = dateTime.minus({days: 3}).toISODate();
    if (isMenstruation({menstruation})) {
      return "red";
    }
    if (isFertile({sensation, stretchability, color, consistency})) {
      return "white";
    }
    for (const observation of observationsByDay()[dayBefore] ?? []) {
      if (isFertile(observation)) {
        return "green-baby";
      }
    }
    for (const observation of observationsByDay()[secondDayBefore] ?? []) {
      if (isFertile(observation)) {
        return "green-baby";
      }
    }
    for (const observation of observationsByDay()[thirdDayBefore] ?? []) {
      if (isFertile(observation)) {
        return "green-baby";
      }
    }
    return "green";
  });

  return (
    <div class={`observation ${DateTime.fromISO(datetime).weekdayLong}`}>
      <h3>{DateTime.fromISO(datetime).toFormat("EEEE MMM dd, yyyy @ t")}</h3>
      <h3>
        <span class={`stamp ${stamp()}`}>&nbsp;&nbsp;&nbsp;</span>
        {abbreviation()}
        {(!menstruation || !sensation || !color || !stretchability || !consistency) &&
          <span class="incomplete">Incomplete</span>
        }
      </h3>
      <div class="edit-cancel">
        <input type="button" disabled={!disabled()} onClick={() => setDisabled(false)} value="Edit" />
        <input type="button" disabled={disabled()} onClick={() => setDisabled(true)} value="Cancel" />
      </div>
      <form method="post" action="existing-observation">
        <input type="hidden" name="id" value={id} />
        <MenstruationField disabled={disabled} menstruation={menstruation} />
        <SensationField disabled={disabled} sensation={sensation} />
        <ColorField disabled={disabled} color={color} />
        <StretchabilityField disabled={disabled} stretchability={stretchability} />
        <ConsistencyField disabled={disabled} consistency={consistency} />
        <DatetimeField disabled={disabled} datetime={DateTime.fromISO(datetime)} setDatetime={() => console.log("uh oh")} />
        <NotesField disabled={disabled} notes={notes} />
        <Submit disabled={disabled} />
      </form>
      <form method="post" action="delete-observation">
        <input type="hidden" name="id" value={id} />
        <label for="delete"></label>
        <input type="submit" value="Delete" class="delete" disabled={disabled()} />
      </form>
    </div>
  );
}

export default ExistingObservation;
