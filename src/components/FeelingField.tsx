import { Accessor } from "solid-js";

export type FeelingFieldProps = {
  feeling?: "dry" | "smooth" | "lubricative";
  disabled?: Accessor<boolean>;
}

function FeelingField({feeling, disabled = () => false}: FeelingFieldProps) {
  return (
    <>
      <label for="feeling">Feeling</label>
      <select name="feeling" value={feeling} disabled={disabled()}>
        <option value="dry">Dry</option>
        <option value="smooth">Smooth</option>
        <option value="lubricative">Lubricative</option>
      </select>
    </>
  );
}

export default FeelingField;
