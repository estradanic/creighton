import Parse from "parse";
import { createMemo, createSignal, JSX, onMount, Setter } from "solid-js";
import { DateTime } from "luxon";
import ColorField from "./Fields/ColorField";
import DatetimeField from "./Fields/DatetimeField";
import SensationField from "./Fields/SensationField";
import NotesField from "./Fields/NotesField";
import StretchabilityField from "./Fields/StretchabilityField";
import Submit from "./Fields/Submit";
import ConsistencyField from "./Fields/ConsistencyField";
import MenstruationField from "./Fields/MenstruationField";
import stamp from "../functions/stamp";
import abbreviation from "../functions/abbreviation";
import cycleDay from "../functions/cycleDay";
import byDay from "../functions/byDay";
import AppearanceField from "./Fields/AppearanceField";
import YellowOverrideField from "./Fields/YellowOverrideField";
import {
  Appearance,
  Color,
  Consistency,
  Coverage,
  Menstruation,
  Observation,
  Sensation,
  Stretchability,
} from "../types/ObservationTypes";
import CoverageField from "./Fields/CoverageField";
import PmsField from "./Fields/PmsField";
import TemperatureField from "./Fields/TemperatureField";

export type ExistingObservationProps = Observation & {
  observations: Observation[]
  setObservations: Setter<Observation[]>
};

function ExistingObservation (props: ExistingObservationProps): JSX.Element {
  const [disabled, setDisabled] = createSignal(true);
  const [datetime, setDatetime] = createSignal(DateTime.now());
  const [menstruation, setMenstruation] = createSignal<Menstruation>("none");
  const [color, setColor] = createSignal<Color>("na");
  const [consistency, setConsistency] = createSignal<Consistency>("na");
  const [appearance, setAppearance] = createSignal<Appearance>("dry");
  const [sensation, setSensation] = createSignal<Sensation>("dry");
  const [stretchability, setStretchability] = createSignal<Stretchability>("none");
  const [yellowOverride, setYellowOverride] = createSignal<boolean>(false);
  const [coverage, setCoverage] = createSignal<Coverage>("na");
  const [pms, setPms] = createSignal<boolean>(false);
  const [notes, setNotes] = createSignal<string>("");
  const [temperature, setTemperature] = createSignal<number | undefined>(undefined);

  const initialize = (): void => {
    setDatetime(DateTime.fromISO(props.datetime));
    setMenstruation(props.menstruation);
    setColor(props.color);
    setConsistency(props.consistency);
    setAppearance(props.appearance);
    setSensation(props.sensation);
    setStretchability(props.stretchability);
    setYellowOverride(props.yellowOverride);
    setNotes(props.notes);
    setCoverage(props.coverage);
    setPms(props.pms);
    setTemperature(props.temperature);
  };

  onMount(initialize);

  const thisObservation = (): Observation => {
    return {
      id: props.id,
      sensation: sensation(),
      color: color(),
      stretchability: stretchability(),
      consistency: consistency(),
      datetime: datetime().toISO(),
      notes: notes(),
      menstruation: menstruation(),
      appearance: appearance(),
      yellowOverride: yellowOverride(),
      coverage: coverage(),
      pms: pms(),
      temperature: temperature(),
    };
  };

  const observationsSet = (prev: Observation[]): Observation[] =>
    [...prev.filter((o) => o.id !== props.id), thisObservation()];

  const save = async (observation: Parse.Object): Promise<void> => {
    await observation.save({
      sensation: sensation(),
      color: color(),
      stretchability: stretchability(),
      consistency: consistency(),
      datetime: datetime().toISO(),
      notes: notes(),
      menstruation: menstruation(),
      appearance: appearance(),
      yellowOverride: yellowOverride(),
      coverage: coverage(),
      pms: pms(),
      temperature: temperature(),
    });
    props.setObservations(observationsSet);
  };

  const onEditSubmit = (e: Event): void => {
    e.preventDefault();
    setDisabled(true);
    new Parse.Query("observation").get(props.id)
      .then(save)
      .catch((e) => {
        console.error(e);
        alert(e?.message);
        setDisabled(false);
      });
  };

  const destroy = async (observation: Parse.Object): Promise<void> => {
    await observation.destroy();
    props.setObservations((prev) => [...prev.filter((o) => o.id !== props.id)]);
  };

  const onDeleteSubmit = (e: Event): void => {
    e.preventDefault();
    setDisabled(true);
    new Parse.Query("observation").get(props.id)
      .then(destroy)
      .catch((e) => {
        alert(e?.message);
        console.error(e);
        setDisabled(false);
      });
  };

  const _byDay = createMemo(() => byDay(props.observations));
  const _cycleDay = createMemo(() => cycleDay(thisObservation(), _byDay()));
  const _stamp = createMemo(() => `stamp ${stamp(thisObservation(), _byDay())}`);
  const _abbreviation = createMemo(() => abbreviation(thisObservation()));

  return (
    <div class={`observation ${datetime().weekdayLong}`}>
      <h3>Cycle Day: {_cycleDay()}</h3>
      <h3>{datetime().toFormat("EEEE MMM dd, yyyy @ t")}</h3>
      <h3>
        <span class={_stamp()}>&nbsp;&nbsp;&nbsp;</span>
        {_abbreviation()}
        {(!menstruation() || !sensation() || !color() || !stretchability() || !consistency()) &&
          <span class="incomplete">Incomplete</span>
        }
      </h3>
      <div class="edit-cancel">
        <input type="button" disabled={!disabled()} onClick={() => setDisabled(false)} value="Edit" />
        <input
          type="button"
          disabled={disabled()}
          onClick={() => {
            setDisabled(true);
            initialize();
          }}
          value="Cancel"
        />
      </div>
      <form onSubmit={onEditSubmit}>
        <MenstruationField disabled={disabled()} menstruation={menstruation()} setMenstruation={setMenstruation} />
        <SensationField disabled={disabled()} sensation={sensation()} setSensation={setSensation} />
        <AppearanceField disabled={disabled()} appearance={appearance()} setAppearance={setAppearance} />
        <ColorField disabled={disabled()} color={color()} setColor={setColor} />
        <StretchabilityField
          disabled={disabled()}
          stretchability={stretchability()}
          setStretchability={setStretchability}
        />
        <ConsistencyField disabled={disabled()} consistency={consistency()} setConsistency={setConsistency} />
        <DatetimeField disabled={disabled()} datetime={datetime()} setDatetime={setDatetime} />
        <CoverageField disabled={disabled()} coverage={coverage()} setCoverage={setCoverage} />
        <YellowOverrideField
          disabled={disabled()}
          yellowOverride={yellowOverride()}
          setYellowOverride={setYellowOverride}
        />
        <PmsField disabled={disabled()} pms={pms()} setPms={setPms} />
        <TemperatureField disabled={disabled()} temperature={temperature()} setTemperature={setTemperature} />
        <NotesField disabled={disabled()} notes={notes()} setNotes={setNotes} />
        <Submit disabled={disabled()} />
      </form>
      <form onSubmit={onDeleteSubmit}>
        <label for="delete" />
        <input type="submit" value="Delete" class="delete" disabled={disabled()} />
      </form>
    </div>
  );
}

export default ExistingObservation;
