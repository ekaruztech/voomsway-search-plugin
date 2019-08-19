import React, { useState } from "react";
import queryString from "query-string";
import PropTypes from "prop-types";
import SelectInputField from "../common/SelectInputField";
import { searchDateArray } from "../../utils/helpers";

const Filters = props => {
  const { selectWrapperDiv, terminals, vehicleTypes } = props;
  const defaultFormValues = {
    source: null,
    vehicle_type: null,
    destination: null,
    departure_date: null
  };
  const [filterFormValues, setFilterFormValues] = useState(defaultFormValues); // react select object values
  const [filterValues, setFilterValues] = useState({}); // what to send
  const [destinationsOptions, setDestinationsOptions] = useState([]);

  const { source, destination, departure_date } = filterValues;

  const handleSourceChange = (name, selected) => {
    // handleChange(name, selected);
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

  const handleSubmit = event => {
    event.preventDefault();
    if (source && destination && departure_date) {
      const result = queryString.stringify(filterValues);
      const url = `${window.location.origin}/vway-bookings?${result}`;
      // window.location.href = url;
      console.log(url, "url>>>>>>>>>>");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="voomsway-form">
      <SelectInputField
        wrapperDivClass={selectWrapperDiv}
        name="source"
        placeholder="- Source -"
        onChange={handleSourceChange}
        isSearchable={true}
        value={filterFormValues.source}
        options={terminals.map(
          item =>
            item &&
            item.location && {
              label: `${item.location.city},${item.location.state}`,
              value: item._id
            }
        )}
      />

      <SelectInputField
        wrapperDivClass={selectWrapperDiv}
        name="destination"
        placeholder="- Destination -"
        onChange={handleChange}
        isSearchable={true}
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

      <SelectInputField
        wrapperDivClass={selectWrapperDiv}
        name="vehicle_type"
        placeholder="- Vehicle Type -"
        onChange={handleChange}
        isSearchable={true}
        value={filterFormValues.vehicle_type}
        options={vehicleTypes.map(item => ({
          label: item.name,
          value: item._id
        }))}
      />

      <button
        type="submit"
        className="btn-custom btn-custom-lg btn-vm-custom-primary"
        disabled={!source || !destination || !departure_date}
      >
        Search Trips
      </button>
    </form>
  );
};

Filters.propTypes = {
  selectWrapperDiv: PropTypes.string.isRequired,
  terminals: PropTypes.arrayOf(PropTypes.object).isRequired,
  vehicleTypes: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Filters;
