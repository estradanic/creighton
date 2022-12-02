import { Accessor } from "solid-js";

export type AppearanceFieldProps = {
  appearance?: "dry" | "damp" | "shiny" | "wet";
  setAppearance?: (appearance: AppearanceFieldProps["appearance"]) => void;
  disabled?: Accessor<boolean>;
}

function AppearanceField({appearance, setAppearance, disabled = () => false}: AppearanceFieldProps) {
  return (
    <>
      <label for="appearance">Appearance</label>
      <select
        name="appearance"
        value={appearance}
        disabled={disabled()}
        onChange={
          setAppearance
          ? (e) => setAppearance(e.currentTarget.value as AppearanceFieldProps["appearance"])
          : undefined
        }
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
