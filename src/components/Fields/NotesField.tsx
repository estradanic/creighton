import { JSX, mergeProps, Setter } from "solid-js";

export type NotesFieldProps = {
  notes?: string
  setNotes?: Setter<string>
  disabled?: boolean
};

function NotesField (_props: NotesFieldProps): JSX.Element {
  const props = mergeProps({ disabled: false }, _props);
  const onChange: JSX.EventHandlerUnion<HTMLTextAreaElement, Event> = (e): void => {
    if (props.setNotes) {
      e.preventDefault();
      props.setNotes(e.currentTarget.value);
    }
  };
  return (
    <>
      <label for="notes">Notes</label>
      <textarea
        name="notes"
        value={props.notes ?? ""}
        disabled={props.disabled}
        onChange={onChange}
      />
    </>
  );
}

export default NotesField;
