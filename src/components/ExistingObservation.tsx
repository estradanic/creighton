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
import stamp from "../functions/stamp";
import abbreviation from "../functions/abbreviation";
import cycleDay from "../functions/cycleDay";
import byDay from "../functions/byDay";
import AppearanceField, { AppearanceFieldProps } from "./AppearanceField";

export type Observation = {
  id: string;
  sensation: SensationFieldProps["sensation"];
  color: ColorFieldProps["color"];
  stretchability: StretchabilityFieldProps["stretchability"];
  consistency: ConsistencyFieldProps["consistency"];
  datetime: string;
  notes: NotesFieldProps["notes"];
  menstruation: MenstruationFieldProps["menstruation"];
  appearance: AppearanceFieldProps["appearance"];
}

export type ExistingObservationProps = Observation & {
  observations: Accessor<Observation[]>;
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
  appearance,
  observations,
}: ExistingObservationProps) {
  const [disabled, setDisabled] = createSignal(true);

  const thisObservation = () => {
    return {
      id,
      sensation,
      color,
      stretchability,
      consistency,
      datetime,
      notes,
      menstruation,
      appearance,
    };
  };

  return (
    <div class={`observation ${DateTime.fromISO(datetime).weekdayLong}`}>
      <h3>Cycle Day: {cycleDay(thisObservation, () => byDay(observations))}</h3>
      <h3>{DateTime.fromISO(datetime).toFormat("EEEE MMM dd, yyyy @ t")}</h3>
      <h3>
        <span class={`stamp ${stamp(thisObservation, () => byDay(observations))}`}>&nbsp;&nbsp;&nbsp;</span>
        {abbreviation(thisObservation, () => byDay(observations))}
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
        <AppearanceField disabled={disabled} appearance={appearance} />
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
