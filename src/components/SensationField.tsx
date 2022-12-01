import { Accessor } from "solid-js";

export type SensationFieldProps = {
  sensation?: "dry" | "smooth" | "lubricative";
  disabled?: Accessor<boolean>;
}

function SensationField({sensation, disabled = () => false}: SensationFieldProps) {
  return (
    <>
      <label for="sensation">Sensation</label>
      <select name="sensation" value={sensation} disabled={disabled()}>
        <option value="dry">Dry</option>
        <option value="smooth">Smooth</option>
        <option value="lubricative">Lubricative</option>
      </select>
    </>
  );
}

export default SensationField;
