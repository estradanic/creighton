import { Accessor } from "solid-js";
import { Menstruation } from '../types/ObservationTypes';

export type MenstruationFieldProps = {
  menstruation?: Menstruation;
  setMenstruation?: (menstruation: MenstruationFieldProps["menstruation"]) => void;
  disabled?: Accessor<boolean>;
}

function MenstruationField({menstruation, disabled = () => false, setMenstruation}: MenstruationFieldProps) {
  return (
    <>
      <label for="menstruation">Menstruation</label>
      <select
        onChange={
          setMenstruation
          ? (e) => setMenstruation(e.currentTarget.value as MenstruationFieldProps["menstruation"])
          : undefined
      }
        name="menstruation"
        value={menstruation}
        disabled={disabled()}
      >
        <option value="none">None</option>
        <option value="very-light">Very Light (Spotting)</option>
        <option value="light">Light</option>
        <option value="medium">Medium</option>
        <option value="heavy">Heavy</option>
        <option value="very-heavy">Very Heavy</option>
      </select>
    </>
  );
}

export default MenstruationField;
