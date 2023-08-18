import React, { useState } from "react";
import { Input, Radio, Button } from "antd";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
const BillCycle = ({ nextStep, previousStep }) => {
  const [cycle, setCycle] = useState(null); // Store the selected bill-cycle

  return (
    <div className="bill-step-container">
      <h1>Tell Us About Your Electricity Usage</h1>

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
        onClick={previousStep}
        shape="circle"
      ></Button>
      <Button
        className="next-button"
        icon={<FontAwesomeIcon icon={faArrowRight} size="xs" />}
        onClick={nextStep}
        shape="circle"
      ></Button>
    </div>
  );
};

export default BillCycle;
