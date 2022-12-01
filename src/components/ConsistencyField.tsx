import { Accessor } from "solid-js";

export type ConsistencyFieldProps = {
  consistency?: "dry" | "damp" | "shiny" | "wet" | "pasty" | "gummy";
  disabled?: Accessor<boolean>;
}

function ConsistencyField({consistency, disabled = () => false}: ConsistencyFieldProps) {
  return (
    <>
      <label for="consistency">Consistency</label>
      <select name="consistency" value={consistency} disabled={disabled()}>
        <option value="dry">Dry</option>
        <option value="damp">Damp</option>
        <option value="shiny">Shiny</option>
        <option value="wet">Wet</option>
        <option value="pasty">Pasty (Creamy)</option>
        <option value="gummy">Gummy (Gluey)</option>
      </select>
    </>
  );
}

export default ConsistencyField;
