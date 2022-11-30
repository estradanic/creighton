import { Accessor } from "solid-js";

export type ColorFieldProps = {
  color?: "clear" | "white" | "yellow" | "green" | "brown" | "red" | "pink";
  disabled?: Accessor<boolean>;
}

function ColorField({color, disabled = () => false}: ColorFieldProps) {
  return (
    <>
      <label for="color">Color</label>
      <select name="color" value={color} disabled={disabled()}>
        <option value="clear">Clear</option>
        <option value="white">White</option>
        <option value="yellow">Yellow</option>
        <option value="green">Green</option>
        <option value="brown">Brown</option>
        <option value="red">Red</option>
        <option value="pink">Pink</option>
      </select>
    </>
  );
}

export default ColorField;
