import React from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { formatDate, parseDate } from "react-day-picker/moment";
import "./day-picker.styles.scss";

const DayPickerInputField = props => {
  const {
    className,
    name,
    label,
    disabled,
    length,
    placeholder,
    onChange,
    value,
    error,
    beforeDate,
    ...rest
  } = props;

  const today = new Date();
  // const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  const before = beforeDate ? new Date(beforeDate) : new Date(today.getTime());
  return (
    <>
      {label && <label className="form-label">{label}</label>}
      <div className="day-picker-input-container">
        <DayPickerInput
          parseDate={parseDate}
          formatDate={formatDate}
          format="LL"
          placeholder={placeholder || `${formatDate(new Date(), "YYYY-MM-DD")}`}
          onDayChange={onChange}
          value={value}
          dayPickerProps={{
            initialMonth: new Date(),
            fromMonth: new Date(),
            toMonth: new Date(today.setMonth(today.getMonth() + 1)),
            disabledDays: {
              before
            }
          }}
          inputProps={{ readOnly: true }}
          {...rest}
        />
      </div>
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </>
  );
};

export default DayPickerInputField;
