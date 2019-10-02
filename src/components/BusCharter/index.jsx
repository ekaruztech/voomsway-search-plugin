import React, { useState } from "react";
import PropTypes from "prop-types";
import SelectInputField from "../common/SelectInputField";
import { searchDateArray } from "../../utils/helpers";
import queryString from "query-string";

const BusCharter = props => {
  const { selectWrapperDiv, terminals } = props;
  const defaultFormValues = {
    source: null,
    destination: null,
    departure_date: null
  };

  const [busCharterFormValues, setBusCharterFormValues] = useState(
    defaultFormValues
  ); // react select object values
  const [busCharterValues, setBusCharterValues] = useState({}); // what to send
  const [destinationsOptions, setDestinationsOptions] = useState([]);

  const { departure_date, destination, source } = busCharterValues;

  const handleSourceChange = (name, selected) => {
    setBusCharterFormValues({
      ...busCharterFormValues,
      [name]: selected,
      destination: null
    });
    setBusCharterValues({
      ...busCharterValues,
      [name]: selected ? selected.value : null,
      destination: null
    });

    // fill destinations
    if (selected) {
      const { value: _id } = selected;
      const destinationObjs = terminals.filter(
        terminal => terminal._id !== _id
      );
      setDestinationsOptions(destinationObjs);
    } else {
      setDestinationsOptions([]);
    }
  };

  const handleChange = (name, selectedOption) => {
    setBusCharterFormValues({
      ...busCharterFormValues,
      [name]: selectedOption
    });
    setBusCharterValues({
      ...busCharterValues,
      [name]: selectedOption ? selectedOption.value : null
    });
  };

  const handleBusCharter = () => {
    if (source && destination && departure_date) {
      const result = queryString.stringify(busCharterValues);
      window.location.href = `${window.location.origin}/vway/charter?${result}`;
    }
  };

  return (
    <div className="vm-bus-charter-section">
      <SelectInputField
        wrapperDivClass={selectWrapperDiv}
        name="source"
        placeholder="- Pick Up Terminal -"
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
        value={busCharterFormValues.source}
      />

      <SelectInputField
        wrapperDivClass={selectWrapperDiv}
        name="destination"
        placeholder="- Drop Off Terminal -"
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
        value={busCharterFormValues.destination}
      />

      <SelectInputField
        wrapperDivClass={selectWrapperDiv}
        name="departure_date"
        placeholder="- Departure Date -"
        onChange={handleChange}
        options={searchDateArray(7)}
        value={busCharterFormValues.departure_date}
      />

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

BusCharter.propTypes = {
  selectWrapperDiv: PropTypes.string.isRequired,
  terminals: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default BusCharter;
