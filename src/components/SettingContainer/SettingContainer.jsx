import React, { useState } from "react";
import "./SettingContainer.scss";

const SettingsContainer = () => {
  const [electricityPrice, setElectricityPrice] = useState(0);
  const [gasPrice, setGasPrice] = useState(0);
  const [emissionFactor, setEmissionFactor] = useState(0);

  return (
    <div className="settings-container">
      <h2 className="settings-title">Your Settings</h2>
      <form className="settings-form">
        <label>
          Price of Electricity:
          <input
            type="number"
            value={electricityPrice}
            onChange={(e) => setElectricityPrice(e.target.value)}
          />
        </label>
        <label>
          Price of Gas:
          <input
            type="number"
            value={gasPrice}
            onChange={(e) => setGasPrice(e.target.value)}
          />
        </label>

        <button type="submit" className="settings-button">
          Apply
        </button>
      </form>
    </div>
  );
};

export default SettingsContainer;
