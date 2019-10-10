import React, { useState } from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import DayPickerInputField from "../common/DayPickerInputField";
import moment from "moment-timezone";

const Charter = props => {
  const { selectWrapperDiv } = props;
  const defaultFormValues = {
    source: "",
    destination: "",
    departure_date: ""
  };

  const [charterFormValues, setCharterFormValues] = useState(defaultFormValues);

  const onChange = event => {
    const { name, value } = event.target;
    setCharterFormValues({ ...charterFormValues, [name]: value });
  };

  const onDepartureDateChange = value => {
    setCharterFormValues({
      ...charterFormValues,
      departure_date: value
        ? moment(value)
            .tz("Africa/Lagos")
            .format("YYYY-MM-DD")
        : ""
    });
  };

  const { departure_date, destination, source } = charterFormValues;

  const handleBusCharter = () => {
    if (source && destination && departure_date) {
      const result = queryString.stringify(charterFormValues);
      window.location.href = `${window.location.origin}/vway/trips/charters/add?${result}`;
    }
  };

  return (
    <div className="vm-charter-section">
      <div className={selectWrapperDiv}>
        <input
          name="source"
          type="text"
          onChange={onChange}
          placeholder="Pick Up Location"
          value={source}
          className="text-field-input"
        />
      </div>

      <div className={selectWrapperDiv}>
        <input
          name="destination"
          type="text"
          onChange={onChange}
          placeholder="Drop-off Location"
          value={destination}
          className="text-field-input"
        />
      </div>

      <div className={selectWrapperDiv}>
        <DayPickerInputField
          name="departure_date"
          placeholder="Departure Date"
          onChange={onDepartureDateChange}
          value={departure_date}
        />
      </div>

      <div className={selectWrapperDiv}>
        <button
          className="vm-btn-primary"
          onClick={handleBusCharter}
          disabled={!departure_date || !destination || !source}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

Charter.propTypes = {
  selectWrapperDiv: PropTypes.string.isRequired
};

export default Charter;
