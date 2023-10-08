import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBatteryThreeQuarters } from "@fortawesome/free-solid-svg-icons";
import { updateField } from "../../../reduxToolkit/slices/solarFormSlice"; // Adjust this path to your project's directory structure
import "./style.scss";
import CustomLoadingSpinner from "../../../components/CustomLoadingSpinner/CustomLoadingSpinner";
import NavigationButtons from "../../../components/NavigationButtons/NavigationButtons";
import { updateFieldAsync } from "../../../reduxToolkit/Thunks/solarFormThunks";
import { Tabs, Descriptions, Radio, Button, message } from "antd";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

const { TabPane } = Tabs;
const AGLEligibilityQuestions = [
  {
    question:
      "Do you have a reliable and ongoing internet connection via ethernet or Wi-Fi?",
    key: "internetConnection",
  },
  {
    question:
      "Do you have an operating solar system or are you in the process of buying one as part of a solar battery bundle?",
    key: "solarSystem",
  },
  {
    question:
      "Do you have or are you in the process of buying a compatible Tesla Powerwall, SolarEdge Energy Bank, or LG Home Battery with a compatible SolarEdge inverter?",
    key: "compatibleBattery",
  },
  {
    question:
      "Are you currently a part of another Virtual Power Plant, or are you able to change if you are?",
    key: "vppParticipation",
  },
  {
    question:
      "Do you have a smart meter installed at your premise or agree to have one installed?",
    key: "smartMeter",
  },
];

const TeslaEligibilityQuestions = [
  {
    question:
      "Do you have an existing Tesla Powerwall (excluding Powerwall 1) or are you planning to purchase one?",
    key: "powerwallOwnershipTes",
  },
  {
    question:
      "Are you a residential customer residing in an eligible Tesla Energy Plan region?",
    key: "residencyTes",
  },
  {
    question: "Do you have a reliable internet connection (Wi-Fi or Ethernet)?",
    key: "internetConnectionTes",
  },
  {
    question:
      "Do you have a smart meter installed at your home or agree to have one installed at no cost?",
    key: "smartMeterTes",
  },
  {
    question:
      "Do you have an operating solar system under 15 kW per Powerwall, with no zero export restrictions in place?",
    key: "solarSystemTes",
  },
];

/**
 * BatteryChoice Component
 *
 * This component allows users to decide if they want to add a solar battery to their system
 * and choose the size of the battery.
 */
