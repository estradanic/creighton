import { JSX, mergeProps, Setter } from "solid-js";

export type PmsFieldProps = {
  pms?: boolean
  setPms?: Setter<boolean>
  disabled?: boolean
};

function PmsField (_props: PmsFieldProps): JSX.Element {
  const props = mergeProps({ disabled: false }, _props);
  const onChange: JSX.EventHandlerUnion<HTMLInputElement, Event> = (e): void => {
    if (props.setPms) {
      e.preventDefault();
      props.setPms(e.currentTarget.checked);
    }
  };
  return (
    <>
      <label for="pms">PMS?</label>
      <input
        type="checkbox"
        name="pms"
        checked={props.pms}
        disabled={props.disabled}
        onChange={onChange}
      />
    </>
  );
}

export default PmsField;
