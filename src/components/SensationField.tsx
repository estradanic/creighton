import { Accessor } from "solid-js";

export type SensationFieldProps = {
  sensation?: "dry" | "smooth" | "lubricative";
  setSensation?: (sensation: SensationFieldProps["sensation"]) => void;
  disabled?: Accessor<boolean>;
}

function SensationField({sensation, setSensation, disabled = () => false}: SensationFieldProps) {
  return (
    <>
      <label for="sensation">Sensation</label>
      <select
        name="sensation"
        value={sensation}
        disabled={disabled()}
        onChange={
          setSensation
          ? (e) => setSensation(e.currentTarget.value as SensationFieldProps["sensation"])
          : undefined
        }
      >
        <option value="dry">Dry</option>
        <option value="smooth">Smooth</option>
        <option value="lubricative">Lubricative</option>
      </select>
    </>
  );
}

export default SensationField;
