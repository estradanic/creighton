import { JSX, mergeProps, Setter } from "solid-js";
import { Consistency } from "../../types/ObservationTypes";

export type ConsistencyFieldProps = {
  consistency?: Consistency
  setConsistency?: Setter<Consistency>
  disabled?: boolean
};

function ConsistencyField (_props: ConsistencyFieldProps): JSX.Element {
  const props = mergeProps({ disabled: false }, _props);
  const onChange: JSX.EventHandlerUnion<HTMLSelectElement, Event> = (e): void => {
    if (props.setConsistency) {
      e.preventDefault();
      props.setConsistency(e.currentTarget.value as Consistency);
    }
  };
  return (
    <>
      <label for="consistency">Consistency</label>
      <select
        name="consistency"
        value={props.consistency}
        disabled={props.disabled}
        onChange={onChange}
      >
        <option value="na">Not Applicable (Couldn't pick up)</option>
        <option value="stringy">Stringy (Stretched into a thin thread)</option>
        <option value="ropey">Ropey (Stretched, but not a thin thread)</option>
        <option value="pasty">Pasty (Creamy, like actual lotion)</option>
        <option value="gummy">Gummy (Gluey, like actual glue)</option>
      </select>
    </>
  );
}

export default ConsistencyField;
