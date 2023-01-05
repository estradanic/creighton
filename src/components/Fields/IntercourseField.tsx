import { JSX, mergeProps, Setter } from "solid-js";

export type IntercourseFieldProps = {
  intercourse?: boolean
  setIntercourse?: Setter<boolean>
  disabled?: boolean
};

function IntercourseField (_props: IntercourseFieldProps): JSX.Element {
  const props = mergeProps({ disabled: false }, _props);
  const onChange: JSX.EventHandlerUnion<HTMLInputElement, Event> = (e): void => {
    if (props.setIntercourse) {
      e.preventDefault();
      props.setIntercourse(e.currentTarget.checked);
    }
  };
  return (
    <>
      <label for="intercourse">Intercourse?</label>
      <input
        type="checkbox"
        name="intercourse"
        checked={props.intercourse}
        disabled={props.disabled}
        onChange={onChange}
      />
    </>
  );
}

export default IntercourseField;
