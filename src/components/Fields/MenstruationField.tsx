import { JSX, mergeProps, Setter } from "solid-js";
import { Menstruation } from "../../types/ObservationTypes";

export type MenstruationFieldProps = {
  menstruation?: Menstruation
  setMenstruation?: Setter<Menstruation>
  disabled?: boolean
};

function MenstruationField (_props: MenstruationFieldProps): JSX.Element {
  const props = mergeProps({ disabled: false }, _props);
  const onChange: JSX.EventHandlerUnion<HTMLSelectElement, Event> = (e): void => {
    if (props.setMenstruation) {
      e.preventDefault();
      props.setMenstruation(e.currentTarget.value as Menstruation);
    }
  };
  return (
    <>
      <label for="menstruation">Menstruation</label>
      <select
        onChange={onChange}
        name="menstruation"
        value={props.menstruation}
        disabled={props.disabled}
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
