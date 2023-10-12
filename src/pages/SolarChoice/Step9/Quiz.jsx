import React, { useState, useEffect } from "react";
import "./style.scss";
import CustomLoadingSpinner from "../../../components/CustomLoadingSpinner/CustomLoadingSpinner";
import { Button, Progress } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
// Redux Actions
import { useSelector, useDispatch } from "react-redux";

import { updateField } from "../../../reduxToolkit/slices/solarFormSlice";
import CalculatedLoading from "../../../components/CalculatedLoading/CalculatedLoading";

const Quiz = ({ previousStep }) => {
  const questions = [
    "Are you the owner-occupier of an existing property where the solar panel (PV) system is to be installed or the owner of a home currently under construction where the solar panel (PV) system is to be installed?",
    "Does the combined taxable income of all the owners of the house amount to less than $210,000 per year?",
    "Have you or any other owner-occupier of the property received a solar panel (PV) rebate or solar battery rebate under the Solar Homes Program in the past?",
    "Is the market value of the property less than $3 million, or if the home is under construction, will it be valued at less than $3 million upon completion?",
    "Has the property address ever received a solar panel (PV) rebate or a solar battery rebate under the Solar Homes Program in the past?",
    "Has a solar panel (PV) system been installed in the property after 1 November 2009?",
  ];
  const dispatch = useDispatch();

  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errorIndices, setErrorIndices] = useState([]);
  const totalQuestions = questions.length;
  const [showInstallationForm, setShowInstallationForm] = useState(false);
  const [showRebateResults, setShowRebateResults] = useState(false);

  const solarFormData = useSelector((state) => state.solarForm);
  const [installationYear, setInstallationYear] = useState(null);
  const [victorianRebate, setVictorianRebate] = useState(1400); // default value
  const [federalRebate, setFederalRebate] = useState(null);
  const price_installation = solarFormData.rebate.price_installation; // Replace with actual value
  const yearlySaving = solarFormData.annualBillSavings.yearlySaving; // Replace with actual value
  const calculateRebate = () => {
    dispatch(
      updateField({
        section: "annualBillSavings",
        field: "isCompleted",
        value: true,
      })
    );

    const solarPowerSystem = solarFormData.annualBillSavings.solarPowerSystem;
    const totalSolarArrayCombinedWattage = parseFloat(
      solarPowerSystem.replace("kw", "")
    );

    const rating = solarFormData.rebate.zone_rating.filter(
      (zone) => zone.Postcode === solarFormData.location.postcode
    )[0].Rating;

    const STCValue = totalSolarArrayCombinedWattage * rating * 10;

    let yearlyMarketValuation = 0;
    if (installationYear <= 2032) {
      const yearlyData = solarFormData.rebate.yearly_market_valuation.filter(
        (year) => year.year === installationYear
      )[0];

      // Make sure yearlyData exists before trying to access its properties to avoid errors.
      if (yearlyData) {
        yearlyMarketValuation = yearlyData.yaerly_market_valuation;
      } else {
        // Handle the scenario where yearlyData might not exist for the installationYear even if it's <= 2023
        console.warn(`Data for the year ${installationYear} is not available.`);
      }
    }

    const federalRebateValue = STCValue * yearlyMarketValuation;
    setFederalRebate(federalRebateValue);
  };

  const handleAnswer = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
    if (errorIndices.includes(index)) {
      setErrorIndices(errorIndices.filter((e) => e !== index));
    }
  };

  useEffect(() => {
    if (result === "Eligible for the Victoria solar rebate") {
      setVictorianRebate(1400);
    } else {
      setVictorianRebate(0);
    }
  }, [result]); // This useEffect will run every time 'result' changes
  /**
   * Smoothly scrolls the view to the "results" section of the page.
   */
  const handleButtonClickToResult = (id) => {
    console.log("Trying to scroll to: ", id); // Add this line
    const resultsMove = document.getElementById(id);
    if (resultsMove) {
      resultsMove.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = () => {
    // Identifying unanswered questions
    const errorList = answers
      .map((answer, index) => (answer === null ? index : null))
      .filter((index) => index !== null);

    // Set the errorIndices
    setErrorIndices(errorList);

    // If there are unanswered questions, don't proceed further
    if (errorList.length > 0) return;

    setShowInstallationForm(true);

    if (
      answers[0] === "Yes" &&
      answers[1] === "Yes" &&
      answers[2] === "No" &&
      answers[3] === "Yes" &&
      answers[4] === "No" &&
      answers[5] === "No"
    ) {
      setResult("Eligible for the Victoria solar rebate");
    } else {
      setResult("Not eligible for the Victoria solar rebate");
    }
    setTimeout(handleButtonClickToResult("installation-year"), 10); // introducing slight delay
  };

  /**
   * Handles the click event for both next and previous buttons.
   * @param {function} callback - Callback to execute on successful validation.
   */
  const handleClick = (callback) => {
    // setLoading(true);
    setIsLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsLoading(false);
      setShowRebateResults(true);
      setTimeout(handleButtonClickToResult("rebate-results-scroll"), 50); // introducing slight delay

      callback && callback();
    }, 4000); // Simulate loading state with 2 seconds delay
  };
  /**
   * Provides a loading effect when moving to a different UI state.
   *
   * @param {Function} callback - The callback function to execute after loading.
   */
  const handlePreStep = (callback) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      callback && callback();
    }, 2000);
  };
  const resetLoadingAndResults = () => {
    setIsLoading(false);
    setShowRebateResults(false);
  };
  const answeredQuestions = answers.filter((answer) => answer !== null).length;
  const progressPercentage = (answeredQuestions / totalQuestions) * 100;

  return (
    <div className="quiz-step">
      <h2>How much subsidy can I get?</h2>

      {loading ? (
        <CustomLoadingSpinner />
      ) : (
        <>
          <div className="quiz-container">
            {questions.map((question, index) => (
              <div className="question" key={index}>
                <p>
                  {question}
                  {<span style={{ color: "red", marginLeft: "5px" }}>*</span>}
                </p>
                <div className="button-group">
                  <button
                    onClick={() => {
                      handleAnswer(index, "Yes");
                    }}
                    className={answers[index] === "Yes" ? "selected" : ""}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => {
                      handleAnswer(index, "No");
                    }}
                    className={answers[index] === "No" ? "selected" : ""}
                  >
                    No
                  </button>
                </div>
                {errorIndices.includes(index) && (
                  <h3 className="error-notification">
                    Please answer this question.
                  </h3>
                )}
              </div>
            ))}

            <button onClick={handleSubmit} className="buttonSubmit">
              Submit
            </button>
            {result && <div className="result">{result}</div>}
            <Button
              className="previous-button"
              icon={<FontAwesomeIcon icon={faArrowLeft} size="xs" />}
              onClick={() => handlePreStep(previousStep)}
              shape="circle"
            />
            {showInstallationForm && (
              <div className="installation-year" id="installation-year">
                <label>Year of Installation from 2023:</label>
                <input
                  type="number"
                  min="2023"
                  value={installationYear}
                  onChange={(e) => {
                    resetLoadingAndResults();
                    setInstallationYear(e.target.value);
                  }}
                />
                <button onClick={() => handleClick(calculateRebate)}>
                  Calculate Rebate
                </button>
              </div>
            )}
            {isLoading ? (
              <CalculatedLoading />
            ) : (
              showRebateResults && (
                <div className="rebate-results" id="rebate-results-scroll">
                  {victorianRebate > 0 && (
                    <p className="rebate-info">
                      Your Victorian rebate is: <span>${victorianRebate}</span>
                    </p>
                  )}

                  <p className="rebate-info">
                    Your federal rebate is:{" "}
                    <span>${federalRebate.toFixed(2)}</span>
                  </p>
                  <p className="rebate-info">
                    Your total rebate is:{" "}
                    <span>${(victorianRebate + federalRebate).toFixed(2)}</span>
                  </p>

                  <p className="cost-info">
                    Cost for installation: <span>${price_installation}</span>
                  </p>
                  <p className="final-cost">
                    Cost for installation with rebate:{" "}
                    <span>
                      $
                      {(
                        price_installation -
                        (victorianRebate + federalRebate)
                      ).toFixed(2)}
                    </span>
                  </p>
                  <p className="payback-period">
                    Payback period:{" "}
                    <span>
                      {Math.round(
                        (price_installation -
                          (victorianRebate + federalRebate)) /
                          yearlySaving
                      )}{" "}
                      years
                    </span>
                  </p>
                </div>
              )
            )}
          </div>
          <div className="progress-container">
            <Progress
              strokeColor={{
                "0%": "#53db4e",
                "100%": "#ffd700",
              }}
              type="circle"
              percent={progressPercentage}
              format={() => `${answeredQuestions}/${totalQuestions}`}
            />
            <div className="answer-counts">
              <p>Yes: {answers.filter((answer) => answer === "Yes").length}</p>
              <p>No: {answers.filter((answer) => answer === "No").length}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
