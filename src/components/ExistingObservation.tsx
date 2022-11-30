import {createSignal} from "solid-js";
import {DateTime} from "luxon";
import ColorField from "./ColorField";
import DatetimeField from "./DatetimeField";
import FeelingField from "./FeelingField";
import NotesField from "./NotesField";
import StickinessField from "./StickinessField";
import Submit from "./Submit";
import ViscosityField from "./ViscosityField";

export type ExistingObservationProps = {
  id: string;
  feeling: "dry" | "smooth" | "lubricative";
  color: "clear" | "white" | "yellow" | "green" | "brown" | "red" | "pink";
  stickiness: "none" | "low" | "tacky" | "sticky";
  viscosity: "watery" | "thin" | "medium" | "thick";
  datetime: string;
  notes: string;
}

function ExistingObservation({
  id,
  feeling,
  color,
  stickiness,
  viscosity,
  datetime,
  notes,
}: ExistingObservationProps) {
  const [disabled, setDisabled] = createSignal(true);

  return (
    <div class="observation">
      <h3>{DateTime.fromISO(datetime).toFormat("EEEE MMM dd, yyyy @ t")}</h3>
      <div style={{
        "display": "grid",
        "grid-template-columns": "1fr 1fr",
      }}>
        <input class="new" type="button" disabled={!disabled()} onClick={() => setDisabled(false)} value="Edit" />
        <input type="button" disabled={disabled()} onClick={() => setDisabled(true)} value="Cancel" />
      </div>
      <form method="post" action="existing-observation">
        <input type="hidden" name="id" value={id} />
        <FeelingField disabled={disabled} feeling={feeling} />
        <ColorField disabled={disabled} color={color} />
        <StickinessField disabled={disabled} stickiness={stickiness} />
        <ViscosityField disabled={disabled} viscosity={viscosity} />
        <DatetimeField disabled={disabled} datetime={DateTime.fromISO(datetime)} setDatetime={() => console.log("uh oh")} />
        <NotesField disabled={disabled} notes={notes} />
        <Submit disabled={disabled} />
      </form>
    </div>
  );
}

export default ExistingObservation;
