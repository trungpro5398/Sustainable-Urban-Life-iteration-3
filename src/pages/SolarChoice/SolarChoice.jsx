import "./style.scss";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Spin } from "antd";

import FirstStep from "./Step1/FirstStep";
import BillCycle from "./Step2/BillCycle";
import ElectricityUsage from "./Step3/ElectricityUsage";
import LocationStep from "./Step4/LocationStep";
import PostcodeInfo from "./Step5/PostcodeInfo";
import BatteryChoice from "./Step6/BatteryChoice";
import Recommendation from "./Step7/Recommendation";
import Navbar from "../../components/Navbar/Navbar";

import { updateField } from "../../reduxToolkit/slices/solarFormSlice";

/**
 * SolarChoice Component
 * This is a multi-step form for users to make solar-related decisions. Each step corresponds to
 * a different part of the user's decision-making process, such as selecting a battery, defining
 * the billing cycle, and more.
 */
const SolarChoice = () => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(4);
  const [isLoading, setIsLoading] = useState(true);
  const [locationData, setLocationData] = useState(null);

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

  return (
    <div className="solar-choice-page">
      <Navbar isHomePage={false} />

      {isLoading ? (
        <div className="loading-container">
          <Spin size="large" tip="Charging solar energy..." />
        </div>
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
        </>
      )}
    </div>
  );
};

export default SolarChoice;
