import {Accessor} from "solid-js";

export type YellowOverrideFieldProps = {
  yellowOverride?: boolean;
  setYellowOverride?: (yellowOverride: YellowOverrideFieldProps["yellowOverride"]) => void;
  disabled?: Accessor<boolean>;
}

function YellowOverrideField({yellowOverride, setYellowOverride, disabled = () => false}: YellowOverrideFieldProps) {
  return (
    <>
      <label for="yellowOverride">Override</label>
      <input
        type="checkbox"
        name="yellowOverride"
        checked={yellowOverride}
        disabled={disabled()}
        onChange={
          setYellowOverride
          ? (e) => setYellowOverride(e.currentTarget.checked)
          : undefined
        }
      />
    </>
  )
}

export default YellowOverrideField;
