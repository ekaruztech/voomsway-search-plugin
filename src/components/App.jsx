import React, { useState, useEffect } from "react";
import EventListener from "react-event-listener";
import "../styles/index.scss";
import Filters from "./Filters";
import axiosInstance from "../utils/axios";
import { terminalsUrl } from "../utils/helpers";
import { TabHeader } from "./common/TabHeader";
import CheckTicket from "./CheckTicket";

const tabs = {
  buyTicket: "buy-ticket",
  checkTicket: "check-ticket",
  busCharter: "bus-charter"
};

const App = () => {
  const [selectWrapperDiv, setSelectWrapperDiv] = useState("vm-select-field");
  const [ticketFieldWidth, setTicketFieldDiv] = useState("vm-select-field-4");
  const [error, setError] = useState(false);
  const [terminals, setTerminals] = useState([]);
  const [activeTab, setActiveTab] = useState(tabs.buyTicket);

  const fetchResources = async () => {
    try {
      // const [terminalsResult, vehicleTypesResult] = await Promise.all([
      //   axiosInstance.get(terminalsUrl),
      //   axiosInstance.get(vehicleTypesUrl)
      // ]);
      // const terminalsResult = await axiosInstance.get(terminalsUrl);
      // setTerminals(terminalsResult.data.data);
      // setVehicleTypes(vehicleTypesResult.data.data);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    handleResize();
    fetchResources();
  }, []);

  const handleResize = () => {
    let elem = document.querySelector(".vm-voomsway-filter");
    const divWidth = elem.offsetWidth;
    let widthForFields = "vm-select-field";
    let widthTicketField = "vm-select-field-4";
    if (divWidth > 767 && divWidth < 1024) {
      widthForFields = "vm-select-field-6";
      widthTicketField = "vm-select-field-6";
    } else if (divWidth < 768) {
      widthForFields = "vm-select-field-12";
      widthTicketField = "vm-select-field-12";
    }
    setSelectWrapperDiv(widthForFields);
    setTicketFieldDiv(widthTicketField);
  };

  return (
    <div className="vm-voomsway-filter">
      <EventListener target="window" onResize={handleResize} />
      <div className="vm-tab-section">
        <TabHeader
          setActiveTab={setActiveTab}
          activeStatus={activeTab === tabs.buyTicket}
          label="Buy Ticket"
          tab={tabs.buyTicket}
        />
        <TabHeader
          setActiveTab={setActiveTab}
          activeStatus={activeTab === tabs.checkTicket}
          label="Check Ticket"
          tab={tabs.checkTicket}
        />
      </div>
      <React.Fragment>
        {activeTab === tabs.buyTicket && (
          <Filters terminals={terminals} selectWrapperDiv={selectWrapperDiv} />
        )}
        {activeTab === tabs.checkTicket && (
          <CheckTicket widthTicketField={ticketFieldWidth} />
        )}
      </React.Fragment>
    </div>
  );
};

export default App;
