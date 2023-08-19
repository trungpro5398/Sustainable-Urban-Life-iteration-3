import React, { useState } from "react";
import { Slider, Spin, Button, Radio, InputNumber } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBatteryThreeQuarters,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import "./style.scss";

const BatteryChoice = ({ nextStep, previousStep }) => {
  const [loading, setLoading] = useState(false);
  const [choice, setChoice] = useState(null);
  const [batterySize, setBatterySize] = useState(5); // Default to 5

  const handleClick = (callback) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (callback && typeof callback === "function") {
        callback();
      }
    }, 2000);
  };

  return (
    <div className="battery-choice">
      <h1 className="step-title">Electricity Consumption</h1>
      <div className="battery-query">
        <FontAwesomeIcon icon={faBatteryThreeQuarters} size="2x" />
        <span>Do you want to add a solar battery to your system?</span>
      </div>
      {loading ? (
        <div className="loading-section">
          <Spin size="large" tip="Preparing your solar journey..."></Spin>
        </div>
      ) : (
        <div className="battery-choice-step">
          <Radio.Group
            className="battery-choice-options"
            onChange={(e) => setChoice(e.target.value)}
            value={choice}
          >
            <Radio.Button className="battery-choice-option" value="No">
              <p>No</p>
              <div className="choice-circle">
                {choice === "No" && <div className="choice-tick">✓</div>}
              </div>
            </Radio.Button>
            <Radio.Button className="battery-choice-option" value="Yes">
              <p>Yes</p>
              <div className="choice-circle">
                {choice === "Yes" && <div className="choice-tick">✓</div>}
              </div>
            </Radio.Button>
          </Radio.Group>
          {choice === "Yes" && (
            <div className="usage-slider">
              <div className="range-labels">
                <span className="range-labels-low">0 kW</span>
                <span className="range-labels-high">100 kW</span>
              </div>
              <Slider
                min={1}
                max={100}
                step={0.1} // This allows float increments
                onChange={(value) => setBatterySize(value)}
                value={batterySize}
                className="battery-slider"
                tooltipVisible
                tooltipPlacement="top"
                tipFormatter={(value) => `${value}`}
              />
              <div className="battery-size">Battery System Size</div>

              <div className="battery-input-container">
                <InputNumber
                  min={1}
                  max={100}
                  step={0.1} // This allows float increments
                  style={{ margin: "0 16px" }}
                  value={batterySize}
                  onChange={(value) => setBatterySize(value)}
                  className="battery-input"
                />
                <div className="battery-unit">kW</div>
              </div>
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
};

export default BatteryChoice;
