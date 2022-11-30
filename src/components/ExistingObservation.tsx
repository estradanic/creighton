import {Accessor, createMemo, createSignal} from "solid-js";
import {DateTime} from "luxon";
import ColorField, { ColorFieldProps } from "./ColorField";
import DatetimeField from "./DatetimeField";
import FeelingField, { FeelingFieldProps } from "./FeelingField";
import NotesField, { NotesFieldProps } from "./NotesField";
import StickinessField, { StickinessFieldProps } from "./StickinessField";
import Submit from "./Submit";
import ViscosityField, { ViscosityFieldProps } from "./ViscosityField";
import MenstruationField, { MenstruationFieldProps } from "./MenstruationField";

export type Observation = {
  id: string;
  feeling: FeelingFieldProps["feeling"];
  color: ColorFieldProps["color"];
  stickiness: StickinessFieldProps["stickiness"];
  viscosity: ViscosityFieldProps["viscosity"];
  datetime: string;
  notes: NotesFieldProps["notes"];
  menstruation: MenstruationFieldProps["menstruation"];
}

export type ExistingObservationProps = Observation & {
  observations: Accessor<Observation[]>;
  index: Accessor<number>;
}

const isPeakMucus = ({feeling, stickiness}: Pick<Observation, "feeling" | "stickiness">): boolean => {
  return feeling === "lubricative" || stickiness === "sticky" || stickiness === "tacky";
};

const isMenstruation = ({menstruation}: Pick<Observation, "menstruation">): boolean => {
  return menstruation !== "none";
}

function ExistingObservation({
  id,
  feeling,
  color,
  stickiness,
  viscosity,
  datetime,
  notes,
  menstruation,
  observations,
  index,
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
    return "TBD";
  });
  const stamp = createMemo(() => {
    const dateTime = DateTime.fromISO(datetime);
    const day = dateTime.toISODate();
    const dayBefore = dateTime.minus({days: 1}).toISODate();
    const secondDayBefore = dateTime.minus({days: 2}).toISODate();
    const thirdDayBefore = dateTime.minus({days: 3}).toISODate();
    if (isMenstruation({menstruation})) {
      return "red";
    }
    for (const observation of observationsByDay()[day]) {
      if (isMenstruation(observation)) {
        return "red";
      }
    }
    if (isPeakMucus({feeling, stickiness})) {
      return "white";
    }
    for (const observation of observationsByDay()[day]) {
      if (isPeakMucus(observation)) {
        return "white";
      }
    }
    for (const observation of observationsByDay()[dayBefore] ?? []) {
      if (isPeakMucus(observation)) {
        return "green-baby";
      }
    }
    for (const observation of observationsByDay()[secondDayBefore] ?? []) {
      if (isPeakMucus(observation)) {
        return "green-baby";
      }
    }
    for (const observation of observationsByDay()[thirdDayBefore] ?? []) {
      if (isPeakMucus(observation)) {
        return "green-baby";
      }
    }
    return "green";
  });

  return (
    <div class={`observation ${DateTime.fromISO(datetime).weekdayLong}`}>
      <h3>{DateTime.fromISO(datetime).toFormat("EEEE MMM dd, yyyy @ t")}</h3>
      <h3><span class={`stamp ${stamp()}`}>&nbsp;&nbsp;&nbsp;</span>{abbreviation()}</h3>
      <div class="edit-cancel">
        <input type="button" disabled={!disabled()} onClick={() => setDisabled(false)} value="Edit" />
        <input type="button" disabled={disabled()} onClick={() => setDisabled(true)} value="Cancel" />
      </div>
      <form method="post" action="existing-observation">
        <input type="hidden" name="id" value={id} />
        <MenstruationField disabled={disabled} menstruation={menstruation} />
        <FeelingField disabled={disabled} feeling={feeling} />
        <ColorField disabled={disabled} color={color} />
        <StickinessField disabled={disabled} stickiness={stickiness} />
        <ViscosityField disabled={disabled} viscosity={viscosity} />
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
