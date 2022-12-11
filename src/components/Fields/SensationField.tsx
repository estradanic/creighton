import { JSX, mergeProps, Setter } from "solid-js";
import { Sensation } from "../../types/ObservationTypes";

export type SensationFieldProps = {
  sensation?: Sensation
  setSensation?: Setter<Sensation>
  disabled?: boolean
};

function SensationField (_props: SensationFieldProps): JSX.Element {
  const props = mergeProps({ disabled: false }, _props);
  const onChange: JSX.EventHandlerUnion<HTMLSelectElement, Event> = (e): void => {
    if (props.setSensation) {
      e.preventDefault();
      props.setSensation(e.currentTarget.value as Sensation);
    }
  };
  return (
    <>
      <label for="sensation">Sensation</label>
      <select
        name="sensation"
        value={props.sensation}
        disabled={props.disabled}
        onChange={onChange}
      >
        <option value="dry">Dry</option>
        <option value="smooth">Smooth</option>
        <option value="lubricative">Lubricative</option>
      </select>
    </>
  );
}

export default SensationField;
