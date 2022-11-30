import {Accessor, createSignal} from "solid-js";
import {DateTime} from "luxon";
import FeelingField from "./FeelingField";
import ColorField from "./ColorField";
import StickinessField from "./StickinessField";
import ViscosityField from "./ViscosityField";
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
        <FeelingField />
        <ColorField />
        <StickinessField />
        <ViscosityField />
        <DatetimeField datetime={datetime()} setDatetime={setDatetime} />
        <NotesField />
        <Submit />
      </form>
    </div>

  );
}

export default NewObservation;
