import {Accessor, createSignal} from "solid-js";
import {DateTime} from "luxon";
import SensationField, { SensationFieldProps } from "./SensationField";
import ColorField, { ColorFieldProps } from "./ColorField";
import StretchabilityField, { StretchabilityFieldProps } from "./StretchabilityField";
import ConsistencyField, { ConsistencyFieldProps } from "./ConsistencyField";
import DatetimeField from "./DatetimeField";
import NotesField from "./NotesField";
import Submit from "./Submit";
import MenstruationField, { MenstruationFieldProps } from "./MenstruationField";
import abbreviation from "../functions/abbreviation";
import byDay from "../functions/byDay";
import cycleDay from "../functions/cycleDay";
import stamp from "../functions/stamp";
import { Observation } from "./ExistingObservation";
import AppearanceField, { AppearanceFieldProps } from "./AppearanceField";
import YellowOverrideField, { YellowOverrideFieldProps } from "./YellowOverrideField";

export type NewObservationProps = {
  observations: Accessor<Observation[]>;
};

function NewObservation({observations}: NewObservationProps) {
  const [datetime, setDatetime] = createSignal(DateTime.now());
  const [menstruation, setMenstruation] = createSignal<MenstruationFieldProps["menstruation"]>("none");
  const [color, setColor] = createSignal<ColorFieldProps["color"]>("na");
  const [consistency, setConsistency] = createSignal<ConsistencyFieldProps["consistency"]>("na");
  const [appearance, setAppearance] = createSignal<AppearanceFieldProps["appearance"]>("dry");
  const [sensation, setSensation] = createSignal<SensationFieldProps["sensation"]>("dry");
  const [stretchability, setStretchability] = createSignal<StretchabilityFieldProps["stretchability"]>("none");
  const [yellowOverride, setYellowOverride] = createSignal<YellowOverrideFieldProps["yellowOverride"]>(false);

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
      <form onSubmit={async () => {
        try {
          const observation = new Parse.Object("observation");
          observation.set({
            sensation: sensation(),
            color: color(),
            stretchability: stretchability(),
            consistency: consistency(),
            datetime: datetime(),
            menstruation: menstruation(),
            appearance: appearance(),
            yellowOverride: yellowOverride(),
            notes: "",
          });
          await observation.save();
          window.location.reload();
        } catch (e) {
          console.error(e);
        }
      }}>
        <MenstruationField menstruation={menstruation()} setMenstruation={setMenstruation} />
        <SensationField sensation={sensation()} setSensation={setSensation} />
        <AppearanceField appearance={appearance()} setAppearance={setAppearance} />
        <ColorField color={color()} setColor={setColor} />
        <StretchabilityField stretchability={stretchability()} setStretchability={setStretchability} />
        <ConsistencyField consistency={consistency()} setConsistency={setConsistency} />
        <DatetimeField datetime={datetime()} setDatetime={setDatetime} />
        <YellowOverrideField yellowOverride={yellowOverride()} setYellowOverride={setYellowOverride} />
        <NotesField />
        <Submit />
      </form>
    </div>

  );
}

export default NewObservation;
