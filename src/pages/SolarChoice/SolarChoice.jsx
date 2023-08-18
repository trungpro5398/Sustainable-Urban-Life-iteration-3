import React, { useState } from "react";
import FirstStep from "./Step1/FirstStep";
import InformationStep from "./Step2/InformationStep";
import BillCycle from "./Step3/BillCycle";
import ElectricityUsage from "./Step4/ElectricityUsage";

function SolarChoice() {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="solar-choice-page">
      {step === 1 && <FirstStep nextStep={handleNextStep} />}
      {step === 2 && (
        <InformationStep
          previousStep={handlePreviousStep}
          nextStep={handleNextStep}
        />
      )}
      {step === 3 && (
        <BillCycle
          previousStep={handlePreviousStep}
          nextStep={handleNextStep}
        />
      )}
      {step === 4 && (
        <ElectricityUsage
          previousStep={handlePreviousStep}
          nextStep={handleNextStep}
        />
      )}
      {/* ...other steps */}
    </div>
  );
}

export default SolarChoice;
