import { Accessor } from "solid-js";

export type StickinessFieldProps = {
  stickiness?: "none" | "low" | "tacky" | "sticky";
  disabled?: Accessor<boolean>;
};

function StickinessField({stickiness, disabled = () => false}: StickinessFieldProps) {
  return (
    <>
      <label for="stickiness">Stickiness</label>
      <select name="stickiness" value={stickiness} disabled={disabled()}>
        <option value="none">None (Could not pick up)</option>
        <option value="low">Low (0 - 1/2 inch)</option>
        <option value="tacky">Tacky (1/2 - 3/4 inch)</option>
        <option value="sticky">Sticky (3/4 - 1 inch)</option>
      </select>
    </>
  );
}

export default StickinessField;
