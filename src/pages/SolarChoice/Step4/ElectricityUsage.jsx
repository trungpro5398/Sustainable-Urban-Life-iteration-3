import React, { useState } from "react";
import { Slider, Spin, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
function ElectricityUsage({ nextStep, previousStep }) {
  const [usageValue, setUsageValue] = useState(50); // Default value
  const [loading, setLoading] = useState(false);

  const handleClick = (callback) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (callback && typeof callback === "function") {
        callback();
      }
    }, 1); // Wait for 2 seconds before invoking the callback
  };
  return (
    <div className="electricity-usage-step">
      <h1 className="step-title">Electricity Consumption</h1>

      <div className="usage-instructions">
        <p>Please slide to indicate your monthly electricity consumption</p>
      </div>

      <div className="usage-slider">
        <div className="range-labels">
          <span className="range-labels-low">Low</span>
          <span className="range-labels-high">High</span>
        </div>
        <Slider
          min={0}
          max={1000}
          onChange={(value) => setUsageValue(value)}
          value={usageValue}
          className="custom-slider"
        />
        <div className="slider-value-display">{usageValue} kWh</div>
      </div>

      {loading && (
        <div className="loading-section">
          <Spin />
          <p>Loading...</p>
        </div>
      )}

      <Button
        className="previous-button"
        icon={<FontAwesomeIcon icon={faArrowLeft} size="xs" />}
        onClick={() => handleClick(previousStep)}
        shape="circle"
      ></Button>
      <Button
        className="next-button"
        icon={<FontAwesomeIcon icon={faArrowRight} size="xs" />}
        onClick={() => handleClick(nextStep)}
        shape="circle"
      ></Button>
    </div>
  );
}

export default ElectricityUsage;
