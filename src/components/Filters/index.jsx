import React, { useState } from 'react';
import { uniqBy } from 'lodash';
import moment from 'moment';
import queryString from 'query-string';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import SelectInputField from '../common/SelectInputField';
import DayPickerInputField from '../common/DayPickerInputField';
import { capitalizeFirstLetter, searchDateArray } from '../../utils/helpers';
import 'react-tabs/style/react-tabs.scss';
import { Col, Container, Row } from 'reactstrap';

const Filters = props => {
  const { travelPaths, redirectUrl } = props;

  const defaultFormValues = {
    source: null,
    arrival_date: undefined,
    destination: null,
    departure_date: undefined,
  };

  const [tripType, setTripType] = useState('oneWayTrip');
  const [destinationsOptions, setDestinationsOptions] = useState([]);
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [filterValues, setFilterValues] = useState({});
  const { arrival_date, departure_date, destination, source } = formValues;

  const getTravelPathFromSource = (sourceId, terminals = []) => {
    const sourceTerminals = terminals.filter(
      terminal => terminal.source && terminal.source._id === sourceId
    );
    if (sourceTerminals.length) {
      const reducer = (accumulator, current) => {
        if (current.path && current.path.length) {
          const mappedPath = current.path.map(item => ({
            value: item.destination._id,
            label: capitalizeFirstLetter(item.destination.location),
          }));
          return accumulator.concat(mappedPath);
        }
        return accumulator;
      };
      const paths = sourceTerminals.reduce(reducer, []);
      return uniqBy(paths.sort((a, b) => a.label - b.label), 'value');
    }
    return [];
  };

  const departureTerminalOptions = uniqBy(
    travelPaths &&
      travelPaths
        .filter(item => !!item._id && !!item.source && !!item.source.location)
        .map(item => ({
          label: capitalizeFirstLetter(item.source.location),
          value: item.source._id,
        }))
        .sort((a, b) => a.label - b.label),
    'value'
  );

  const handleSourceChange = (name, selectedOption) => {
    setFormValues({
      ...formValues,
      [name]: selectedOption,
      destination: null,
    });

    setFilterValues({
      ...filterValues,
      [name]: selectedOption ? selectedOption.value : null,
      destination: null,
    });
    if (selectedOption) {
      const { value: _id } = selectedOption;
      // const _id = selected.value || selected._id; // Selected source from form or url
      const destinations = getTravelPathFromSource(_id, travelPaths);
      setDestinationsOptions(destinations);
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
          ? selectedOption.value
          : selectedOption
        : null,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    filterValues.departure_date = moment(filterValues.departure_date).format(
      'YYYY-MM-DD'
    );

    if (departure_date && destination && source) {
      if (arrival_date) {
        filterValues.arrival_date = moment(filterValues.arrival_date).format(
          'YYYY-MM-DD'
        );
      }
      const result = queryString.stringify(filterValues);
      window.location.href = `${redirectUrl}?${result}`;
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
                options={departureTerminalOptions}
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
                disabled={
                  !departure_date ||
                  !destination ||
                  !source ||
                  (tripType === 'roundTrip' ? !arrival_date : false)
                }
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
          const tripList = ['roundTrip', 'oneWayTrip'];

          setTripType(tripList[index]);
        }}
        className="vm-filters-tab"
      >
        <Container fluid className="py-3 vm-filters-container-inner">
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
