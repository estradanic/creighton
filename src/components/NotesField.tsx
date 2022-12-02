import { Accessor } from "solid-js";

export type NotesFieldProps = {
  notes?: string;
  setNotes?: (notes: NotesFieldProps["notes"]) => void;
  disabled?: Accessor<boolean>;
};

function NotesField({notes, setNotes, disabled = () => false}: NotesFieldProps) {
  return (
    <>
      <label for="notes">Notes</label>
      <textarea
        name="notes"
        value={notes ?? ""}
        disabled={disabled()}
        onChange={
          setNotes
          ? (e) => setNotes(e.currentTarget.value as NotesFieldProps["notes"])
          : undefined
        }
      />
    </>
  );
}

export default NotesField;
