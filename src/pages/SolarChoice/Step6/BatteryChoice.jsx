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

/**
 * BatteryChoice Component
 *
 * This component allows users to decide if they want to add a solar battery to their system
 * and choose the size of the battery.
 */
const BatteryChoice = ({ nextStep, previousStep }) => {
  // -------------------
  // REDUX STATE MANAGEMENT
  // -------------------
  const dispatch = useDispatch();
  const batteryChoice = useSelector((state) => state.solarForm.batteryChoice);

  // -------------------
  // LOCAL STATE MANAGEMENT
  // -------------------
  const [loading, setLoading] = useState(false);
  const [choice, setChoice] = useState(batteryChoice.wantBattery);
  const [showError, setShowError] = useState(false);

  // -------------------
  // UTILITY FUNCTIONS
  // -------------------
  /**
   * Update the Redux store for battery choice
   *
   * @param {string} key - The key for the field to be updated
   * @param {any} value - The value to set for the key
   */
  const updateChoiceToRedux = (key, value) => {
    dispatch(
      updateField({
        section: "batteryChoice",
        field: key,
        value: value,
      })
    );
  };

  /**
   * Handles button click and loading animation,
   * then calls the provided callback after a delay.
   *
   * @param {Function} callback - The callback to be executed after loading
   */
  const handleClick = (callback) => {
    if (!batteryChoice.wantBattery) {
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

  /**
   * Update the local state and the Redux store when battery choice changes.
   *
   * @param {Event} e - The event triggered by the Radio.Group onChange.
   */
  const handleChoiceChange = (e) => {
    setShowError(false);
    const newChoice = e.target.value;
    setChoice(newChoice);
    updateChoiceToRedux("wantBattery", newChoice);
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
