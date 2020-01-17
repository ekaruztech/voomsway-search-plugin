import React, { useState, useEffect } from 'react';
import EventListener from 'react-event-listener';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';
import '../styles/index.scss';
import axiosInstance from '../utils/axios';
import { terminalsUrl } from '../utils/helpers';
import Filters from './Filters';
import { TabHeader } from './common/TabHeader';
import Ticket from './Ticket';
import Charter from './Charter';

const tabs = {
  bookTrip: 'book-trip',
  checkTicket: 'check-ticket',
  busCharter: 'bus-charter',
};

const App = () => {
  const [selectWrapperDiv, setSelectWrapperDiv] = useState('vm-select-field');
  const [ticketFieldWidth, setTicketFieldDiv] = useState('vm-select-field-4');
  const [error, setError] = useState(false);
  const [terminals, setTerminals] = useState([]);
  const [activeTab, setActiveTab] = useState(tabs.bookTrip);

  const fetchResources = async () => {
    try {
      // const [terminalsResult, vehicleTypesResult] = await Promise.all([
      //   axiosInstance.get(terminalsUrl),
      //   axiosInstance.get(vehicleTypesUrl)
      // ]);
      // setVehicleTypes(vehicleTypesResult.data.data);

      const terminalsResult = await axiosInstance.get(terminalsUrl);
      setTerminals(terminalsResult.data.data);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    handleResize();
    fetchResources();
  }, []);

  const handleResize = () => {
    let elem = document.querySelector('.vm-voomsway-filter');
    const divWidth = elem.offsetWidth;
    let widthForFields = 'vm-select-field';
    let widthTicketField = 'vm-select-field-4';
    if (divWidth > 767 && divWidth < 1024) {
      widthForFields = 'vm-select-field-6';
      widthTicketField = 'vm-select-field-6';
    } else if (divWidth < 768) {
      widthForFields = 'vm-select-field-12';
      widthTicketField = 'vm-select-field-12';
    }
    setSelectWrapperDiv(widthForFields);
    setTicketFieldDiv(widthTicketField);
  };

  return (
    <div className="vm-voomsway-filter">
      <EventListener target="window" onResize={handleResize} />
      <div className="vm-tab-section">
        <Tabs>
          <TabList>
            <Tab>Book Trip</Tab>
            <Tab>Check Ticket</Tab>
          </TabList>

          <TabPanel>
            <div>
              <h2 style={{ border: '1px solid #000' }}>Any content 1</h2>
            </div>
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );

  // return (
  //   <div className="vm-voomsway-filter">
  //     <EventListener target="window" onResize={handleResize} />
  //     <div className="vm-tab-section">
  //       <TabHeader
  //         setActiveTab={setActiveTab}
  //         activeStatus={activeTab === tabs.bookTrip}
  //         label="Book Trip"
  //         tab={tabs.bookTrip}
  //       />
  //       <TabHeader
  //         setActiveTab={setActiveTab}
  //         activeStatus={activeTab === tabs.busCharter}
  //         label="Bus Charter"
  //         tab={tabs.busCharter}
  //       />
  //       <TabHeader
  //         setActiveTab={setActiveTab}
  //         activeStatus={activeTab === tabs.checkTicket}
  //         label="Check Ticket"
  //         tab={tabs.checkTicket}
  //       />
  //     </div>
  //     <React.Fragment>
  //       {activeTab === tabs.bookTrip && (
  //         <Filters terminals={terminals} selectWrapperDiv={selectWrapperDiv} />
  //       )}
  //       {activeTab === tabs.busCharter && (
  //         <Charter selectWrapperDiv={selectWrapperDiv} />
  //       )}
  //       {activeTab === tabs.checkTicket && (
  //         <Ticket ticketFieldWidth={ticketFieldWidth} />
  //       )}
  //     </React.Fragment>
  //   </div>
  // );
};

export default App;
