import React from "react";

export const TabHeader = ({ activeStatus, label, tab, setActiveTab }) => {
  const handleClick = () => {
    setActiveTab(tab);
  };

  return (
    <div
      className={`vm-tab-label ${activeStatus ? "vm-active-tab" : ""}`}
      onClick={handleClick}
    >
      {label}
    </div>
  );
};
