import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';
import '../styles/index.scss';
import axiosInstance from '../utils/axios';
import { setupsUrl } from '../utils/helpers';
import Filters from './Filters';
import Ticket from './Ticket';
import Charter from './Charter';

const App = () => {
  const [error, setError] = useState(false);
  const [travelPaths, setTravelPaths] = useState([]);
  const [redirectUrl, setRedirectUrl] = useState('');
  const [settings, setSettings] = useState({});

  const fetchResources = async () => {
    try {
      const travelPathsResult = await axiosInstance.get(setupsUrl);
      console.log('travelPathsResult :', travelPathsResult);
      setTravelPaths(travelPathsResult.data.data.locations);
      setRedirectUrl(travelPathsResult.data.data.settings.basic.bookingsAppBaseUrl);
      setSettings(travelPathsResult.data.data.settings);
    } catch (error) {
      console.log('error :', error);
      setError(true);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  return (
    <div className="vm-voomsway-filter">
      <div className="vm-tab-container">
        <Tabs className="vm-main-tab">
          <TabList>
            <Tab>Book Trip</Tab>
            <Tab>Check Ticket</Tab>
            <Tab>Charters</Tab>
          </TabList>
          <TabPanel>
            <Filters travelPaths={travelPaths} redirectUrl={redirectUrl} />
          </TabPanel>
          <TabPanel>
            <Ticket settings={settings} />
          </TabPanel>
          <TabPanel>
            <Charter />
          </TabPanel>
        </Tabs>
        {error && (
          <div className="mt-1">
            <img
              className="label-icon error-animate mb-1"
              src={'./assets/icons/error.svg'}
              alt="error icon"
            />{' '}
            <span className="server-error">
              Issue with the sever, please try again.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
