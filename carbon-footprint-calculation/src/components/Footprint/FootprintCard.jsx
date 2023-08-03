import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faFire, faCloud } from "@fortawesome/free-solid-svg-icons";
import "./FootprintCard.scss";

const icons = {
  Gas: faFire,
  Electricity: faBolt,
  CO2: faCloud,
};

const FootprintCard = ({ type, value }) => {
  return (
    <div className="footprint-card">
      <FontAwesomeIcon icon={icons[type]} size="3x" />
      <p>{value}</p>
    </div>
  );
};

export default FootprintCard;
