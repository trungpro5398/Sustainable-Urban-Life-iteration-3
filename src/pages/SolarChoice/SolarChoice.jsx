import "./style.scss";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Progress, Modal, Steps } from "antd";

import FirstStep from "./Step1/FirstStep";
import BillCycle from "./Step2/BillCycle";
import ElectricityUsage from "./Step3/ElectricityUsage";
import LocationStep from "./Step4/LocationStep";
import PostcodeInfo from "./Step5/PostcodeInfo";
import BatteryChoice from "./Step6/BatteryChoice";
import Recommendation from "./Step7/Recommendation";
import Navbar from "../../components/Navbar/Navbar";

import { updateField } from "../../reduxToolkit/slices/solarFormSlice";
import CustomLoadingSpinner from "../../components/CustomLoadingSpinner/CustomLoadingSpinner";
import { useSelector } from "react-redux";
import { selectSolarForm } from "../../reduxToolkit/slices/solarFormSlice";
import Quiz from "./Step8/Quiz";

const { Step } = Steps;
const { confirm } = Modal;
/**
 * SolarChoice Component
 * This is a multi-step form for users to make solar-related decisions. Each step corresponds to
 * a different part of the user's decision-making process, such as selecting a battery, defining
 * the billing cycle, and more.
 */
const SolarChoice = () => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [locationData, setLocationData] = useState(null);
  const solarForm = useSelector(selectSolarForm);
  const stepNames = [
    "Introduction",
    "Billing Cycle",
    "Electricity Usage",
    "Location",
    "Postcode Info",
    "Battery Choice",
    "Recommendation",
    "Quiz",
  ];

  /**
   * Fetches necessary data when the component mounts and dispatches it to Redux store.
   * The data includes:
   * - Solar pricing with a battery.
   * - Solar pricing without a battery.
   * - Location-related data.
   */
  useEffect(() => {
    // Fetch data for solar packages with battery
    fetch(
      "https://sustainable-urban-life-backend.onrender.com/api/solar_energy/solar_package_wb"
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(
          updateField({
            section: "pricing",
            field: "withBattery",
            value: data,
          })
        );
      });

    // Fetch data for solar packages without battery
    fetch(
      "https://sustainable-urban-life-backend.onrender.com/api/solar_energy/solar_package_wob"
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(
          updateField({
            section: "pricing",
            field: "withoutBattery",
            value: data,
          })
        );
      });

    // Fetch data for location-related information
    fetch(
      "https://sustainable-urban-life-backend.onrender.com/api/solar_energy/sub_info"
    )
      .then((response) => response.json())
      .then((data) => {
        setLocationData(data);
        setIsLoading(false);
      });
  }, []);

  // Handles navigation to the next step in the form
  const handleNextStep = () => setStep((prevStep) => prevStep + 1);

  // Handles navigation to the previous step in the form
  const handlePreviousStep = () => setStep((prevStep) => prevStep - 1);

  const handleStepChange = (currentStep) => {
    // You can add more specific conditions here
    // if (currentStep > 1 && !stepCompletionStatus[currentStep - 1]) {
    //   alert("Please complete the current step first!");
    //   return;
    // }
    const stepConditionsMet = () => {
      if (currentStep === 4 && !solarForm.location.suburb) {
        alert("Please complete the location details first!");
        return false;
      }

      if (currentStep === 6 && !solarForm.batteryChoice.wantBattery) {
        alert("Please choose a battery option first!");
        return false;
      }

      return true;
    };

    // Confirm user's action before changing step
    confirm({
      title: "Do you want to move to this step?",
      content:
        "Make sure you have saved or noted any important information from the current step.",
      onOk() {
        if (stepConditionsMet()) {
          setStep(currentStep + 1); // Adjust based on your indexing
        }
      },
      onCancel() {},
    });
  };

  const stepCompletionStatus = [
    true,
    solarForm.billingCycle.cycle,
    solarForm.electricityUsage.usageValue,
    solarForm.location.suburb,
    solarForm.postcodeInfo.data,
    solarForm.batteryChoice.wantBattery,
    true,
    true,
  ];
  return (
    <div className="solar-choice-page">
      <Navbar isHomePage={false} />
      {/* Add Steps */}
      <div className="steps-container">
        <Steps current={step - 1} onChange={handleStepChange}>
          {stepCompletionStatus.map((isComplete, index) => (
            <Step
              key={index}
              title={isComplete ? "Completed" : "Pending"}
              description={stepNames[index]}
              className={step - 1 === index ? "active-step" : "inactive-step"}
            />
          ))}
        </Steps>
      </div>

      {isLoading ? (
        <CustomLoadingSpinner />
      ) : (
        <>
          {step === 1 && <FirstStep nextStep={handleNextStep} />}
          {step === 2 && (
            <BillCycle
              previousStep={handlePreviousStep}
              nextStep={handleNextStep}
            />
          )}
          {step === 3 && (
            <ElectricityUsage
              previousStep={handlePreviousStep}
              nextStep={handleNextStep}
            />
          )}
          {step === 4 && (
            <LocationStep
              data={locationData}
              previousStep={handlePreviousStep}
              nextStep={handleNextStep}
            />
          )}
          {step === 5 && (
            <PostcodeInfo
              data={locationData}
              previousStep={handlePreviousStep}
              nextStep={handleNextStep}
            />
          )}
          {step === 6 && (
            <BatteryChoice
              previousStep={handlePreviousStep}
              nextStep={handleNextStep}
            />
          )}
          {step === 7 && <Recommendation previousStep={handlePreviousStep} />}
          {step === 8 && <Quiz previousStep={handlePreviousStep} />}
        </>
      )}
    </div>
  );
};

export default SolarChoice;
