import { DateTime } from "luxon";
import { JSX, mergeProps, Setter } from "solid-js";

export type DatetimeFieldProps = {
  datetime: DateTime
  setDatetime: Setter<DateTime>
  disabled?: boolean
};

function DatetimeField (_props: DatetimeFieldProps): JSX.Element {
  const props = mergeProps({ disabled: false }, _props);
  return (
    <>
      <label for="datetime">Date/Time</label>
      <input
        type="datetime-local"
        name="datetime"
        value={props.datetime.toFormat("yyyy-MM-dd'T'HH:mm")}
        disabled={props.disabled}
        onChange={(event) => {
          props.setDatetime(DateTime.fromISO(event.currentTarget.value));
        }}
      />
    </>
  );
}

export default DatetimeField;
