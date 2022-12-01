import { Accessor } from "solid-js";

export type ColorFieldProps = {
  color?: "na" | "clear" | "cloudy-white" | "cloudy-clear" | "yellow" | "brown" | "red";
  disabled?: Accessor<boolean>;
}

function ColorField({color, disabled = () => false}: ColorFieldProps) {
  return (
    <>
      <label for="color">Color</label>
      <select name="color" value={color} disabled={disabled()}>
        <option value="na">Not Applicable</option>
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
