import React, { useState } from "react";
import { Steps, Button } from "antd";
import HouseholdDetails from "../HouseholdDetails/HouseholdDetails";
import SolarSystemDetails from "../SolarSystemDetails/SolarSystemDetails";
import BatteryStorageOptions from "../BatteryStorageOptions/BatteryStorageOptions";
import { HomeOutlined, BatteryFullOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSun,
  faBatteryFull,
} from "@fortawesome/free-solid-svg-icons";

import { Progress } from "antd";
import { RightOutlined, LeftOutlined, CheckOutlined } from "@ant-design/icons";

// ... Import other step components ...
import "./style.scss";
const { Step } = Steps;

const steps = [
  {
    title: "Household Details",
    description: "Provide your home details",
    icon: <FontAwesomeIcon icon={faHome} />,
    content: <HouseholdDetails />,
  },
  {
    title: "Solar System Details",
    description: "Configure your solar system",
    icon: <FontAwesomeIcon icon={faSun} />,
    content: <SolarSystemDetails />,
  },
  {
    title: "Battery Storage Options",
    description: "Choose your battery options",
    icon: <FontAwesomeIcon icon={faBatteryFull} />,
    content: <BatteryStorageOptions />,
  },
  // ... Other steps ...
];

function SolarForm() {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div className="steps-big-container">
      <div className="progress-indicator">
        <Progress
          percent={((100 / steps.length) * (current + 1)).toFixed(0)}
          strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
        />
      </div>
      <Steps current={current}>
        {steps.map((item) => (
          <Step
            key={item.title}
            title={item.title}
            description={item.description}
            icon={item.icon}
          />
        ))}
      </Steps>

      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={next} icon={<RightOutlined />}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => alert("All steps completed")}
            icon={<CheckOutlined />}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button onClick={prev} icon={<LeftOutlined />}>
            Previous
          </Button>
        )}
      </div>
    </div>
  );
}

export default SolarForm;
