import React, { useState } from "react";
import "./style.scss";
import CustomLoadingSpinner from "../../../components/CustomLoadingSpinner/CustomLoadingSpinner";
import { Button, Progress } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Quiz = ({ previousStep }) => {
  const questions = [
    "Are you the owner-occupier of an existing property where the solar panel (PV) system is to be installed or the owner of a home currently under construction where the solar panel (PV) system is to be installed?",
    "Does the combined taxable income of all the owners of the house amount to less than $210,000 per year?",
    "Have you or any other owner-occupier of the property received a solar panel (PV) rebate or solar battery rebate under the Solar Homes Program in the past?",
    "Is the market value of the property less than $3 million, or if the home is under construction, will it be valued at less than $3 million upon completion?",
    "Has the property address ever received a solar panel (PV) rebate or a solar battery rebate under the Solar Homes Program in the past?",
    "Has a solar panel (PV) system been installed in the property after 1 November 2009?",
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorIndices, setErrorIndices] = useState([]);
  const totalQuestions = questions.length;

  const handleAnswer = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
    if (errorIndices.includes(index)) {
      setErrorIndices(errorIndices.filter((e) => e !== index));
    }
  };

  const handleSubmit = () => {
    const errorList = answers
      .map((answer, index) => (answer === null ? index : null))
      .filter((index) => index !== null);
    setErrorIndices(errorList);

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
  };
  /**
   * Handles the click event for both next and previous buttons.
   * @param {function} callback - Callback to execute on successful validation.
   */
  const handleClick = (callback) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      callback();
    }, 2000); // Simulate loading state with 2 seconds delay
  };
  const answeredQuestions = answers.filter((answer) => answer !== null).length;
  const progressPercentage = (answeredQuestions / totalQuestions) * 100;

  return (
    <div className="quiz-step">
      <h1>How much subsidy can I get?</h1>

      {loading ? (
        <CustomLoadingSpinner />
      ) : (
        <div className="quiz-container">
          <Progress
            strokeColor={{
              "0%": "#53db4e",
              "100%": "#ffd700",
            }}
            type="circle"
            percent={progressPercentage}
            format={() => `${answeredQuestions}/${totalQuestions}`}
          />
          {questions.map((question, index) => (
            <div className="question" key={index}>
              <p>{question}</p>
              <div className="button-group">
                <button
                  onClick={() => handleAnswer(index, "Yes")}
                  className={answers[index] === "Yes" ? "selected" : ""}
                >
                  Yes
                </button>
                <button
                  onClick={() => handleAnswer(index, "No")}
                  className={answers[index] === "No" ? "selected" : ""}
                >
                  No
                </button>
              </div>
              {errorIndices.includes(index) && (
                <p className="error-notification">
                  Please answer this question.
                </p>
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
            onClick={() => handleClick(previousStep)}
            shape="circle"
          />
        </div>
      )}
    </div>
  );
};

export default Quiz;
