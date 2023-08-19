import React, { useState } from "react";
import { Input, Radio, Button, Spin } from "antd";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
const BillCycle = ({ nextStep, previousStep }) => {
  const [cycle, setCycle] = useState(null); // Store the selected bill-cycle
  const [loading, setLoading] = useState(false);

  const handleClick = (callback) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (callback && typeof callback === "function") {
        callback();
      }
    }, 2000); // Wait for 2 seconds before invoking the callback
  };
  return (
    <div className="bill-step">
      <h1>Tell Us About Your Electricity Usage</h1>

      {loading ? (
        <div className="loading-container">
          <Spin size="large" tip="Preparing your solar journey..."></Spin>
        </div>
      ) : (
        <div className="bill-step-container">
          <Radio.Group
            className="bill-cycle-options"
            onChange={(e) => setCycle(e.target.value)}
            value={cycle}
          >
            <Radio.Button className="bill-cycle-option" value="monthly">
              <p>Monthly</p>
              <div className="choice-circle">
                {cycle === "monthly" && <div className="choice-tick">✓</div>}
              </div>
            </Radio.Button>
            <Radio.Button className="bill-cycle-option" value="quarterly">
              <p>Quarterly</p>
              <div className="choice-circle">
                {cycle === "quarterly" && <div className="choice-tick">✓</div>}
              </div>
            </Radio.Button>
            <Radio.Button className="bill-cycle-option" value="yearly">
              <p>Yearly</p>
              <div className="choice-circle">
                {cycle === "yearly" && <div className="choice-tick">✓</div>}
              </div>
            </Radio.Button>
          </Radio.Group>
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

export default BillCycle;
