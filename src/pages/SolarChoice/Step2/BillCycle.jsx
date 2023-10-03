import React, { useState, useEffect } from "react";
import { Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";

import {
  updateField,
  selectSolarForm,
} from "../../../reduxToolkit/slices/solarFormSlice";
import CustomLoadingSpinner from "../../../components/CustomLoadingSpinner/CustomLoadingSpinner";
import Joyride, { STATUS } from "react-joyride";
import NavigationButtons from "../../../components/NavigationButtons/NavigationButtons";

/**
 * Component to select billing cycle for electricity usage.
 * @param {function} nextStep - Function to move to the next step.
 * @param {function} previousStep - Function to move to the previous step.
 */
const BillCycle = ({ nextStep, previousStep }) => {
  // Component State
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [runTour, setRunTour] = useState(true);
  const [steps, setSteps] = useState([
    {
      target: ".bill-step-container",
      content:
        "Tell us if you receive your bill monthly, quarterly, or yearly. You can typically find this information in the Period section of your electricity bill.",
      placement: "top-start",
    },
    {
      target: ".MonthlyCycle",
      content: "Monthly means you're billed every month.",
      placement: "top-start",
    },
    {
      target: ".QuarterlyCycle",
      content: "Quarterly means every three months.",
      placement: "top",
    },

    {
      target: ".YearlyCycle",
      content: "Yearly means once a year.",
      placement: "left",
    },
  ]);
  // Redux
  const cycle = useSelector(selectSolarForm);
  const dispatch = useDispatch();
  const handleRadioClick = (selectedChoice) => {
    if (cycle.billingCycle?.cycle !== selectedChoice) {
      dispatch(
        updateField({
          section: "billingCycle",
          field: "cycle",
          value: selectedChoice,
        })
      );
      dispatch(
        updateField({
          section: "billingCycle",
          field: "isCompleted",
          value: true,
        })
      );
    }
    setShowError(false);
    handleClick(nextStep);
  };

  /**
   * Radio options for billing cycle selection.
   * @param {object} cycle - Current selected cycle from the store.
   * @param {function} dispatch - Redux dispatch function.
   */
  const BillingCycleOptions = ({ cycle, dispatch }) => (
    <Radio.Group
      className="bill-cycle-options"
      value={cycle.billingCycle?.cycle}
    >
      {["Monthly", "Quarterly", "Yearly"].map((choice) => (
        <div
          className={choice + "Cycle"}
          key={choice}
          data-testid={choice.toLowerCase() + "-cycle-container"}
        >
          <Radio.Button
            className="bill-cycle-option"
            value={choice.toLowerCase()}
            onClick={() => {
              handleRadioClick(choice.toLowerCase());
            }}
            data-testid={choice.toLowerCase() + "-cycle-option"}
          >
            <p>{choice}</p>
            <div className="choice-circle">
              {cycle.billingCycle?.cycle === choice.toLowerCase() && (
                <div className="choice-tick">✓</div>
              )}
            </div>
          </Radio.Button>
        </div>
      ))}
    </Radio.Group>
  );

  /**
   * Error message for when no billing cycle is selected.
   */
  const ErrorMessage = () => (
    <p className="error-message" data-testid="error-message">
      Please select a billing cycle before proceeding.
    </p>
  );

  /**
   * Handles the click event for both next and previous buttons.
   * @param {function} callback - Callback to execute on successful validation.
   */
  const handleClick = (callback) => {
    setShowError(false);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      callback();
    }, 2000); // Simulate loading state with 2 seconds delay
  };
  useEffect(() => {
    // Check if the user has visited the page before
    const firstTime = localStorage.getItem("firstTime");
    if (!firstTime) {
      setRunTour(true);
      localStorage.setItem("firstTime", "false");
    }
    const handleKeyPress = (event) => {
      // Checking for the arrow left key
      if (event.keyCode === 37) {
        handleClick(previousStep); // go to the previous step
      }
    };

    // Adding the event listener
    window.addEventListener("keydown", handleKeyPress);

    // Cleanup: remove the event listener when component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      setRunTour(false);
    }
  };
  return (
    <div className="bill-step">
      <h1>Electricity Usage</h1>

      {loading ? (
        <CustomLoadingSpinner />
      ) : (
        <div className="bill-step-container">
          <Joyride
            steps={steps}
            run={runTour}
            continuous={true}
            scrollToFirstStep={true}
            showProgress={true}
            showSkipButton={true}
            callback={handleJoyrideCallback}
            stepIndex={0}
          />
          <h2>Which is your billing cycle?</h2>

          <BillingCycleOptions cycle={cycle} dispatch={dispatch} />
          {showError && <ErrorMessage />}

          <NavigationButtons
            nextStep={nextStep}
            previousStep={previousStep}
            condition={cycle.billingCycle?.cycle}
            setShowError={setShowError}
            setLoading={setLoading}
          />
        </div>
      )}
    </div>
  );
};

export default BillCycle;
