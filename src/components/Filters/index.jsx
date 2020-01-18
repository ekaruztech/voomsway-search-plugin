import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SelectInputField from '../common/SelectInputField';
import { searchDateArray } from '../../utils/helpers';

import 'react-tabs/style/react-tabs.scss';

const Filters = () => {
  const renderRoundTripForm = option => {
    return (
      <form className="vm-filter-form">
        <SelectInputField
          name="source"
          label="Departure Terminal"
          iconName="departure"
          isSearchable
          // onChange={handleSourceChange}
          // options={terminals.map(
          //   item =>
          //     item &&
          //     item.location && {
          //       label: `${item.location.city},${item.location.state}`,
          //       value: item._id,
          //     }
          // )}
          // value={filterFormValues.source}
        />

        <SelectInputField
          // wrapperDivClass={selectWrapperDiv}
          name="destination"
          label="Destination Terminal"
          iconName="destination"
          isSearchable
          // onChange={handleChange}
          // disabled={!destinationsOptions.length}
          // options={destinationsOptions.map(
          //   item =>
          //     item &&
          //     item.location && {
          //       label: `${item.location.city}, ${item.location.state}`,
          //       value: item._id,
          //     }
          // )}
          // value={filterFormValues.destination}
        />

        <SelectInputField
          // wrapperDivClass={selectWrapperDiv}
          name="departure_date"
          label="Departure Date"
          iconName="calendar"
          // onChange={handleChange}
          options={searchDateArray(7)}
          // value={filterFormValues.departure_date}
        />

        {option === 'option1' && (
          <SelectInputField
            //   wrapperDivClass={selectWrapperDiv}
            name="arrival_date"
            label="Arrival Date"
            iconName="calendar"
            //   onChange={handleChange}
            options={searchDateArray(7)}
            //   value={filterFormValues.arrival_date}
          />
        )}

        <div className="selectbox-container vm-filters-submit-btn-wrap">
          <div>
            <button
              type="submit"
              className="vm-submit-btn"
              //   disabled={!departure_date || !destination || !source}
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
      <Tabs className="vm-filters-tab">
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
