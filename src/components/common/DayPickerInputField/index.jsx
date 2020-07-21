import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { formatDate, parseDate } from 'react-day-picker/moment';
import './day-picker.styles.scss';

const DayPickerInputField = props => {
  const {
    className,
    name,
    label,
    disabled,
    length,
    placeholder,
    iconName,
    onChange,
    value,
    error,
    beforeDate,
    ...rest
  } = props;

  const renderIcon = iconName => (
    <img
      className="label-icon"
      src={`./assets/icons/${iconName}.svg`}
      alt="calendar icon"
    />
  );

  const handleSelectChange = selectedOption => {
    onChange(name, selectedOption);
  };

  const today = new Date();
  // const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  const before = beforeDate ? new Date(beforeDate) : new Date(today.getTime());
  return (
    <div className="date-picker-container">
      {label && (
        <label className="vm-form-label">
          {iconName && renderIcon(iconName)}
          {label}
        </label>
      )}
      <div className="day-picker-input-container">
        <DayPickerInput
          keepFocus={false}
          parseDate={parseDate}
          formatDate={formatDate}
          format="LL"
          placeholder={placeholder || `${formatDate(new Date(), 'LL')}`}
          renderDay
          onDayChange={handleSelectChange}
          value={value}
          dayPickerProps={{
            initialMonth: new Date(),
            fromMonth: new Date(),
            toMonth: new Date(today.setMonth(today.getMonth() + 1)),
            disabledDays: {
              before,
            },
          }}
          inputProps={{ readOnly: false }}
          {...rest}
        />
      </div>
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

export default DayPickerInputField;
