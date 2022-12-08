import Parse from "parse";
import {Accessor, createEffect, createSignal} from "solid-js";
import {DateTime} from "luxon";
import SensationField from "./SensationField";
import ColorField from "./ColorField";
import StretchabilityField from "./StretchabilityField";
import ConsistencyField from "./ConsistencyField";
import DatetimeField from "./DatetimeField";
import NotesField from "./NotesField";
import Submit from "./Submit";
import MenstruationField from "./MenstruationField";
import abbreviation from "../functions/abbreviation";
import byDay from "../functions/byDay";
import cycleDay from "../functions/cycleDay";
import stamp from "../functions/stamp";
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

export type NewObservationProps = {
  observations: Accessor<Observation[]>;
  loading: Accessor<boolean>;
};

function NewObservation({observations, loading}: NewObservationProps) {
  const [datetime, setDatetime] = createSignal(DateTime.now());
  const [menstruation, setMenstruation] = createSignal<Menstruation>("none");
  const [color, setColor] = createSignal<Color>("na");
  const [consistency, setConsistency] = createSignal<Consistency>("na");
  const [appearance, setAppearance] = createSignal<Appearance>("dry");
  const [sensation, setSensation] = createSignal<Sensation>("dry");
  const [stretchability, setStretchability] = createSignal<Stretchability>("none");
  const [yellowOverride, setYellowOverride] = createSignal<boolean>(false);
  const [disabled, setDisabled] = createSignal<boolean>(true);

  createEffect(() => {
    if (loading()) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  });

  const thisObservation = () => {
    return {
      id: "",
      sensation: sensation(),
      color: color(),
      stretchability: stretchability(),
      consistency: consistency(),
      datetime: datetime().toISO(),
      menstruation: menstruation(),
      appearance: appearance(),
      yellowOverride: yellowOverride(),
      notes: "",
    };
  };


  return (
    <div class="observation">
      <h3>New Observation</h3>
      <h4>Cycle Day: {cycleDay(thisObservation, () => byDay(observations))}</h4>
      <h4>{datetime().toFormat("EEEE MMM dd, yyyy @ t")}</h4>
      <h3>
        <span class={`stamp ${stamp(thisObservation, () => byDay(observations))}`}>&nbsp;&nbsp;&nbsp;</span>
        {abbreviation(thisObservation, () => byDay(observations))}
        {(!menstruation() || !sensation() || !color() || !stretchability() || !consistency()) &&
          <span class="incomplete">Incomplete</span>
        }
      </h3>
      <form onSubmit={async (e) => {
        e.preventDefault();
        setDisabled(true);
        try {
          const observation = new Parse.Object("observation");
          observation.set({
            sensation: sensation(),
            color: color(),
            stretchability: stretchability(),
            consistency: consistency(),
            datetime: datetime().toISO(),
            menstruation: menstruation(),
            appearance: appearance(),
            yellowOverride: yellowOverride(),
            notes: "",
          });
          await observation.save();
          window.location.reload();
        } catch (e) {
          alert(e?.message);
          console.error(e);
          setDisabled(false);
        }
      }}>
        <MenstruationField menstruation={menstruation()} setMenstruation={setMenstruation} disabled={disabled} />
        <SensationField sensation={sensation()} setSensation={setSensation} disabled={disabled} />
        <AppearanceField appearance={appearance()} setAppearance={setAppearance} disabled={disabled} />
        <ColorField color={color()} setColor={setColor} disabled={disabled} />
        <StretchabilityField stretchability={stretchability()} setStretchability={setStretchability} disabled={disabled} />
        <ConsistencyField consistency={consistency()} setConsistency={setConsistency} disabled={disabled} />
        <DatetimeField datetime={datetime()} setDatetime={setDatetime} disabled={disabled} />
        <YellowOverrideField yellowOverride={yellowOverride()} setYellowOverride={setYellowOverride} disabled={disabled} />
        <NotesField disabled={disabled} />
        <Submit disabled={disabled} />
      </form>
    </div>

  );
}

export default NewObservation;
