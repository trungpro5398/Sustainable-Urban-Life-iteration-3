import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import "./TabButton.scss";

const TabButton = ({ active, onClick, label, disabled }) => {
  return (
    <button
      className={`tab-button ${active ? "active" : ""}`}
      onClick={!disabled ? onClick : null}
    >
      {!active && disabled && (
        <FontAwesomeIcon icon={faBan} style={{ marginRight: "10px" }} />
      )}
      {label}
    </button>
  );
};

export default TabButton;
