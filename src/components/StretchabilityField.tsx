import { Accessor } from "solid-js";

export type StretchabilityFieldProps = {
  stretchability?: "none" | "sticky" | "tacky" | "stretchy";
  disabled?: Accessor<boolean>;
};

function StretchabilityField({stretchability, disabled = () => false}: StretchabilityFieldProps) {
  return (
    <>
      <label for="stretchability">Stretchability</label>
      <select name="stretchability" value={stretchability} disabled={disabled()}>
        <option value="none">None (Could not pick up)</option>
        <option value="sticky">Sticky (0 - 1/4 inchh)</option>
        <option value="tacky">Tacky (1/4 - 3/4 inch)</option>
        <option value="stretchy">Stretchy (3/4 inch or more)</option>
      </select>
    </>
  );
}

export default StretchabilityField;
