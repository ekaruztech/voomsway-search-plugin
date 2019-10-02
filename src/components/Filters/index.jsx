import React, { useState } from "react";
import queryString from "query-string";
import PropTypes from "prop-types";
import SelectInputField from "../common/SelectInputField";
import { searchDateArray } from "../../utils/helpers";

const Filters = props => {
  const { selectWrapperDiv, terminals } = props;
  const defaultFormValues = {
    source: null,
    vehicle_type: null,
    destination: null,
    departure_date: null
  };
  const [filterFormValues, setFilterFormValues] = useState(defaultFormValues); // react select object values
  const [filterValues, setFilterValues] = useState({}); // what to send
  const [destinationsOptions, setDestinationsOptions] = useState([]);
  const [tripType, setTripType] = useState("option1");

  const { departure_date, destination, source } = filterValues;

  const handleSourceChange = (name, selected) => {
    setFilterFormValues({
      ...filterFormValues,
      [name]: selected,
      destination: null
    });
    setFilterValues({
      ...filterValues,
      [name]: selected ? selected.value : null,
      destination: null
    });

    // fill destinations
    if (selected) {
      const { value: _id } = selected;
      const terminal = terminals.find(terminal => terminal._id === _id);
      if (terminal) {
        const { destinations } = terminal;
        let destinationObjs = [];
        if (destinations && destinations.length) {
          destinationObjs = terminals.filter(terminal =>
            destinations.includes(terminal._id)
          );
        }
        setDestinationsOptions(destinationObjs);
      }
    } else {
      setDestinationsOptions([]);
    }
  };

  const handleChange = (name, selectedOption) => {
    setFilterFormValues({ ...filterFormValues, [name]: selectedOption });
    setFilterValues({
      ...filterValues,
      [name]: selectedOption ? selectedOption.value : null
    });
  };

  const tripTypeOnchange = event => {
    setTripType(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (departure_date && destination && source) {
      const result = queryString.stringify(filterValues);
      window.location.href = `${window.location.origin}/vway/trips?${result}`;
    }
  };

  // const passengerList = Array.from({ length: 10 }, (v, k) => k + 1);
  return (
    <form onSubmit={handleSubmit} className="vm-filter-form">
      <div className="vm-trip-type-group">
        <div>
          <label
            className={`vm-checkbox-label ${
              "option1" === tripType ? "active" : ""
            }`}
          >
            <input
              type="radio"
              name="options"
              value="option1"
              onChange={tripTypeOnchange}
              checked={"option1" === tripType}
            />
            One Way
          </label>
          <label
            className={`vm-checkbox-label ${
              "option2" === tripType ? "active" : ""
            }`}
          >
            <input
              type="radio"
              name="options"
              value="option2"
              onChange={tripTypeOnchange}
              checked={"option2" === tripType}
            />
            Round Trip
          </label>
        </div>
      </div>

      <div className="vm-filter-fields-section">
        <SelectInputField
          wrapperDivClass={selectWrapperDiv}
          name="source"
          placeholder="- Departure Terminal -"
          isSearchable
          onChange={handleSourceChange}
          options={terminals.map(
            item =>
              item &&
              item.location && {
                label: `${item.location.city},${item.location.state}`,
                value: item._id
              }
          )}
          value={filterFormValues.source}
        />

        <SelectInputField
          wrapperDivClass={selectWrapperDiv}
          name="destination"
          placeholder="- Destination Terminal -"
          isSearchable
          onChange={handleChange}
          disabled={!destinationsOptions.length}
          options={destinationsOptions.map(
            item =>
              item &&
              item.location && {
                label: `${item.location.city}, ${item.location.state}`,
                value: item._id
              }
          )}
          value={filterFormValues.destination}
        />

        <SelectInputField
          wrapperDivClass={selectWrapperDiv}
          name="departure_date"
          placeholder="- Departure Date -"
          onChange={handleChange}
          options={searchDateArray(7)}
          value={filterFormValues.departure_date}
        />

        {"option2" === tripType && (
          <SelectInputField
            wrapperDivClass={selectWrapperDiv}
            name="arrival_date"
            placeholder="- Arrival Date -"
            onChange={handleChange}
            options={searchDateArray(7)}
            value={filterFormValues.arrival_date}
          />
        )}

        <div className={selectWrapperDiv}>
          <button
            type="submit"
            className="vm-btn-primary"
            disabled={!departure_date || !destination || !source}
          >
            Search Trips
          </button>
        </div>
      </div>
    </form>
  );
};

Filters.propTypes = {
  selectWrapperDiv: PropTypes.string.isRequired,
  terminals: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Filters;
