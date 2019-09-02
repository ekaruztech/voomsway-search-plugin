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

  const { departure_date } = filterValues;

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
    if (departure_date) {
      const result = queryString.stringify(filterValues);
      const url = `${window.location.origin}/vm/guo/trips?${result}`;
      console.log(url, "url");
      window.location.href = url;
    }
  };

  const passengerList = Array.from({ length: 10 }, (v, k) => k + 1);

  return (
    <form onSubmit={handleSubmit} className="voomsway-form">
      <div className={`${selectWrapperDiv} trip-type-group`}>
        <div>
          <label
            className={`vm-btn-secondary ${
              "option1" === tripType ? "active" : ""
            }`}
          >
            <input
              type="radio"
              name="options"
              value="option1"
              onChange={tripTypeOnchange}
              checked={"option1" === tripType}
            />{" "}
            One Way
          </label>
          <label
            className={`vm-btn-secondary ${
              "option2" === tripType ? "active" : ""
            }`}
          >
            <input
              type="radio"
              name="options"
              value="option2"
              onChange={tripTypeOnchange}
              checked={"option2" === tripType}
            />{" "}
            Round Trip
          </label>
        </div>
      </div>
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

      <SelectInputField
        wrapperDivClass={selectWrapperDiv}
        name="no_of_adult"
        placeholder="- Adult Passengers -"
        onChange={handleChange}
        value={filterFormValues.no_of_adult}
        options={passengerList.map(item => ({
          label: item,
          value: item
        }))}
      />

      <SelectInputField
        wrapperDivClass={selectWrapperDiv}
        name="no_of_children"
        placeholder="- Children(2-10yrs) Passengers -"
        onChange={handleChange}
        value={filterFormValues.no_of_children}
        options={passengerList.map(item => ({
          label: item,
          value: item
        }))}
      />

      {/*<SelectInputField*/}
      {/*  wrapperDivClass={selectWrapperDiv}*/}
      {/*  name="vehicle_type"*/}
      {/*  placeholder="- Vehicle Type -"*/}
      {/*  onChange={handleChange}*/}
      {/*  value={filterFormValues.vehicle_type}*/}
      {/*  options={vehicleTypes.map(item => ({*/}
      {/*    label: item.name,*/}
      {/*    value: item._id*/}
      {/*  }))}*/}
      {/*/>*/}
      <div className={selectWrapperDiv}>
        <button
          type="submit"
          className="btn-custom btn-vm-custom-primary"
          disabled={!departure_date}
        >
          Search Trips
        </button>
      </div>
    </form>
  );
};

Filters.propTypes = {
  selectWrapperDiv: PropTypes.string.isRequired,
  terminals: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Filters;
