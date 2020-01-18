import React, { useState } from 'react';
import queryString from 'query-string';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SelectInputField from '../common/SelectInputField';
import { searchDateArray } from '../../utils/helpers';

import 'react-tabs/style/react-tabs.scss';

const Filters = props => {
  const { terminals } = props;

  const defaultFormValues = {
    source: null,
    arrival_date: null,
    destination: null,
    departure_date: null
  };
  const [ tripType, setTripType ] = useState('');
  const [ formValues, setFormValues ] = useState(defaultFormValues);
  const { departure_date, destination, source } = formValues;

  const dropdownOptions = () => {
    const formatTerminalOption =
      terminals &&
      terminals.map(
        terminal =>
          terminal &&
          terminal.location && {
            label: `${terminal.location.city},${terminal.location.state}`,
            value: terminal._id
          }
      );

    const filteredOptions =
      formatTerminalOption &&
      formatTerminalOption.filter(item => {
        if (item.value === (formValues.source || formValues.destination)) {
          return null;
        }

        return item;
      });

    return filteredOptions;
  };

  const handleChange = (name, selectedOption) => {
    setFormValues({ ...formValues, [name]: selectedOption });
  };

  const handleSubmit = event => {
    event.preventDefault();
    let filterFormValues = {};

    if (tripType === 'roundTrip') {
      filterFormValues = { ...formValues, arrival_date: null };
    }

    if (departure_date && destination && source) {
      const result = queryString.stringify(filterFormValues);
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
          onChange={handleChange}
          options={dropdownOptions()}
          value={formValues.source}
        />

        <SelectInputField
          name="destination"
          label="Destination Terminal"
          iconName="destination"
          isSearchable
          onChange={handleChange}
          options={dropdownOptions()}
          value={formValues.destination}
        />

        <SelectInputField
          name="departure_date"
          label="Departure Date"
          iconName="calendar"
          onChange={handleChange}
          options={searchDateArray(7)}
          value={formValues.departure_date}
        />

        {option === 'option1' && (
          <SelectInputField
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
            <button type="submit" className="vm-submit-btn" disabled={!departure_date || !destination || !source}>
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
          const tripList = [ 'roundTrip', 'oneWayTrip' ];

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
