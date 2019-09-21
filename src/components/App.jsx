import React, { useState, useEffect } from "react";
import EventListener from "react-event-listener";
import "../styles/index.scss";
import Filters from "./Filters";
import axiosInstance from "../utils/axios";
import { terminalsUrl } from "../utils/helpers";

const App = () => {
  const [selectWrapperDiv, setSelectWrapperDiv] = useState("vway-select-field");
  const [error, setError] = useState(false);
  const [terminals, setTerminals] = useState([]);
  // const [vehicleTypes, setVehicleTypes] = useState([]);

  const fetchResources = async () => {
    try {
      // const [terminalsResult, vehicleTypesResult] = await Promise.all([
      //   axiosInstance.get(terminalsUrl),
      //   axiosInstance.get(vehicleTypesUrl)
      // ]);
      const terminalsResult = await axiosInstance.get(terminalsUrl);
      setTerminals(terminalsResult.data.data);
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
    if (divWidth > 767 && divWidth < 1024) {
      widthForFields = "vm-select-field-6";
    } else if (divWidth < 768) {
      widthForFields = "vm-select-field-12";
    }
    setSelectWrapperDiv(widthForFields);
  };

  return (
    <div className="vm-voomsway-filter">
      <EventListener target="window" onResize={handleResize} />
      <Filters terminals={terminals} selectWrapperDiv={selectWrapperDiv} />
    </div>
  );
};

export default App;
