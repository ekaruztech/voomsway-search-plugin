import React, { useState, useEffect } from "react";
import EventListener from "react-event-listener";
import "../styles/index.scss";
import Filters from "./Filters";
import axiosInstance from "../utils/axios";
import { terminalsUrl, vehicleTypesUrl } from "../utils/helpers";

const App = () => {
  const [selectWrapperDiv, setSelectWrapperDiv] = useState("vway-select-field");
  const [error, setError] = useState(false);
  const [terminals, setTerminals] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);

  const fetchResources = async () => {
    try {
      const [terminalsResult, vehicleTypesResult] = await Promise.all([
        axiosInstance.get(terminalsUrl),
        axiosInstance.get(vehicleTypesUrl)
      ]);
      console.log(terminalsResult.data.data, "terminalsResult>>>>>>");
      setTerminals(terminalsResult.data.data);
      setVehicleTypes(vehicleTypesResult.data.data);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    handleResize();
    fetchResources();
  }, []);

  const handleResize = () => {
    let elem = document.querySelector(".voomsway-filter");
    const divWidth = elem.offsetWidth;
    setSelectWrapperDiv(
      divWidth > 400 ? "vway-select-field" : "vway-select-field-full"
    );
  };

  return (
    <div className="voomsway-filter">
      <EventListener target="window" onResize={handleResize} />
      <Filters
        terminals={terminals}
        vehicleTypes={vehicleTypes}
        selectWrapperDiv={selectWrapperDiv}
      />
    </div>
  );
};

export default App;
