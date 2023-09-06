import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Radio } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBatteryThreeQuarters } from "@fortawesome/free-solid-svg-icons";
import { updateField } from "../../../reduxToolkit/slices/solarFormSlice"; // Adjust this path to your project's directory structure
import "./style.scss";
import CustomLoadingSpinner from "../../../components/CustomLoadingSpinner/CustomLoadingSpinner";
import NavigationButtons from "../../../components/NavigationButtons/NavigationButtons";
import { updateFieldAsync } from "../../../reduxToolkit/Thunks/solarFormThunks";
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

  const [showError, setShowError] = useState(false);

  /**
   * Handle individual radio button click events.
   *
   * @param {string} selectedChoice - The clicked choice ("Yes" or "No").
   */
  const handleRadioClick = (selectedChoice) => {
    // Update local and Redux states
    handleChoiceChange(selectedChoice);

    // Proceed to the next step regardless of the choice being already selected
    handleClick(nextStep);
  };
  /**
   * Handles button click and loading animation,
   * then calls the provided callback after a delay.
   *
   * @param {Function} callback - The callback to be executed after loading
   */
  const handleClick = (callback) => {
    setShowError(false);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      callback();
    }, 2000); // Simulate loading state with 2 seconds delay
  };

  /**
   * Update the local state and the Redux store when battery choice changes.
   *
   * @param {string} newChoice - The choice value ("Yes" or "No").
   */
  const handleChoiceChange = async (newChoice) => {
    try {
      await dispatch(
        updateFieldAsync({
          section: "batteryChoice",
          field: "wantBattery",
          value: newChoice,
        })
      );
      await dispatch(
        updateFieldAsync({
          section: "batteryChoice",
          field: "isCompleted",
          value: true,
        })
      );
      setShowError(false);
    } catch (error) {
      console.error("Error updating Redux store:", error);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Checking for the arrow right key

      if (event.keyCode === 39) {
        handleClick(nextStep); // go to the next step
      }

      // Checking for the arrow left key
      if (event.keyCode === 37) {
        handleClick(previousStep); // go to the previous step
      }
    };

    // Adding the event listener
    window.addEventListener("keydown", handleKeyPress);

    // Cleanup: remove the event listener when component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  return (
    <div className="battery-choice">
      <h1 className="step-title">Electricity Consumption</h1>

      {loading ? (
        <CustomLoadingSpinner />
      ) : (
        <div className="battery-choice-step">
          <div className="battery-query">
            <FontAwesomeIcon icon={faBatteryThreeQuarters} size="2x" />
            <span>Do you want to add a solar battery to your system?</span>
          </div>
          <Radio.Group
            className="battery-choice-options"
            value={batteryChoice?.wantBattery}
          >
            {["No", "Yes"].map((option) => (
              <Radio.Button
                className="battery-choice-option"
                value={option}
                key={option}
                onClick={() => handleRadioClick(option)}
              >
                <p>{option}</p>
                <div className="choice-circle">
                  {batteryChoice?.wantBattery === option && (
                    <div className="choice-tick">✓</div>
                  )}
                </div>
              </Radio.Button>
            ))}
          </Radio.Group>
          {showError && (
            <p className="error-message">
              Please select Yes or No before proceeding.
            </p>
          )}

          <NavigationButtons
            nextStep={nextStep}
            previousStep={previousStep}
            condition={batteryChoice.wantBattery}
            setShowError={setShowError}
            setLoading={setLoading}
          />
        </div>
      )}
    </div>
  );
};

export default BatteryChoice;
