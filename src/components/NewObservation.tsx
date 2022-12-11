import Parse from "parse";
import { createMemo, createSignal, JSX, mergeProps, Setter } from "solid-js";
import { DateTime } from "luxon";
import SensationField from "./Fields/SensationField";
import ColorField from "./Fields/ColorField";
import StretchabilityField from "./Fields/StretchabilityField";
import ConsistencyField from "./Fields/ConsistencyField";
import DatetimeField from "./Fields/DatetimeField";
import NotesField from "./Fields/NotesField";
import Submit from "./Fields/Submit";
import MenstruationField from "./Fields/MenstruationField";
import abbreviation from "../functions/abbreviation";
import byDay from "../functions/byDay";
import cycleDay from "../functions/cycleDay";
import stamp from "../functions/stamp";
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

export type NewObservationProps = {
  observations: Observation[]
  setObservations: Setter<Observation[]>
};

function NewObservation (_props: NewObservationProps): JSX.Element {
  const props = mergeProps({ observations: [] }, _props);
  const [datetime, setDatetime] = createSignal(DateTime.now());
  const [menstruation, setMenstruation] = createSignal<Menstruation>("none");
  const [color, setColor] = createSignal<Color>("na");
  const [consistency, setConsistency] = createSignal<Consistency>("na");
  const [appearance, setAppearance] = createSignal<Appearance>("dry");
  const [sensation, setSensation] = createSignal<Sensation>("dry");
  const [stretchability, setStretchability] = createSignal<Stretchability>("none");
  const [yellowOverride, setYellowOverride] = createSignal<boolean>(false);
  const [notes, setNotes] = createSignal<string>("");
  const [id, setId] = createSignal<string>("");
  const [coverage, setCoverage] = createSignal<Coverage>("na");

  const thisObservation = (): Observation => {
    return {
      id: id(),
      sensation: sensation(),
      color: color(),
      stretchability: stretchability(),
      consistency: consistency(),
      datetime: datetime().toISO(),
      menstruation: menstruation(),
      appearance: appearance(),
      yellowOverride: yellowOverride(),
      notes: notes(),
      coverage: coverage(),
    };
  };

  const initialize = (): void => {
    setDatetime(DateTime.now());
    setMenstruation("none");
    setColor("na");
    setStretchability("none");
    setConsistency("na");
    setAppearance("dry");
    setSensation("dry");
    setYellowOverride(false);
    setNotes("");
    setId("");
    setCoverage("na");
  };

  const observationsSet = (prev: Observation[]): Observation[] => [...prev, thisObservation()];

  const save = (savedObservation: Parse.Object): void => {
    setId(savedObservation.id);
    props.setObservations(observationsSet);
    initialize();
  };

  const onSubmit = (e: Event): void => {
    e.preventDefault();
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
      notes: notes(),
      coverage: coverage(),
    });
    observation.save()
      .then(save)
      .catch((e) => {
        alert(e?.message);
        console.error(e);
      });
  };

  const _byDay = createMemo(() => byDay(props.observations));
  const _cycleDay = createMemo(() => cycleDay(thisObservation(), _byDay()));
  const _stamp = createMemo(() => `stamp ${stamp(thisObservation(), _byDay())}`);
  const _abbreviation = createMemo(() => abbreviation(thisObservation()));
  const _submitDisabled = createMemo(() => !datetime().isValid);

  return (
    <div class="observation">
      <h3>New Observation</h3>
      <h4>Cycle Day: {_cycleDay()}</h4>
      <h4>{datetime().toFormat("EEEE MMM dd, yyyy @ t")}</h4>
      <h3>
        <span class={_stamp()}>&nbsp;&nbsp;&nbsp;</span>
        {_abbreviation()}
      </h3>
      <form onSubmit={onSubmit}>
        <MenstruationField menstruation={menstruation()} setMenstruation={setMenstruation} />
        <SensationField sensation={sensation()} setSensation={setSensation} />
        <AppearanceField appearance={appearance()} setAppearance={setAppearance} />
        <ColorField color={color()} setColor={setColor} />
        <StretchabilityField
          stretchability={stretchability()}
          setStretchability={setStretchability}
        />
        <ConsistencyField consistency={consistency()} setConsistency={setConsistency} />
        <DatetimeField datetime={datetime()} setDatetime={setDatetime} />
        <CoverageField coverage={coverage()} setCoverage={setCoverage} />
        <YellowOverrideField
          yellowOverride={yellowOverride()}
          setYellowOverride={setYellowOverride}
        />
        <NotesField notes={notes()} setNotes={setNotes} />
        <Submit disabled={_submitDisabled()} />
      </form>
    </div>

  );
}

export default NewObservation;
