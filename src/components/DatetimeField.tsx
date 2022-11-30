import {DateTime} from "luxon";
import { Accessor } from "solid-js";

export type DatetimeFieldProps = {
  datetime: DateTime;
  setDatetime: (datetime: DateTime) => void;
  disabled?: Accessor<boolean>;
};

function DatetimeField({datetime, disabled = () => false, setDatetime}: DatetimeFieldProps) {
  return (
    <>
      <label for="datetime">Date/Time</label>
      <input
        type="datetime-local"
        name="datetime"
        value={datetime.toFormat("yyyy-MM-dd'T'HH:mm")}
        disabled={disabled()}
        onChange={(event) => {
          setDatetime(DateTime.fromISO(event.currentTarget.value));
        }}
      />
    </>
  );
}

export default DatetimeField;
