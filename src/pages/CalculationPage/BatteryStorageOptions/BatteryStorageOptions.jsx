import React from "react";
import { Radio, Slider } from "antd";
import { faBatteryFull } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";
const minBatterySize = 1.2; // kWh
const maxBatterySize = 28; // kWh

const getBatteryCost = (size) => {
  // This is a simple linear estimation, adjust as needed
  return size * 1000;
};

const BatteryStorageOptions = () => {
  const [showBatteryOptions, setShowBatteryOptions] = React.useState(false);
  const [selectedBatterySize, setSelectedBatterySize] =
    React.useState(minBatterySize);

  const onChange = (e) => {
    setShowBatteryOptions(e.target.value === 2);
  };

  const handleSliderChange = (value) => {
    setSelectedBatterySize(value);
  };

  return (
    <div className="unique-battery-options">
      <h2>Battery Storage Options</h2>
      <div className="instruction-alert">
        <FontAwesomeIcon icon={faBatteryFull} className="icon" />
        <p>Do you want to add a solar battery to your system?</p>
      </div>
      <Radio.Group onChange={onChange}>
        <Radio value={1}>No storage - $0</Radio>
        <Radio value={2}>Yes, I want battery</Radio>
      </Radio.Group>
      {showBatteryOptions && (
        <div className="battery-selection">
          <Slider
            min={minBatterySize}
            max={maxBatterySize}
            defaultValue={minBatterySize}
            step={0.1}
            onChange={handleSliderChange}
          />
          <p className="battery-cost">
            Estimated Battery Cost: $
            {getBatteryCost(selectedBatterySize).toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
};

export default BatteryStorageOptions;
