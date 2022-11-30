import { Accessor } from "solid-js";

export type ViscosityFieldProps = {
  viscosity?: "watery" | "thin" | "medium" | "thick";
  disabled?: Accessor<boolean>;
}

function ViscosityField({viscosity, disabled = () => false}: ViscosityFieldProps) {
  return (
    <>
      <label for="viscosity">Viscosity</label>
      <select name="viscosity" value={viscosity} disabled={disabled()}>
        <option value="watery">Watery</option>
        <option value="thin">Thin</option>
        <option value="medium">Medium</option>
        <option value="thick">Thick</option>
      </select>
    </>
  );
}

export default ViscosityField;
