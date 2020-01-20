import React, { useState } from 'react';
import queryString from 'query-string';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SelectInputField from '../common/SelectInputField';
import DayPickerInputField from '../common/DayPickerInputField';
import { searchDateArray } from '../../utils/helpers';

import 'react-tabs/style/react-tabs.scss';
import { Container, Row, Col } from 'reactstrap';

const Filters = props => {
  const { travelPaths } = props;

  const defaultFormValues = {
    source: null,
    arrival_date: '',
    destination: null,
    departure_date: ''
  };

  const [ tripType, setTripType ] = useState('roundTrip');
  const [ destinationsOptions, setDestinationsOptions ] = useState([]);
  const [ formValues, setFormValues ] = useState(defaultFormValues);
  const [ filterValues, setFilterValues ] = useState({});
  const { arrival_date, departure_date, destination, source } = formValues;

  const sourceDropdownOptions = () =>
    travelPaths &&
    travelPaths.map(
      travelPath =>
        travelPath &&
        travelPath.source && {
          value: travelPath._id,
          label: `${travelPath.source.location}`
        }
    );

  const handleSourceChange = (name, selectedOption) => {
    setFormValues({
      ...formValues,
      [name]: selectedOption,
      destination: null
    });

    setFilterValues({
      ...filterValues,
      [name]:
        selectedOption ? selectedOption.label :
        null,
      destination: null
    });

    if (selectedOption) {
      const { value: _id } = selectedOption;
      const travelPath = travelPaths.find(terminal => terminal._id === _id);
      if (travelPath) {
        const { destination, path } = travelPath;
        let destinationObjs = [ { value: destination._id, label: destination.location } ];

        if (path) {
          path.forEach(item => {
            if (item.source && item.destination) {
              destinationObjs = [
                ...destinationObjs,
                { value: `${item._id}1`, label: item.source },
                { value: `${item._id}2`, label: item.destination }
              ];
            }
          });

          const keys = [ 'label' ];

          const filtered = destinationObjs.filter(
            (s => o => (k => !s.has(k) && s.add(k))(keys.map(k => o[k]).join('|')))(new Set())
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
      [name]:
        selectedOption ? name === 'destination' ? selectedOption.label :
        selectedOption :
        null
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
        <Container fluid>
          <Row>
            <Col className="input-group">
              <SelectInputField
                name="source"
                label="Departure Terminal"
                iconName="departure"
                isSearchable
                onChange={handleSourceChange}
                options={sourceDropdownOptions()}
                value={formValues.source}
              />
            </Col>
            <Col className="input-group">
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
            </Col>
            <Col className="input-group">
              <DayPickerInputField
                name="departure_date"
                label="Departure Date"
                iconName="calendar"
                onChange={handleChange}
                options={searchDateArray(7)}
                value={formValues.departure_date}
              />
            </Col>
            {option === 'option1' && (
              <Col className="input-group">
                <DayPickerInputField
                  name="arrival_date"
                  label="Arrival Date"
                  iconName="calendar"
                  onChange={handleChange}
                  options={searchDateArray(7)}
                  value={formValues.arrival_date}
                />
              </Col>
            )}
            <Col className="input-group vm-filters-submit-btn-wrap d-flex align-items-center">
              <button
                type="submit"
                className="vm-submit-btn"
                disabled={!departure_date || !destination || !source || (tripType === 'roundTrip' && !arrival_date)}
              >
                Book Trip
              </button>
            </Col>
          </Row>
        </Container>
      </form>
    );
  };

  return (
    <div className="vm-filters-container">
      <Tabs
        defaultIndex={1}
        onSelect={index => {
          const tripList = [ 'roundTrip', 'oneWayTrip' ];

          setTripType(tripList[index]);
        }}
        className="vm-filters-tab"
      >
        <Container fluid className="py-3 px-0">
          <Row>
            <Col md="3" lg="2" className="vm-filter-tab-nav-list">
              <TabList>
                <Tab>Round Trip</Tab>
                <Tab>one way trip</Tab>
              </TabList>
            </Col>
            <Col md="9" lg="10" className="tab-panel-wrap">
              <TabPanel>{renderRoundTripForm('option1')}</TabPanel>
              <TabPanel>{renderRoundTripForm('option2')}</TabPanel>
            </Col>
          </Row>
        </Container>
      </Tabs>
    </div>
  );
};

export default Filters;
