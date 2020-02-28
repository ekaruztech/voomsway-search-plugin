import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';
import '../styles/index.scss';
import axiosInstance from '../utils/axios';
import { travelPathsUrl } from '../utils/helpers';
import Filters from './Filters';
import Ticket from './Ticket';
import Charter from './Charter';

const App = () => {
  const [ error, setError ] = useState(false);
  const [ travelPaths, setTravelPaths ] = useState([]);

  const fetchResources = async () => {
    try {
      const travelPathsResult = await axiosInstance.get(travelPathsUrl);
      setTravelPaths(travelPathsResult.data.data);
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
            <Filters travelPaths={travelPaths} />
          </TabPanel>
          <TabPanel>
            <Ticket />
          </TabPanel>
          <TabPanel>
            <Charter />
          </TabPanel>
        </Tabs>
        {error && <div>Issue with the sever, please try again.</div>}
      </div>
    </div>
  );
};

export default App;
