import React from "react";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
const NavigationButtons = ({
  nextStep,
  previousStep,
  condition,
  setShowError,
  setLoading,
  validateFields,
}) => {
  const handleClick = (callback) => {
    // New validation check here
    if (typeof validateFields === "function" && !validateFields()) {
      validateFields();
      return;
    }
    if (!condition) {
      setShowError(true);
      return;
    }
    if (setShowError) setShowError(false);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      callback();
    }, 2000); // Simulate loading state with 2 seconds delay
  };

  return (
    <div className="button">
      <Button
        className="previous-button"
        icon={<FontAwesomeIcon icon={faArrowLeft} size="xs" />}
        onClick={() => handleClick(previousStep)}
        shape="circle"
        data-testid="previous-button"
      />
      <Button
        className="next-button"
        icon={<FontAwesomeIcon icon={faArrowRight} size="xs" />}
        onClick={() => handleClick(nextStep)}
        shape="circle"
        data-testid="next-button"
      />
    </div>
  );
};

export default NavigationButtons;
