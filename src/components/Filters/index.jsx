import React, { useState } from 'react';
import queryString from 'query-string';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SelectInputField from '../common/SelectInputField';
import DayPickerInputField from '../common/DayPickerInputField';
import { searchDateArray } from '../../utils/helpers';

import 'react-tabs/style/react-tabs.scss';

const Filters = props => {
  const { travelPaths } = props;

  const defaultFormValues = {
    source: null,
    arrival_date: '',
    destination: null,
    departure_date: '',
  };
  
  const [tripType, setTripType] = useState('roundTrip');
  const [destinationsOptions, setDestinationsOptions] = useState([]);
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [filterValues, setFilterValues] = useState({});
  const { arrival_date, departure_date, destination, source } = formValues;

  const sourceDropdownOptions = () =>
    travelPaths &&
    travelPaths.map(
      travelPath =>
        travelPath &&
        travelPath.source && {
          value: travelPath._id,
          label: `${travelPath.source.location}`,
        }
    );

  const handleSourceChange = (name, selectedOption) => {
    setFormValues({
      ...formValues,
      [name]: selectedOption,
      destination: null,
    });

    setFilterValues({
      ...filterValues,
      [name]: selectedOption ? selectedOption.label : null,
      destination: null,
    });

    if (selectedOption) {
      const { value: _id } = selectedOption;
      const travelPath = travelPaths.find(terminal => terminal._id === _id);
      if (travelPath) {
        const { destination, path } = travelPath;
        let destinationObjs = [
          { value: destination._id, label: destination.location },
        ];

        if (path) {
          path.forEach(item => {
            if (item.source && item.destination) {
              destinationObjs = [
                ...destinationObjs,
                { value: `${item._id}1`, label: item.source },
                { value: `${item._id}2`, label: item.destination },
              ];
            }
          });

          const keys = ['label'];

          const filtered = destinationObjs.filter(
            (s => o =>
              (k => !s.has(k) && s.add(k))(keys.map(k => o[k]).join('|')))(
              new Set()
            )
          );

          destinationObjs = filtered;
        }

        setDestinationsOptions(destinationObjs);
      }
    } else {
      setDestinationsOptions([]);
    }
  };

  const handleChange = (name, selectedOption) => {
    setFormValues({ ...formValues, [name]: selectedOption });
    setFilterValues({
      ...filterValues,
      [name]: selectedOption
        ? name === 'destination'
          ? selectedOption.label
          : selectedOption
        : null,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (departure_date && destination && source) {
      const result = queryString.stringify(filterValues);
      window.location.href = `${window.location.origin}/vway/trips?${result}`;
    }
  };

  const renderRoundTripForm = option => {
    return (
      <form onSubmit={handleSubmit} className="vm-filter-form">
        <SelectInputField
          name="source"
          label="Departure Terminal"
          iconName="departure"
          isSearchable
          onChange={handleSourceChange}
          options={sourceDropdownOptions()}
          value={formValues.source}
        />

        <SelectInputField
          name="destination"
          label="Destination Terminal"
          iconName="destination"
          isSearchable
          onChange={handleChange}
          disabled={!destinationsOptions.length}
          options={destinationsOptions}
          value={formValues.destination}
        />

        <DayPickerInputField
          name="departure_date"
          label="Departure Date"
          iconName="calendar"
          onChange={handleChange}
          options={searchDateArray(7)}
          value={formValues.departure_date}
        />

        {option === 'option1' && (
          <DayPickerInputField
            name="arrival_date"
            label="Arrival Date"
            iconName="calendar"
            onChange={handleChange}
            options={searchDateArray(7)}
            value={formValues.arrival_date}
          />
        )}

        <div className="selectbox-container vm-filters-submit-btn-wrap">
          <div>
            <button
              type="submit"
              className="vm-submit-btn"
              disabled={
                !departure_date ||
                !destination ||
                !source ||
                (tripType === 'roundTrip' && !arrival_date)
              }
            >
              Book Trip
            </button>
          </div>
        </div>
      </form>
    );
  };

  return (
    <div className="vm-filters-container">
      <Tabs
        onSelect={index => {
          const tripList = ['roundTrip', 'oneWayTrip'];

          setTripType(tripList[index]);
        }}
        className="vm-filters-tab"
      >
        <TabList>
          <Tab>Round Trip</Tab>
          <Tab>one way trip</Tab>
        </TabList>
        <TabPanel>{renderRoundTripForm('option1')}</TabPanel>
        <TabPanel>{renderRoundTripForm('option2')}</TabPanel>
      </Tabs>
    </div>
  );
};

export default Filters;
