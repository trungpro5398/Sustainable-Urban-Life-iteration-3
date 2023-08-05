import React, { useState } from "react";
import { Steps, Button } from "antd";
import HouseholdDetails from "../HouseholdDetails/HouseholdDetails";
import SolarSystemDetails from "../SolarSystemDetails/SolarSystemDetails";
import BatteryStorageOptions from "../BatteryStorageOptions/BatteryStorageOptions";
// ... Import other step components ...
import "./style.scss";
const { Step } = Steps;

const steps = [
  { title: "Household Details", content: <HouseholdDetails /> },
  { title: "Solar System Details", content: <SolarSystemDetails /> },
  {
    title: "Battery Storage Options",
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
    <div>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={next}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => alert("All steps completed")}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={prev}>
            Previous
          </Button>
        )}
      </div>
    </div>
  );
}

export default SolarForm;
