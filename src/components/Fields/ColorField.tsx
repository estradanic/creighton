import { JSX, mergeProps, Setter } from "solid-js";
import { Color } from "../../types/ObservationTypes";

export type ColorFieldProps = {
  color?: Color
  setColor?: Setter<Color>
  disabled?: boolean
};

function ColorField (_props: ColorFieldProps): JSX.Element {
  const props = mergeProps({ disabled: false }, _props);
  const onChange: JSX.EventHandlerUnion<HTMLSelectElement, Event> = (e) => {
    if (props.setColor) {
      e.preventDefault();
      props.setColor(e.currentTarget.value as Color);
    }
  };
  return (
    <>
      <label for="color">Color</label>
      <select
        name="color"
        value={props.color}
        disabled={props.disabled}
        onChange={onChange}
      >
        <option value="na">Not Applicable (Couldn't pick up)</option>
        <option value="clear">Clear</option>
        <option value="cloudy-white">Cloudy White</option>
        <option value="cloudy-clear">Cloudy Clear</option>
        <option value="yellow">Yellow</option>
        <option value="brown">Brown (or Black)</option>
        <option value="red">Red</option>
      </select>
    </>
  );
}

export default ColorField;
