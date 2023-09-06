// -------------------
// IMPORTS
// -------------------

// React Dependencies
import React, { useState, useEffect } from "react";

// Redux Dependencies
import { useDispatch, useSelector } from "react-redux";
import {
  updateField,
  selectSolarForm,
} from "../../../reduxToolkit/slices/solarFormSlice";

// UI Components & Icons
import { Slider, Spin, Button, Modal, message, Input, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faTree,
  faLightbulb,
  faWind,
  faSlidersH,
} from "@fortawesome/free-solid-svg-icons";
import Joyride, { STATUS } from "react-joyride";

// Styles
import "./style.scss";
import CustomLoadingSpinner from "../../../components/CustomLoadingSpinner/CustomLoadingSpinner";
import NavigationButtons from "../../../components/NavigationButtons/NavigationButtons";

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

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [runTour, setRunTour] = useState(true);
  const [steps, setSteps] = useState([
    {
      target: ".electricity-usage-slider",
      content:
        "You can also use the slider to indicate your electricity consumption.",
      placement: "top-start",
    },
    {
      target: ".electricity-usage-input-container",
      content:
        "You can also type in your electricity consumption in this field.",
      placement: "top",
    },
    {
      target: ".daily-usage-display",
      content:
        "This information will help us determine your daily electricity usage and determine which size of the solar system is suitable for you.",
      placement: "top",
    },
    {
      target: ".info-container-1",
      content:
        "2 kWh/day * 0.5 kg CO2/kWh = 1 kg of CO2 emissions per day. Now, to estimate the number of trees needed to offset 1 kg of CO2, we can use a rough approximation that a tree can absorb about 22 kg of CO2 per year.",
      placement: "top-start",
    },
    {
      target: ".info-container-2",
      content:
        "1 kg CO2 / 22 kg CO2 per tree per year ≈ 0.0455 trees per day. So, using these rough estimates, your daily electricity usage of 2 kWh might be equivalent to the emissions that would require roughly 0.0455 trees per day to offset",
      placement: "top",
    },
    {
      target: ".info-container-3",
      content:
        "For air conditioner using electricity kwh divide by 2.3kw to get how many hours can the daily usage supply an air conditioner",
      placement: "top",
    },
  ]);
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
  const CustomHandle = (props) => {
    const { value, dragging, index, ...restProps } = props;
    return (
      <Tooltip
        prefixCls="ant-tooltip"
        overlay={`${value} kWh`}
        visible={dragging}
        placement="top"
        key={index}
        overlayStyle={{ backgroundColor: "#28724d", color: "white" }} // Add this line
      >
        <Slider.Handle value={value} {...restProps} />
      </Tooltip>
    );
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
    if (electricityUsage.usageValue > 0) {
      dispatch(
        updateField({
          section: "electricityUsage",
          field: "isCompleted",
          value: true,
        })
      );
    }
    dispatch(
      updateField({
        section: "electricityUsage",
        field: "usageDaily",
        value: dailyUsage,
      })
    );
  };
  useEffect(() => {
    // Check if the user has visited the page before
    const firstTime = localStorage.getItem("firstTime");
    if (!firstTime) {
      setRunTour(true);
      localStorage.setItem("firstTime", "false");
    }

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

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      setRunTour(false);
    }
  };
  return (
    <div className="electricity-usage">
      <h1 className="step-title">Electricity Consumption</h1>
      {loading ? (
        <CustomLoadingSpinner />
      ) : (
        <div className="electricity-usage-step">
          <Joyride
            steps={steps}
            run={runTour}
            continuous={true}
            scrollToFirstStep={true}
            showProgress={true}
            showSkipButton={true}
            callback={handleJoyrideCallback}
          />
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
              handle={CustomHandle}
            />

            <div className="electricity-usage-size">Electricity usage</div>

            <div className="electricity-usage-input-container">
              <Input
                value={String(electricityUsage.usageValue)}
                onChange={(e) => handleUsageChange(e.target.value)}
                className="electricity-usage-input"
              />
              <div className="electricity-usage-unit">kWh</div>
            </div>

            <div className="daily-usage-display">
              <p>
                Daily Electricity Usage:{" "}
                <strong>
                  {electricityUsage.usageDaily?.toFixed(2) || 0} kWh
                </strong>
              </p>
            </div>
            {/* New Containers Section */}
            <div className="info-containers">
              {/* First Container - CO2 Emissions */}
              <div className="info-container info-container-1">
                <FontAwesomeIcon
                  icon={faLightbulb}
                  className="container-icon"
                />
                <span className="container-content">
                  <h3>CO2 Emissions</h3>
                  <p>
                    {(electricityUsage.usageDaily * 0.5).toFixed(2)} kg of CO2
                    emissions per day.
                  </p>
                </span>
              </div>

              {/* Second Container - Equivalent tree planting */}
              <div className="info-container info-container-2">
                <FontAwesomeIcon icon={faTree} className="container-icon" />{" "}
                <span className="container-content">
                  <h3>Equivalent tree planting</h3>
                  <p>
                    {((electricityUsage.usageDaily * 0.5) / 22).toFixed(4)} per
                    day.
                  </p>
                </span>
                {/* Using a tree icon for this section */}
              </div>

              {/* Third Container - Air Conditioner Hours */}
              <div className="info-container info-container-3">
                <FontAwesomeIcon icon={faWind} className="container-icon" />{" "}
                <span className="container-content">
                  <h3>Air Conditioner Hours</h3>
                  <p>{(electricityUsage.usageDaily / 2.3).toFixed(2)} hours.</p>
                </span>
                {/* Using a wind (or fan) icon for AC context */}
              </div>
            </div>
          </div>

          {loading && (
            <div className="loading-section">
              <Spin />
              <p>Loading...</p>
            </div>
          )}

          <NavigationButtons
            nextStep={nextStep}
            previousStep={previousStep}
            condition={true}
            setShowError={null}
            setLoading={setLoading}
          />
        </div>
      )}
    </div>
  );
};

export default ElectricityUsage;
