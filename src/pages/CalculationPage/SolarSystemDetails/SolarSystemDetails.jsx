import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Slider, Tooltip, Input, Alert } from "antd";
import { DollarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { updateField } from "../../../reduxToolkit/slices/solarFormSlice";

import "./style.scss";

function SolarSystemDetails() {
  const dispatch = useDispatch();
  const solarSystemDetails = useSelector(
    (state) => state.solarForm.solarSystemDetails
  );

  const handleValueChange = (field, value) => {
    dispatch(updateField({ section: "solarSystemDetails", field, value }));
  };

  return (
    <div className="unique-solar-details">
      <h2>Solar Powerhouse Metrics</h2>
      <Alert
        message="Configure solar specifications to understand potential savings."
        type="info"
        showIcon
        className="instruction-alert"
      />
      <div className="input-section">
        <FontAwesomeIcon icon={faSun} className="icon" />
        <label>System Size</label>
        <Slider
          min={2}
          max={20}
          value={solarSystemDetails.systemSize}
          onChange={(value) => handleValueChange("systemSize", value)}
          tooltipVisible
          marks={{ 2: "2kW", 20: "20kW", 6.6: "6.6kW" }}
        />
        <p className="description">
          Use the slider to see energy produced and potential savings.
          Alternatively, use our calculator to determine panel needs.
        </p>
      </div>
      <div className="input-section">
        <DollarOutlined className="icon" />
        <label>System Cost</label>
        <Tooltip title="This includes your government solar rebate, GST, and installation costs. You can customize this in advanced options.">
          <Input
            value={solarSystemDetails.systemCost}
            onChange={(e) => handleValueChange("systemCost", e.target.value)}
            placeholder="Cost of Solar Panels"
            prefix="$"
          />
        </Tooltip>
      </div>
      <div className="input-section">
        <ClockCircleOutlined className="icon" />
        <label>Electricity Usage (8am - 6pm)</label>
        <Slider
          min={10}
          max={100}
          value={solarSystemDetails.electricityUsage}
          onChange={(value) => handleValueChange("electricityUsage", value)}
          tooltipVisible
          marks={{ 10: "10%", 100: "100%", 40: "40%" }}
        />
      </div>
    </div>
  );
}

export default SolarSystemDetails;
