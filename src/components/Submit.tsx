import { Accessor } from "solid-js";

export type SubmitProps = {
  disabled?: Accessor<boolean>;
}

function Submit({disabled = () => false}: SubmitProps) {
  return (
    <>
      <label for="submit"></label>
      <input type="submit" name="submit" disabled={disabled()} class="submit" value="Submit"/>
    </>
  );
}

export default Submit;
