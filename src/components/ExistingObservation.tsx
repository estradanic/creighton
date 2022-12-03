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
import YellowOverrideField, { YellowOverrideFieldProps } from "./YellowOverrideField";

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
  yellowOverride: YellowOverrideFieldProps["yellowOverride"];
}

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
  const [menstruation, setMenstruation] = createSignal<MenstruationFieldProps["menstruation"]>(initialMenstruation);
  const [color, setColor] = createSignal<ColorFieldProps["color"]>(initialColor);
  const [consistency, setConsistency] = createSignal<ConsistencyFieldProps["consistency"]>(initialConsistency);
  const [appearance, setAppearance] = createSignal<AppearanceFieldProps["appearance"]>(initialAppearance);
  const [sensation, setSensation] = createSignal<SensationFieldProps["sensation"]>(initialSensation);
  const [stretchability, setStretchability] = createSignal<StretchabilityFieldProps["stretchability"]>(initialStretchability);
  const [yellowOverride, setYellowOverride] = createSignal<YellowOverrideFieldProps["yellowOverride"]>(initialYellowOverride);

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
      <form method="post" action="existing-observation">
        <input type="hidden" name="id" value={id} />
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
      <form method="post" action="delete-observation">
        <input type="hidden" name="id" value={id} />
        <label for="delete"></label>
        <input type="submit" value="Delete" class="delete" disabled={disabled()} />
      </form>
    </div>
  );
}

export default ExistingObservation;
