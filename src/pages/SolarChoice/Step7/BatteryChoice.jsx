import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Slider, Spin, Button, Radio, InputNumber } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBatteryThreeQuarters,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { updateField } from "../../../reduxToolkit/slices/solarFormSlice"; // Adjust this path to your project's directory structure
import "./style.scss";

const BatteryChoice = ({ nextStep, previousStep }) => {
  const dispatch = useDispatch();
  const batteryChoice = useSelector((state) => state.solarForm.batteryChoice); // Adjust the path if you have a different structure

  const [loading, setLoading] = useState(false);
  const [choice, setChoice] = useState(batteryChoice.wantBattery);
  const [batterySize, setBatterySize] = useState(batteryChoice.batterySize);

  const updateChoiceToRedux = (key, value) => {
    dispatch(
      updateField({
        section: "batteryChoice",
        field: key,
        value: value,
      })
    );
  };

  const [showError, setShowError] = useState(false);

  const handleClick = (callback) => {
    if (!batteryChoice.wantBattery) {
      // If cycle hasn't been chosen, show an error and return early
      setShowError(true);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (callback && typeof callback === "function") {
        callback();
      }
    }, 2000);
  };

  // Update the redux store when the choice changes
  const handleChoiceChange = (e) => {
    setShowError(false);
    const newChoice = e.target.value;
    setChoice(newChoice);
    updateChoiceToRedux("wantBattery", newChoice);
  };

  // Update the redux store when battery size changes
  const handleBatterySizeChange = (value) => {
    setBatterySize(value);
    updateChoiceToRedux("batterySize", value);
  };

  return (
    <div className="battery-choice">
      <h1 className="step-title">Electricity Consumption</h1>

      {loading ? (
        <div className="loading-section">
          <Spin size="large" tip="Preparing your solar journey..."></Spin>
        </div>
      ) : (
        <div className="battery-choice-step">
          <div className="battery-query">
            <FontAwesomeIcon icon={faBatteryThreeQuarters} size="2x" />
            <span>Do you want to add a solar battery to your system?</span>
          </div>
          <Radio.Group
            className="battery-choice-options"
            onChange={handleChoiceChange}
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
          {showError && (
            <p className="error-message">
              Please select Yes or No before proceeding.
            </p>
          )}
          {/* {choice === "Yes" && (
            <div className="usage-slider">
              <div className="range-labels">
                <span className="range-labels-low">0 kW</span>
                <span className="range-labels-high">100 kW</span>
              </div>
              <Slider
                min={1}
                max={100}
                step={0.1}
                onChange={handleBatterySizeChange}
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
                  step={0.1}
                  style={{ margin: "0 16px" }}
                  value={batterySize}
                  onChange={handleBatterySizeChange}
                  className="battery-input"
                />
                <div className="battery-unit">kW</div>
              </div>
            </div>
          )} */}
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
