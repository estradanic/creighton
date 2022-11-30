import { Accessor } from "solid-js";

export type NotesFieldProps = {
  notes?: string;
  disabled?: Accessor<boolean>;
};

function NotesField({notes, disabled = () => false}: NotesFieldProps) {
  return (
    <>
      <label for="notes">Notes</label>
      <textarea name="notes" value={notes ?? ""} disabled={disabled()} />
    </>
  );
}

export default NotesField;
