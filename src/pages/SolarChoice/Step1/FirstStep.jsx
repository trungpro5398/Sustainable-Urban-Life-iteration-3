// External Dependencies
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

// Styles
import "./style.scss";
import CustomLoadingSpinner from "../../../components/CustomLoadingSpinner/CustomLoadingSpinner";

/**
 * FirstStep Component
 *
 * A component that serves as an introduction to the solar journey. It showcases a text animation
 * effect for the introductory text. It has two buttons: "start-button" and "next-button",
 * which when clicked, show a loading state before advancing to the next step.
 *
 * @param {function} nextStep - Function to move to the next step.
 * @returns {JSX.Element}
 */
const FirstStep = ({ nextStep }) => {
  // State to manage loading effect
  const [loading, setLoading] = useState(false);

  /**
   * Handles button click.
   * Sets loading state, waits for a duration and then triggers the nextStep callback.
   */
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (typeof nextStep === "function") {
        nextStep();
      }
    }, 3000);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Checking for the arrow right key
      if (event.keyCode === 39) {
        handleClick(); // go to the next step
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
    <div className="first-step-container">
      {/* Animated Text Presentation */}
      <h2>Your Journey to Solar Begins Here</h2>

      {/* Loading Spinner or Action Buttons based on loading state */}
      {loading ? (
        <CustomLoadingSpinner />
      ) : (
        <>
          <Button
            className="start-button"
            onClick={handleClick}
            data-testid="start-button"
          >
            Make the first step now
          </Button>

          <Button
            className="next-button"
            data-testid="next-button"
            icon={<FontAwesomeIcon icon={faArrowRight} size="xs" />}
            onClick={handleClick}
            shape="circle"
          />
        </>
      )}

      <div className="sun-animation"></div>
    </div>
  );
};

export default FirstStep;
