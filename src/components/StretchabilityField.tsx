import { Accessor } from "solid-js";

export type StretchabilityFieldProps = {
  stretchability?: "none" | "sticky" | "tacky" | "stretchy";
  disabled?: Accessor<boolean>;
  setStretchability?: (stretchability: StretchabilityFieldProps["stretchability"]) => void;
};

function StretchabilityField({stretchability, setStretchability, disabled = () => false}: StretchabilityFieldProps) {
  return (
    <>
      <label for="stretchability">Stretchability</label>
      <select
        name="stretchability"
        value={stretchability}
        disabled={disabled()}
        onChange={
          setStretchability
          ? (e) => setStretchability(e.currentTarget.value as StretchabilityFieldProps["stretchability"])
          : undefined
        }
      >
        <option value="none">None (Could not pick up)</option>
        <option value="sticky">Sticky (0 - 1/4 inch)</option>
        <option value="tacky">Tacky (1/4 - 3/4 inch)</option>
        <option value="stretchy">Stretchy (3/4 inch or more)</option>
      </select>
    </>
  );
}

export default StretchabilityField;
