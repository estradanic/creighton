import { JSX, mergeProps, Setter } from "solid-js";
import { Stretchability } from "../../types/ObservationTypes";

export type StretchabilityFieldProps = {
  stretchability?: Stretchability
  disabled?: boolean
  setStretchability?: Setter<Stretchability>
};

function StretchabilityField (_props: StretchabilityFieldProps): JSX.Element {
  const props = mergeProps({ disabled: false }, _props);
  const onChange: JSX.EventHandlerUnion<HTMLSelectElement, Event> = (e): void => {
    if (props.setStretchability) {
      e.preventDefault();
      props.setStretchability(e.currentTarget.value as Stretchability);
    }
  };
  return (
    <>
      <label for="stretchability">Stretchability</label>
      <select
        name="stretchability"
        value={props.stretchability}
        disabled={props.disabled}
        onChange={onChange}
      >
        <option value="none">None (Couldn't pick up)</option>
        <option value="sticky">Sticky (0 - 1/4 inch)</option>
        <option value="tacky">Tacky (1/4 - 1 inch)</option>
        <option value="stretchy">Stretchy (1 inch or more)</option>
      </select>
    </>
  );
}

export default StretchabilityField;
