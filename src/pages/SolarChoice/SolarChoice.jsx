import "./style.scss";

import React, { useState, useEffect } from "react";
import FirstStep from "./Step1/FirstStep";
import InformationStep from "./Step2/InformationStep";
import BillCycle from "./Step3/BillCycle";
import ElectricityUsage from "./Step4/ElectricityUsage";
import LocationStep from "./Step5/LocationStep";
import PostcodeInfo from "./Step6/PostcodeInfo";
import BatteryChoice from "./Step7/BatteryChoice";
import Recommendation from "./Step8/Recommendation";
import Navbar from "../../components/Navbar/Navbar";
import { Steps } from "antd";
import { Spin } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { updateField } from "../../reduxToolkit/slices/solarFormSlice";

const { Step } = Steps;
function SolarChoice() {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const steps = [
    "Start",
    "Information",
    "Bill Cycle",
    "Electricity Usage",
    "Location",
    "Postcode Info",
    "Battery Choice",
    "Recommendation",
  ];
  const [locationData, setLocationData] = useState(null);
  // Fetching the data when the component mounts

  useEffect(() => {
    // Fetching data for withBattery
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

    // Fetching data for withoutBattery
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
    fetch(
      "https://sustainable-urban-life-backend.onrender.com/api/solar_energy/sub_info"
    )
      .then((response) => response.json())
      .then((data) => {
        setLocationData(data);
        setIsLoading(false);
      });
  }, []);

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };
  return (
    <div className="solar-choice-page">
      <Navbar isHomePage={false} />
      {step === 1 && <FirstStep nextStep={handleNextStep} />}

      {isLoading ? (
        <div className="loading-container">
          {/* Use a custom icon for the Spin component */}
          <Spin size="large" tip="Charging solar energy..."></Spin>
        </div>
      ) : (
        <>
          {/* {step === 2 && (
            <InformationStep
              previousStep={handlePreviousStep}
              nextStep={handleNextStep}
            />
          )} */}
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
}

export default SolarChoice;
