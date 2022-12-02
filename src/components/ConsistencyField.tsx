import { Accessor } from "solid-js";

export type ConsistencyFieldProps = {
  consistency?: "na" | "stringy" | "pasty" | "gummy";
  setConsistency?: (consistency: ConsistencyFieldProps["consistency"]) => void;
  disabled?: Accessor<boolean>;
}

function ConsistencyField({consistency, setConsistency, disabled = () => false}: ConsistencyFieldProps) {
  return (
    <>
      <label for="consistency">Consistency</label>
      <select
        name="consistency"
        value={consistency}
        disabled={disabled()}
        onChange={
          setConsistency
          ? (e) => setConsistency(e.currentTarget.value as ConsistencyFieldProps["consistency"])
          : undefined
        }
      >
        <option value="na">Not Applicable (Couldn't pick up)</option>
        <option value="stringy">Stringy (Stretched into a thin thread)</option>
        <option value="pasty">Pasty (Creamy)</option>
        <option value="gummy">Gummy (Gluey)</option>
      </select>
    </>
  );
}

export default ConsistencyField;
