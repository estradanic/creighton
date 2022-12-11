import { JSX, mergeProps } from "solid-js";

export type SubmitProps = {
  disabled?: boolean
};

function Submit (_props: SubmitProps): JSX.Element {
  const props = mergeProps({ disabled: false }, _props);
  return (
    <>
      <label for="submit" />
      <input type="submit" name="submit" disabled={props.disabled} class="submit" value="Submit"/>
    </>
  );
}

export default Submit;
