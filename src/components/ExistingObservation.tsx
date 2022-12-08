import Parse from "parse";
import {Accessor, createSignal} from "solid-js";
import {DateTime} from "luxon";
import ColorField from "./ColorField";
import DatetimeField from "./DatetimeField";
import SensationField from "./SensationField";
import NotesField from "./NotesField";
import StretchabilityField from "./StretchabilityField";
import Submit from "./Submit";
import ConsistencyField from "./ConsistencyField";
import MenstruationField from "./MenstruationField";
import stamp from "../functions/stamp";
import abbreviation from "../functions/abbreviation";
import cycleDay from "../functions/cycleDay";
import byDay from "../functions/byDay";
import AppearanceField from "./AppearanceField";
import YellowOverrideField from "./YellowOverrideField";
import {
  Appearance,
  Color,
  Consistency,
  Menstruation,
  Observation,
  Sensation,
  Stretchability
} from '../types/ObservationTypes';

export type ExistingObservationProps = Observation & {
  observations: Accessor<Observation[]>;
}

function ExistingObservation({
  id,
  sensation: initialSensation,
  color: initialColor,
  stretchability: initialStretchability,
  consistency: initialConsistency,
  datetime: initialDatetime,
  notes,
  menstruation: initialMenstruation,
  appearance: initialAppearance,
  yellowOverride: initialYellowOverride,
  observations,
}: ExistingObservationProps) {
  const [disabled, setDisabled] = createSignal(true);
  const [datetime, setDatetime] = createSignal(DateTime.fromISO(initialDatetime));
  const [menstruation, setMenstruation] = createSignal<Menstruation>(initialMenstruation);
  const [color, setColor] = createSignal<Color>(initialColor);
  const [consistency, setConsistency] = createSignal<Consistency>(initialConsistency);
  const [appearance, setAppearance] = createSignal<Appearance>(initialAppearance);
  const [sensation, setSensation] = createSignal<Sensation>(initialSensation);
  const [stretchability, setStretchability] = createSignal<Stretchability>(initialStretchability);
  const [yellowOverride, setYellowOverride] = createSignal<boolean>(initialYellowOverride);

  const thisObservation = () => {
    return {
      id,
      sensation: sensation(),
      color: color(),
      stretchability: stretchability(),
      consistency: consistency(),
      datetime: datetime().toISO(),
      notes,
      menstruation: menstruation(),
      appearance: appearance(),
      yellowOverride: yellowOverride(),
    };
  };

  return (
    <div class={`observation ${datetime().weekdayLong}`}>
      <h3>Cycle Day: {cycleDay(thisObservation, () => byDay(observations))}</h3>
      <h3>{datetime().toFormat("EEEE MMM dd, yyyy @ t")}</h3>
      <h3>
        <span class={`stamp ${stamp(thisObservation, () => byDay(observations))}`}>&nbsp;&nbsp;&nbsp;</span>
        {abbreviation(thisObservation, () => byDay(observations))}
        {(!menstruation() || !sensation() || !color() || !stretchability() || !consistency()) &&
          <span class="incomplete">Incomplete</span>
        }
      </h3>
      <div class="edit-cancel">
        <input type="button" disabled={!disabled()} onClick={() => setDisabled(false)} value="Edit" />
        <input type="button" disabled={disabled()} onClick={() => setDisabled(true)} value="Cancel" />
      </div>
      <form onSubmit={async (e) => {
        e.preventDefault();
        try {
          setDisabled(true);
          await (await new Parse.Query("observation").get(id)).save({
            sensation: sensation(),
            color: color(),
            stretchability: stretchability(),
            consistency: consistency(),
            datetime: datetime().toISO(),
            notes: notes,
            menstruation: menstruation(),
            appearance: appearance(),
            yellowOverride: yellowOverride(),
          });
        } catch (e) {
          console.error(e);
          alert(e?.message);
          setDisabled(false);
        }
      }}>
        <MenstruationField disabled={disabled} menstruation={menstruation()} setMenstruation={setMenstruation} />
        <SensationField disabled={disabled} sensation={sensation()} setSensation={setSensation} />
        <AppearanceField disabled={disabled} appearance={appearance()} setAppearance={setAppearance} />
        <ColorField disabled={disabled} color={color()} setColor={setColor} />
        <StretchabilityField disabled={disabled} stretchability={stretchability()} setStretchability={setStretchability} />
        <ConsistencyField disabled={disabled} consistency={consistency()} setConsistency={setConsistency} />
        <DatetimeField disabled={disabled} datetime={datetime()} setDatetime={setDatetime} />
        <YellowOverrideField disabled={disabled} yellowOverride={yellowOverride()} setYellowOverride={setYellowOverride} />
        <NotesField disabled={disabled} notes={notes} />
        <Submit disabled={disabled} />
      </form>
      <form onSubmit={async (e) => {
        e.preventDefault();
        try {
          setDisabled(true);
          await (await new Parse.Query("observation").get(id)).destroy();
          window.location.reload();
        } catch (e) {
          alert(e?.message);
          console.error(e);
          setDisabled(false);
        }
      }}>
        <label for="delete"></label>
        <input type="submit" value="Delete" class="delete" disabled={disabled()} />
      </form>
    </div>
  );
}

export default ExistingObservation;
