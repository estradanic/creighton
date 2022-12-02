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
import cycleDay from "../functions/cycleDay";
import abbreviation from "../functions/abbreviation";
import byDay from "../functions/byDay";
import stamp from "../functions/stamp";
import { Observation } from "./ExistingObservation";

export type NewObservationProps = {
  id: Accessor<string>;
  observations: Accessor<Observation[]>;
};

function NewObservation({id, observations}: NewObservationProps) {
  const [datetime, setDatetime] = createSignal(DateTime.now());
  const [menstruation, setMenstruation] = createSignal<MenstruationFieldProps["menstruation"]>("none");
  const [color, setColor] = createSignal<ColorFieldProps["color"]>("na");
  const [consistency, setConsistency] = createSignal<ConsistencyFieldProps["consistency"]>("dry");
  const [sensation, setSensation] = createSignal<SensationFieldProps["sensation"]>("dry");
  const [stretchability, setStretchability] = createSignal<StretchabilityFieldProps["stretchability"]>("none");

  const thisObservation = () => {
    return {
      id: id(),
      sensation: sensation(),
      color: color(),
      stretchability: stretchability(),
      consistency: consistency(),
      datetime: datetime().toISO(),
      menstruation: menstruation(),
      notes: "",
    };
  };


  return (
    <div class="observation">
      <h3>New Observation</h3>
      <h3>
        <span class={`stamp ${stamp(thisObservation, () => byDay(observations))}`}>&nbsp;&nbsp;&nbsp;</span>
        {abbreviation(thisObservation, () => byDay(observations))}
        {(!menstruation || !sensation || !color || !stretchability || !consistency) &&
          <span class="incomplete">Incomplete</span>
        }
      </h3>
      <form method="post" action="new-observation">
        <input type="hidden" name="id" value={id()} />
        <MenstruationField menstruation={menstruation()} setMenstruation={setMenstruation} />
        <SensationField sensation={sensation()} setSensation={setSensation} />
        <ColorField color={color()} setColor={setColor} />
        <StretchabilityField stretchability={stretchability()} setStretchability={setStretchability} />
        <ConsistencyField consistency={consistency()} setConsistency={setConsistency} />
        <DatetimeField datetime={datetime()} setDatetime={setDatetime} />
        <NotesField />
        <Submit />
      </form>
    </div>

  );
}

export default NewObservation;
