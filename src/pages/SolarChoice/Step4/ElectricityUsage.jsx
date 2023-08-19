import React, { useState } from "react";
import { Slider, Spin, Button, InputNumber } from "antd";
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
    <div className="electricity-usage">
      <h1 className="step-title">Electricity Consumption</h1>
      {loading ? (
        <div className="loading-section">
          <Spin size="large" tip="Preparing your solar journey..."></Spin>
        </div>
      ) : (
        <div className="electricity-usage-step">
          <div className="usage-instructions">
            <p>Please slide to indicate your monthly electricity consumption</p>
          </div>

          <div className="usage-slider">
            <div className="range-labels">
              <span className="range-labels-low">Low</span>
              <span className="range-labels-high">High</span>
            </div>
            <Slider
              min={1}
              max={100}
              step={0.1} // This allows float increments
              onChange={(value) => setUsageValue(value)}
              value={usageValue}
              className="electricity-usage-slider"
              tooltipVisible
              tooltipPlacement="top"
              tipFormatter={(value) => `${value}`}
            />
            <div className="electricity-usage-size">Electricity usage</div>

            <div className="electricity-usage-input-container">
              <InputNumber
                min={1}
                max={100}
                step={0.1} // This allows float increments
                style={{ margin: "0 16px" }}
                value={usageValue}
                onChange={(value) => setUsageValue(value)}
                className="electricity-usage-input"
              />
              <div className="electricity-usage-unit">kW</div>
            </div>
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
      )}
    </div>
  );
}

export default ElectricityUsage;
