import React from "react";
import { Slider, Spin, Button, InputNumber, Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faQuestionCircle,
  faLightbulb,
  faHandPointRight,
  faSlidersH,
} from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  updateField,
  selectSolarForm,
} from "../../../reduxToolkit/slices/solarFormSlice"; // Adjust path if necessary

function ElectricityUsage({ nextStep, previousStep }) {
  const { electricityUsage, billingCycle } = useSelector(selectSolarForm);
  const [isModalVisible, setModalVisible] = React.useState(false);

  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  const handleClick = (callback) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (callback && typeof callback === "function") {
        callback();
      }
    }, 2000);
  };
  const computeDailyUsage = (usageValue) => {
    let divisor;
    switch (billingCycle.cycle) {
      case "monthly":
        divisor = 30; // Assuming an average month has 30 days
        break;
      case "quarterly":
        divisor = 90; // Assuming an average quarter has 90 days
        break;
      case "yearly":
        divisor = 365;
        break;
      default:
        divisor = 1; // This ensures no division by zero in case of unexpected values
    }

    return usageValue / divisor;
  };
  const rangeUsage = (usageValue) => {
    let divisor;
    switch (billingCycle.cycle) {
      case "monthly":
        divisor = 30; // Assuming an average month has 30 days
        break;
      case "quarterly":
        divisor = 90; // Assuming an average quarter has 90 days
        break;
      case "yearly":
        divisor = 365;
        break;
      default:
        divisor = 1; // This ensures no division by zero in case of unexpected values
    }

    return ((usageValue / 365) * divisor).toFixed(0);
  };
  const handleUsageChange = (value) => {
    const dailyUsage = computeDailyUsage(value);

    // Update usageValue in the store
    dispatch(
      updateField({ section: "electricityUsage", field: "usageValue", value })
    );

    // Update usageDaily in the store
    dispatch(
      updateField({
        section: "electricityUsage",
        field: "usageDaily",
        value: dailyUsage,
      })
    );
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
              max={rangeUsage(8770)}
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
              <InputNumber
                min={1}
                max={rangeUsage(8770)}
                step={0.1}
                value={electricityUsage.usageValue}
                onChange={handleUsageChange}
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
}

export default ElectricityUsage;
