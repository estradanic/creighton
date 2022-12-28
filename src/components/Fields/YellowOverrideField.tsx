import { JSX, mergeProps, Setter } from "solid-js";

export type YellowOverrideFieldProps = {
  yellowOverride?: boolean
  setYellowOverride?: Setter<boolean>
  disabled?: boolean
};

function YellowOverrideField (_props: YellowOverrideFieldProps): JSX.Element {
  const props = mergeProps({ disabled: false }, _props);
  const onChange: JSX.EventHandlerUnion<HTMLInputElement, Event> = (e): void => {
    if (props.setYellowOverride) {
      e.preventDefault();
      props.setYellowOverride(e.currentTarget.checked);
    }
  };
  return (
    <>
      <label for="yellowOverride">Yellow Stamp?</label>
      <input
        type="checkbox"
        name="yellowOverride"
        checked={props.yellowOverride}
        disabled={props.disabled}
        onChange={onChange}
      />
    </>
  );
}

export default YellowOverrideField;
