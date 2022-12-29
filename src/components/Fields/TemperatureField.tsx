import { JSX, mergeProps, Setter } from "solid-js";

export type TemperatureFieldProps = {
  temperature?: number
  setTemperature?: Setter<number>
  disabled?: boolean
};

function TemperatureField (_props: TemperatureFieldProps): JSX.Element {
  const props = mergeProps({ disabled: false }, _props);
  const onChange: JSX.EventHandlerUnion<HTMLInputElement, Event> = (e): void => {
    if (props.setTemperature) {
      e.preventDefault();
      props.setTemperature(parseFloat(e.currentTarget.value));
    }
  };
  return (
    <>
      <label for="temperature">Temperature</label>
      <input
        type="number"
        step="0.01"
        min="0"
        max="100"
        name="temperature"
        value={props.temperature}
        disabled={props.disabled}
        onChange={onChange}
      />
    </>
  );
}

export default TemperatureField;
