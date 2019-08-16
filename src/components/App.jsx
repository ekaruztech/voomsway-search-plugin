import React, { useState, useEffect } from "react";
import queryString from "query-string";
import EventListener from "react-event-listener";
import ReactLoading from "react-loading";
import "../styles/index.scss";
import SelectInputField from "./common/SelectInputField";
import { searchDateArray } from "../utils/functions";

const App = () => {
  const defaultFormValues = {
    source: null,
    vehicle_types: null,
    destination: null,
    departure_day: null
  };
  const [filterFormValues, setFilterFormValues] = useState(defaultFormValues);
  const [filterValues, setFilterValues] = useState({}); // what to send
  const [formLoading, setFormLoading] = useState(false);
  const [selectWrapperDiv, setSelectWrapperDiv] = useState("vway-select-field");

  useEffect(() => {
    handleResize();
  }, []);

  const handleChange = (name, selectedOption) => {
    setFilterFormValues({ ...filterFormValues, [name]: selectedOption });
    setFilterValues({
      ...filterValues,
      [name]: selectedOption ? selectedOption.value : null
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const result = queryString.stringify(filterValues);
    if (result.length > 0) {
      // window.location.href = `${window.location.origin}/?${result}`;
      const url = `${window.location.origin}/?${result}`;
      console.log(url, "url>>>>>>>>>>");
    }
  };

  const handleResize = () => {
    let elem = document.querySelector(".voomsway-filter");
    const divWidth = elem.offsetWidth;
    setSelectWrapperDiv(
      divWidth > 400 ? "vway-select-field" : "vway-select-field-full"
    );
  };

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" }
  ];

  return (
    <div className="voomsway-filter">
      <EventListener target="window" onResize={handleResize} />
      <form onSubmit={handleSubmit} className="voomsway-form">
        <SelectInputField
          wrapperDivClass={selectWrapperDiv}
          name="source"
          label="Source"
          placeholder="- Source -"
          onChange={handleChange}
          isSearchable={true}
          options={options}
          value={filterFormValues.source}
        />

        <SelectInputField
          wrapperDivClass={selectWrapperDiv}
          name="destination"
          label="Destination"
          placeholder="- Destination -"
          onChange={handleChange}
          isSearchable={true}
          options={options}
          value={filterFormValues.destination}
        />

        <SelectInputField
          wrapperDivClass={selectWrapperDiv}
          name="departure_day"
          placeholder="- Departure Day -"
          label="Departure Day"
          onChange={handleChange}
          isSearchable={true}
          options={searchDateArray(7)}
          value={filterFormValues.departure_day}
        />

        <SelectInputField
          wrapperDivClass={selectWrapperDiv}
          name="vehicle_types"
          label="Vehicle Types"
          placeholder="- Vehicle Types -"
          onChange={handleChange}
          isSearchable={true}
          options={options}
          value={filterFormValues.vehicle_types}
        />

        {formLoading ? (
          <ReactLoading type="spin" color="#6EB2FB" />
        ) : (
          <button
            type="submit"
            className="btn-custom btn-custom-lg btn-custom-primary block"
          >
            Find Trips
          </button>
        )}
      </form>
    </div>
  );
};

export default App;
