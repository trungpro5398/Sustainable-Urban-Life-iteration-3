// -------------------
// IMPORTS
// -------------------

// React Dependencies
import React, { useEffect } from "react";

// Redux Dependencies
import { useDispatch, useSelector } from "react-redux";
import {
  updateField,
  selectSolarForm,
} from "../../../reduxToolkit/slices/solarFormSlice";

// UI Components & Icons
import { Slider, Spin, Button, Modal, message, Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faQuestionCircle,
  faLightbulb,
  faHandPointRight,
  faSlidersH,
} from "@fortawesome/free-solid-svg-icons";

// Styles
import "./style.scss";

/**
 * ElectricityUsage Component: Allows users to select their electricity usage.
 *
 * @param {function} nextStep - Function to move to the next step.
 * @param {function} previousStep - Function to move to the previous step.
 * @returns {JSX.Element}
 */
const ElectricityUsage = ({ nextStep, previousStep }) => {
  // -------------------
  // REDUX STATE MANAGEMENT
  // -------------------

  const { electricityUsage, billingCycle } = useSelector(selectSolarForm);
  const dispatch = useDispatch();

  // -------------------
  // LOCAL STATE MANAGEMENT
  // -------------------

  const [isModalVisible, setModalVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  // -------------------
  // UTILITY FUNCTIONS
  // -------------------

  /**
   * Emulates a loading action and optionally calls a callback function.
   * @param {function} callback - Optional callback to call after loading.
   */
  const handleClick = (callback) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (callback && typeof callback === "function") {
        callback();
      }
    }, 2000);
  };

  /**
   * Compute the daily usage based on billing cycle.
   * @param {number} usageValue - The usage value to compute daily usage for.
   * @returns {number} - The computed daily usage.
   */
  const computeDailyUsage = (usageValue) => {
    let divisor;
    switch (billingCycle.cycle) {
      case "monthly":
        divisor = 30;
        break;
      case "quarterly":
        divisor = 90;
        break;
      case "yearly":
        divisor = 365;
        break;
      default:
        divisor = 1;
    }
    return usageValue / divisor;
  };

  /**
   * Calculates the usage range based on billing cycle.
   * @param {number} usageValue - The usage value to calculate range for.
   * @returns {number} - The calculated usage range.
   */
  const rangeUsage = (usageValue) => {
    let divisor;
    switch (billingCycle.cycle) {
      case "monthly":
        divisor = 30;
        break;
      case "quarterly":
        divisor = 90;
        break;
      case "yearly":
        divisor = 365;
        break;
      default:
        divisor = 1;
    }
    return ((usageValue / 365) * divisor).toFixed(0);
  };

  /**
   * Handles changes in the electricity usage input/slider.
   * @param {number} value - The new value of the input/slider.
   */
  const handleUsageChange = (value) => {
    // Setting message config
    message.config({
      top: "50vh", // 50% of the viewport height, adjust accordingly
      duration: 5, // 5 seconds
    });

    setError("");
    // Regex for special characters excluding the dot (.)
    const regexSpecialChars = /[^0-9a-zA-Z.]/;

    // Regex for alphabetic characters
    const regexTextChars = /[a-zA-Z]/;

    const maxLength = 6; // Adjust this value as needed

    // Check for special characters first
    if (regexSpecialChars.test(String(value))) {
      message.error({
        content: "Special characters are not allowed.",
        style: {
          fontSize: "20px", // Bigger font size
        },
      });
      return;
    }

    // Check for alphabetic characters next
    if (regexTextChars.test(String(value))) {
      message.error({
        content: "Text input is not allowed in numeric fields.",
        style: {
          fontSize: "20px", // Bigger font size
        },
      });
      return;
    }

    // Check length last
    if (String(value).length > maxLength) {
      message.error({
        content: "Input exceeds character limit.",
        style: {
          fontSize: "20px", // Bigger font size
        },
      });
      return;
    }

    const dailyUsage = computeDailyUsage(value);
    dispatch(
      updateField({ section: "electricityUsage", field: "usageValue", value })
    );
    dispatch(
      updateField({
        section: "electricityUsage",
        field: "usageDaily",
        value: dailyUsage,
      })
    );
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
  // -------------------
  // COMPONENT JSX
  // -------------------

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
            <p>
              Please slide to indicate your {billingCycle.cycle} electricity
              consumption
            </p>
          </div>

          <div className="usage-slider">
            <div className="range-labels">
              <span className="range-labels-low">Low</span>
              <span className="range-labels-high">High</span>
            </div>
            <Slider
              min={1}
              max={rangeUsage(10000)}
              step={0.1}
              onChange={handleUsageChange}
              value={electricityUsage.usageValue}
              className="electricity-usage-slider"
              tooltipVisible
              tooltipPlacement="bottom"
              tipFormatter={(value) => `${value} kWh`}
            />

            <div className="electricity-usage-size">Electricity usage</div>

            <div className="electricity-usage-input-container">
              <Input
                value={String(electricityUsage.usageValue)}
                onChange={(e) => handleUsageChange(e.target.value)}
                className="electricity-usage-input"
              />
              <div className="electricity-usage-unit">
                kWh
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  className="instruction-icon"
                  onClick={() => setModalVisible(true)}
                  onMouseEnter={() => setModalVisible(true)}
                />
              </div>
            </div>
            <Modal
              title={
                <div className="electricity-item">
                  <FontAwesomeIcon
                    icon={faLightbulb}
                    className="electricity-icon"
                  />
                  How to Adjust Electricity Consumption
                </div>
              }
              visible={isModalVisible}
              onCancel={() => setModalVisible(false)}
              footer={null}
              centered
              className="electricity-modal"
            >
              <div className="electricity-content">
                <div className="electricity-item">
                  <FontAwesomeIcon
                    icon={faHandPointRight}
                    size="2x"
                    className="electricity-icon"
                  />
                  <p>
                    You can input the consumption directly into the provided
                    field.
                  </p>
                </div>
                <div className="electricity-item">
                  <FontAwesomeIcon
                    icon={faSlidersH}
                    size="2x"
                    className="electricity-icon"
                  />
                  <p>
                    Or use the slider to adjust the value. Both methods will
                    synchronize.
                  </p>
                </div>
              </div>
            </Modal>

            <div className="daily-usage-display">
              <p>
                Daily Electricity Usage:{" "}
                <strong>
                  {electricityUsage.usageDaily?.toFixed(2) || 0} kWh
                </strong>
              </p>
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
};

export default ElectricityUsage;
