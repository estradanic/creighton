import Parse from "parse";
import { createMemo, createSignal, JSX } from "solid-js";
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
import PmsField from "./Fields/PmsField";
import TemperatureField from "./Fields/TemperatureField";
import { observations, setObservations } from "../stores/ObservationsStore";
import throwError from "../functions/throwError";

function NewObservation (): JSX.Element {
  const [oldObservations, setOldObservations] = createSignal<Observation[]>(observations());

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
  const [pms, setPms] = createSignal<boolean>(false);
  const [coverage, setCoverage] = createSignal<Coverage>("na");
  const [temperature, setTemperature] = createSignal<number | undefined>(undefined);
  const [disabled, setDisabled] = createSignal<boolean>(false);

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
      pms: pms(),
      temperature: temperature(),
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
    setPms(false);
    setTemperature(undefined);
  };

  const save = (savedObservation: Parse.Object): void => {
    setId(savedObservation.id);
    const _thisObservation = thisObservation();
    setObservations((prev) => [
      ...prev.filter((o) => !!o.id),
      _thisObservation,
    ].sort((a, b) => b.datetime.localeCompare(a.datetime)));
    initialize();
    setOldObservations(observations());
  };

  const onSubmit = (e: Event): void => {
    e.preventDefault();
    setDisabled(true);
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
      pms: pms(),
      temperature: temperature(),
    });
    const _thisObservation = thisObservation();
    const _oldObservations = oldObservations();
    setObservations((prev) => [...prev, _thisObservation].sort((a, b) => b.datetime.localeCompare(a.datetime)));
    observation.save()
      .then(save)
      .catch((e) => {
        setObservations(_oldObservations);
        throwError(e);
      })
      .finally(() => setDisabled(false));
  };

  const _byDay = createMemo(() => byDay(observations()));
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
        <MenstruationField menstruation={menstruation()} setMenstruation={setMenstruation} disabled={disabled()} />
        <SensationField sensation={sensation()} setSensation={setSensation} disabled={disabled()} />
        <AppearanceField appearance={appearance()} setAppearance={setAppearance} disabled={disabled()} />
        <ColorField color={color()} setColor={setColor} disabled={disabled()} />
        <StretchabilityField
          stretchability={stretchability()}
          setStretchability={setStretchability}
          disabled={disabled()}
        />
        <ConsistencyField consistency={consistency()} setConsistency={setConsistency} disabled={disabled()} />
        <DatetimeField datetime={datetime()} setDatetime={setDatetime} disabled={disabled()} />
        <CoverageField coverage={coverage()} setCoverage={setCoverage} disabled={disabled()} />
        <YellowOverrideField
          yellowOverride={yellowOverride()}
          setYellowOverride={setYellowOverride}
          disabled={disabled()}
        />
        <PmsField pms={pms()} setPms={setPms} disabled={disabled()} />
        <TemperatureField temperature={temperature()} setTemperature={setTemperature} disabled={disabled()} />
        <NotesField notes={notes()} setNotes={setNotes} disabled={disabled()} />
        <Submit disabled={_submitDisabled() || disabled()} />
      </form>
    </div>

  );
}

export default NewObservation;
