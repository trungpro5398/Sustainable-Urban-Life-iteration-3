import "./style.scss";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Progress, Modal, Steps } from "antd";
import FirstStep from "./Step1/FirstStep";
import BillCycle from "./Step2/BillCycle";
import ElectricityUsage from "./Step3/ElectricityUsage";
import LocationStep from "./Step4/LocationStep";
import PostcodeInfo from "./Step5/PostcodeInfo";
import BatteryChoice from "./Step6/BatteryChoice";
import Recommendation from "./Step7/Recommendation";
import Quiz from "./Step9/Quiz";

import Navbar from "../../components/Navbar/Navbar";

import CustomLoadingSpinner from "../../components/CustomLoadingSpinner/CustomLoadingSpinner";
import { selectSolarForm } from "../../reduxToolkit/slices/solarFormSlice";
import AnnualBillSavings from "./Step8/AnnualBillSavings";

import { fetchInitialData } from "./dataFetcher.js";
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
  const locationData = useSelector((state) => state.solarForm.location.data);

  const solarForm = useSelector(selectSolarForm);
  const stepNames = [
    "Introduction",
    "Billing Cycle",
    "Electricity Usage",
    "Location",
    "Postcode Info",
    "Battery Choice",
    "Recommendation",
    "Annual Bill Savings",
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
    const fetchData = async () => {
      try {
        await fetchInitialData(dispatch);
        setIsLoading(false);
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  // Handles navigation to the previous step in the form
  const handlePreviousStep = () => setStep((prevStep) => prevStep - 1);

  const canProceedToStep = (targetStep) => {
    let conditionMet = true;
    const stepsToBounce = [];

    // Conditions
    if (targetStep === 2 && !solarForm.billingCycle.isCompleted) {
      stepsToBounce.push(1);
      conditionMet = false;
    }
    if (targetStep === 4 && !solarForm.location.isCompleted) {
      stepsToBounce.push(3);
      conditionMet = false;
    }
    if (targetStep === 5 && !solarForm.location.isCompleted) {
      stepsToBounce.push(3);
      conditionMet = false;
    }
    if (targetStep === 6 && !solarForm.batteryChoice.isCompleted) {
      stepsToBounce.push(5);
      conditionMet = false;
    }
    if (targetStep === 7 && !solarForm.location.isCompleted) {
      stepsToBounce.push(3);
      conditionMet = false;
    }
    if (targetStep === 7 && !solarForm.pricing.isCompleted) {
      stepsToBounce.push(6);
      conditionMet = false;
    }
    if (targetStep === 8) {
      if (!solarForm.location.isCompleted) {
        stepsToBounce.push(3);
        conditionMet = false;
      }
      if (!solarForm.batteryChoice.isCompleted) {
        stepsToBounce.push(5);
        conditionMet = false;
      }
      // Assuming you will have some logic to check if step 7 is completed
      if (targetStep === 7 && !solarForm.pricing.isCompleted) {
        stepsToBounce.push(6);
        conditionMet = false;
      }
    }

    // Bounce animation logic
    stepsToBounce.forEach((step) => {
      const stepElement = document.querySelector(
        `.ant-steps-item.step-item-${step}`
      );

      if (stepElement) {
        stepElement.classList.add("bounce-animation");

        setTimeout(() => {
          stepElement.classList.remove("bounce-animation");
        }, 10000);
      }
    });

    return conditionMet;
  };

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleStepChange = (currentStep) => {
    confirm({
      title: "Do you want to move to this step?",
      content:
        "Make sure you have saved or noted any important information from the current step.",
      onOk() {
        if (canProceedToStep(currentStep)) {
          setStep(currentStep + 1); // Adjust based on your indexing
        }
      },
      onCancel() {},
    });
  };
  // Compute status for each step
  const computeStepStatus = (isComplete, index) => {
    if (step - 1 === index) return "process"; // Current step
    return isComplete ? "finish" : "wait";
  };

  const stepCompletionStatus = [
    true,
    solarForm.billingCycle.isCompleted,
    solarForm.electricityUsage.isCompleted,
    solarForm.location.isCompleted,
    solarForm.postcodeInfo.isCompleted,
    solarForm.batteryChoice.isCompleted,
    solarForm.pricing.isCompleted,
    solarForm.annualBillSavings.isCompleted,
    solarForm.rebate.isCompleted,
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
              status={computeStepStatus(isComplete, index)}
              description={stepNames[index]}
              data-testid={`step-item-${index}`}
              className={`step-item-${index} ${
                step - 1 === index ? "active-step" : "inactive-step"
              }`}
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

          {step === 7 && (
            <Recommendation
              previousStep={handlePreviousStep}
              nextStep={handleNextStep}
            />
          )}
          {step === 8 && (
            <AnnualBillSavings
              previousStep={handlePreviousStep}
              nextStep={handleNextStep}
            />
          )}
          {step === 9 && <Quiz previousStep={handlePreviousStep} />}
        </>
      )}
    </div>
  );
};

export default SolarChoice;
