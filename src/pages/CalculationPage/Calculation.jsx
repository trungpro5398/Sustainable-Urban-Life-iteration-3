// Inside Home.js
import React from "react";
import "./Calculation.scss";
import TabContainer from "./TabContainer/TabContainer.jsx";
import Navbar from "../../components/Navbar/Navbar";
import SolarForm from "./SolarForm/SolarForm";
const Calculation = () => {
  return (
    <div className="container">
      <Navbar />

      <div className="container-calculator">
        <SolarForm />
        <div className="outer-container">
          <TabContainer />
        </div>
      </div>
    </div>
  );
};

export default Calculation;
