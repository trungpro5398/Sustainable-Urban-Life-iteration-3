import React, { useState } from "react";
import FirstStep from "./Step1/FirstStep";
import InformationStep from "./Step2/InformationStep";
import BillCycle from "./Step3/BillCycle";
import ElectricityUsage from "./Step4/ElectricityUsage";
import LocationStep from "./Step5/LocationStep";
import PostcodeInfo from "./Step6/PostcodeInfo";
import BatteryChoice from "./Step7/BatteryChoice";
import Recommendation from "./Step8/Recommendation";

function SolarChoice() {
  const [step, setStep] = useState(8);

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
      {step === 5 && (
        <LocationStep
          previousStep={handlePreviousStep}
          nextStep={handleNextStep}
        />
      )}
      {step === 6 && (
        <PostcodeInfo
          previousStep={handlePreviousStep}
          nextStep={handleNextStep}
        />
      )}
      {step === 7 && (
        <BatteryChoice
          previousStep={handlePreviousStep}
          nextStep={handleNextStep}
        />
      )}
      {step === 8 && <Recommendation previousStep={handlePreviousStep} />}
    </div>
  );
}

export default SolarChoice;
