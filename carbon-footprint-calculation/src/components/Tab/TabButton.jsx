import React from "react";
import "./TabButton.scss";

const TabButton = ({ active, onClick, label }) => {
  return (
    <button
      className={`tab-button ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default TabButton;
