import { JSX, mergeProps, Setter } from "solid-js";
import { Appearance } from "../../types/ObservationTypes";

export type AppearanceFieldProps = {
  appearance?: Appearance
  setAppearance?: Setter<Appearance>
  disabled?: boolean
};

function AppearanceField (_props: AppearanceFieldProps): JSX.Element {
  const props = mergeProps({ disabled: false }, _props);
  const onChange: JSX.EventHandlerUnion<HTMLSelectElement, Event> = (e): void => {
    if (props.setAppearance) {
      e.preventDefault();
      props.setAppearance(e.currentTarget.value as Appearance);
    }
  };
  return (
    <>
      <label for="appearance">Appearance</label>
      <select
        name="appearance"
        value={props.appearance}
        disabled={props.disabled}
        onChange={onChange}
      >
        <option value="dry">Dry</option>
        <option value="damp">Damp</option>
        <option value="shiny">Shiny</option>
        <option value="wet">Wet</option>
      </select>
    </>
  );
}

export default AppearanceField;
