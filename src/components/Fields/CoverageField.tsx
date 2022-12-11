import { JSX, mergeProps, Setter } from "solid-js";
import { Coverage } from "../../types/ObservationTypes";

export type AppearanceFieldProps = {
  coverage?: Coverage
  setCoverage?: Setter<Coverage>
  disabled?: boolean
};

function AppearanceField (_props: AppearanceFieldProps): JSX.Element {
  const props = mergeProps({ disabled: false }, _props);
  const onChange: JSX.EventHandlerUnion<HTMLSelectElement, Event> = (e): void => {
    if (props.setCoverage) {
      e.preventDefault();
      props.setCoverage(e.currentTarget.value as Coverage);
    }
  };
  return (
    <>
      <label for="coverage">Coverage</label>
      <select
        name="coverage"
        value={props.coverage}
        disabled={props.disabled}
        onChange={onChange}
      >
        <option value="na">N/A (Couldn't pick up)</option>
        <option value="blip">Only a "blip"</option>
        <option value="little">Very little</option>
        <option value="much">Very much/most</option>
        <option value="all">All</option>
      </select>
    </>
  );
}

export default AppearanceField;
