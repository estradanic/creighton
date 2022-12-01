import {Accessor, createSignal} from "solid-js";
import {DateTime} from "luxon";
import SensationField from "./SensationField";
import ColorField from "./ColorField";
import StretchabilityField from "./StretchabilityField";
import ConsistencyField from "./ConsistencyField";
import DatetimeField from "./DatetimeField";
import NotesField from "./NotesField";
import Submit from "./Submit";
import MenstruationField from "./MenstruationField";

export type NewObservationProps = {
  id: Accessor<string>;
};

function NewObservation({id}: NewObservationProps) {
  const [datetime, setDatetime] = createSignal(DateTime.now());

  return (
    <div class="observation">
      <h3>New Observation</h3>
      <form method="post" action="new-observation">
        <input type="hidden" name="id" value={id()} />
        <MenstruationField />
        <SensationField />
        <ColorField />
        <StretchabilityField />
        <ConsistencyField />
        <DatetimeField datetime={datetime()} setDatetime={setDatetime} />
        <NotesField />
        <Submit />
      </form>
    </div>

  );
}

export default NewObservation;
