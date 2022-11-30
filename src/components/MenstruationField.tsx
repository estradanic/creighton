import { Accessor } from "solid-js";

export type MenstruationFieldProps = {
  menstruation?: "none" | "spotting" | "light" | "medium" | "heavy";
  disabled?: Accessor<boolean>;
}

function MenstruationField({menstruation, disabled = () => false}: MenstruationFieldProps) {
  return (
    <>
      <label for="menstruation">Menstruation</label>
      <select name="menstruation" value={menstruation} disabled={disabled()}>
        <option value="none">None</option>
        <option value="spotting">Spotting</option>
        <option value="light">Light</option>
        <option value="medium">Medium</option>
        <option value="heavy">Heavy</option>
      </select>
    </>
  );
}

export default MenstruationField;