const BatteryChoice = ({ nextStep, previousStep }) => {
  // -------------------
  // REDUX STATE MANAGEMENT
  // -------------------
  const dispatch = useDispatch();
  const batteryChoice = useSelector((state) => state.solarForm.batteryChoice);
  // -------------------
  // LOCAL STATE MANAGEMENT
  // -------------------
  const [loading, setLoading] = useState(false);

  const [showError, setShowError] = useState(false);

  const [answers, setAnswers] = useState({
    selectedTab: "AGL", // Set default value to "AGL"
  });
  const [showQuiz, setShowQuiz] = useState(false);

  const [eligibilityResult, setEligibilityResult] = useState(null);
  const [aglSubmitted, setAglSubmitted] = useState(false);
  const [teslaSubmitted, setTeslaSubmitted] = useState(false);

  const handleAnswer = (key, answer) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [key]: answer }));
  };

  const handleSubmit = () => {
    const relevantAnswers = { ...answers };
    delete relevantAnswers.selectedTab; // Remove the selectedTab key-value pair

    const yesCount = Object.values(relevantAnswers).filter(
      (answer) => answer === "Yes"
    ).length;
    const allValidAnswers = Object.values(relevantAnswers).every((answer) =>
      ["Yes", "No"].includes(answer)
    );

    const eligible = yesCount === 5 && allValidAnswers;

    const currentEligibility = eligible ? "eligible" : "not eligible";
    setEligibilityResult(currentEligibility);
  };
  const handleAglSubmit = () => {
    handleSubmit();
    setAglSubmitted(true);
  };

  const handleTeslaSubmit = () => {
    handleSubmit();
    setTeslaSubmitted(true);
  };

  /**
   * Handle individual radio button click events.
   *
   * @param {string} selectedChoice - The clicked choice ("Yes" or "No").
   */
  const handleRadioClick = (selectedChoice) => {
    // Update local and Redux states
    handleChoiceChange(selectedChoice);

    // Proceed to the next step regardless of the choice being already selected
    handleClick(nextStep);
  };
  /**
   * Handles button click and loading animation,
   * then calls the provided callback after a delay.
   *
   * @param {Function} callback - The callback to be executed after loading
   */
  const handleClick = (callback) => {
    setShowError(false);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      callback();
    }, 2000); // Simulate loading state with 2 seconds delay
  };

  /**
   * Update the local state and the Redux store when battery choice changes.
   *
   * @param {string} newChoice - The choice value ("Yes" or "No").
   */
  const handleChoiceChange = async (newChoice) => {
    try {
      await dispatch(
        updateFieldAsync({
          section: "batteryChoice",
          field: "wantBattery",
          value: newChoice,
        })
      );
      await dispatch(
        updateFieldAsync({
          section: "batteryChoice",
          field: "isCompleted",
          value: true,
        })
      );
      setShowError(false);
    } catch (error) {
      console.error("Error updating Redux store:", error);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Checking for the arrow right key

      if (event.keyCode === 39) {
        handleClick(nextStep); // go to the next step
      }

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

  return (
    <div className="battery-choice">
      <h2 className="step-title">Battery choice</h2>

      {loading ? (
        <CustomLoadingSpinner />
      ) : (
        <div className="battery-choice-container">
          <div className="battery-choice-step-container">
            <div className="battery-choice-step">
              <div className="battery-query">
                <FontAwesomeIcon icon={faBatteryThreeQuarters} size="2x" />
                <span>Do you want to add a solar battery to your system?</span>
              </div>
              <Radio.Group
                className="battery-choice-options"
                value={batteryChoice?.wantBattery}
              >
                {["No", "Yes"].map((option) => (
                  <div data-testid={option + "-option"} key={option}>
                    <Radio.Button
                      className="battery-choice-option"
                      value={option}
                      key={option}
                      onClick={() => handleRadioClick(option)}
                    >
                      <p>{option}</p>
                      <div className="choice-circle">
                        {batteryChoice?.wantBattery === option && (
                          <div className="choice-tick">✓</div>
                        )}
                      </div>
                    </Radio.Button>
                  </div>
                ))}
              </Radio.Group>

              {showError && (
                <p className="error-message">
                  Please select Yes or No before proceeding.
                </p>
              )}

              <NavigationButtons
                nextStep={nextStep}
                previousStep={previousStep}
                condition={batteryChoice.wantBattery}
                setShowError={setShowError}
                setLoading={setLoading}
              />
            </div>
            {!showQuiz && (
              <button className="info-button" onClick={() => setShowQuiz(true)}>
                <FontAwesomeIcon icon={faQuestionCircle} />
                Have you heard about the virtual power plan?
              </button>
            )}
          </div>
          {showQuiz && (
            <Tabs
              defaultActiveKey="AGL"
              onChange={(key) => setAnswers({ ...answers, selectedTab: key })}
              className="battery-choice-tabs"
            >
              <TabPane
                tab={<span style={{ fontSize: "20px" }}>AGL</span>}
                key="AGL"
              >
                {aglSubmitted ? (
                  <div className="result-container">
                    <div className="green-circle">
                      <div className="white-tick">✓</div>
                    </div>
                    <p>You are {eligibilityResult} for the AGL VPP.</p>
                  </div>
                ) : (
                  <div className="tabPanel">
                    <h3>Description</h3>
                    <p>
                      AGL's Virtual Power Plant (VPP) is an innovative program
                      that links together solar energy systems and batteries
                      from homes across Australia. By joining this network,
                      participants can store excess solar power in their home
                      battery and then discharge it back to the grid when it's
                      needed most. This helps to stabilize the grid, reduce
                      energy costs, and support a more sustainable energy
                      future. Plus, participants can enjoy potential savings on
                      their energy bills. With reliable internet, an operating
                      solar system, a compatible battery, and a smart meter, you
                      can potentially be part of this cutting-edge energy
                      solution.
                    </p>
                    <h3>Elgible Quiz</h3>

                    {AGLEligibilityQuestions.map((q, index) => (
                      <div className="question" key={index}>
                        <p>{q.question}</p>
                        <div className="button-group">
                          <button
                            onClick={() => {
                              handleAnswer(q.key, "Yes");
                            }}
                            className={
                              answers[q.key] === "Yes" ? "selected" : ""
                            }
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => {
                              handleAnswer(q.key, "No");
                            }}
                            className={
                              answers[q.key] === "No" ? "selected" : ""
                            }
                          >
                            No
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={handleAglSubmit}
                      style={{ marginTop: "20px" }}
                      className="buttonSubmit"
                    >
                      Submit
                    </button>
                  </div>
                )}
              </TabPane>
              <TabPane
                tab={<span style={{ fontSize: "20px" }}>TESLA</span>}
                key="TESLA"
              >
                {teslaSubmitted ? (
                  <div className="result-container">
                    <div className="green-circle">
                      <div className="white-tick">✓</div>
                    </div>
                    <p>You are {eligibilityResult} for the TESLA VPP.</p>
                  </div>
                ) : (
                  <div className="tabPanel">
                    <h3>Description</h3>

                    <p>
                      Tesla's Virtual Power Plant (VPP) is a transformative
                      program leveraging the combined power of individual
                      Powerwalls to create a connected energy network. This
                      innovative system allows homeowners to store surplus solar
                      energy and release it back to the grid during peak demand.
                      By doing so, it helps to stabilize the energy grid, reduce
                      dependence on traditional power stations, and potentially
                      lower energy costs for participants. Moreover, Tesla VPP
                      participants are actively championing a more sustainable
                      and renewable energy future, contributing to reduced
                      greenhouse gas emissions and improved climate health.
                      Powerwall Ownership
                    </p>
                    <h3>Elgible Quiz</h3>

                    {TeslaEligibilityQuestions.map((q, index) => (
                      <div className="question" key={index}>
                        <p>{q.question}</p>
                        <div className="button-group">
                          <button
                            onClick={() => {
                              handleAnswer(q.key, "Yes");
                            }}
                            className={
                              answers[q.key] === "Yes" ? "selected" : ""
                            }
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => {
                              handleAnswer(q.key, "No");
                            }}
                            className={
                              answers[q.key] === "No" ? "selected" : ""
                            }
                          >
                            No
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={handleTeslaSubmit}
                      type="primary"
                      style={{ marginTop: "20px" }}
                    >
                      Submit
                    </button>
                  </div>
                )}
              </TabPane>
            </Tabs>
          )}
        </div>
      )}
    </div>
  );
};

export default BatteryChoice;
