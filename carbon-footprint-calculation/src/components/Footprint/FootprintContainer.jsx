import React from "react";
import FootprintCard from "./FootprintCard";
import PieChart from "../Chart/PieChart";
import "./FootprintContainer.scss";

const FootprintContainer = () => {
  return (
    <div className="footprint-container">
      <div className="cards">
        <FootprintCard type="Gas" value="1000 kWh" />
        <FootprintCard type="Electricity" value="1000 kWh" />
        <FootprintCard type="CO2" value="1000 kWh" />
      </div>
      <PieChart />
    </div>
  );
};

export default FootprintContainer;
