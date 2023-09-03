import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Radio, Button, Spin, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faQuestionCircle,
  faCalendarDay,
  faCalendarAlt,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import {
  updateField,
  selectSolarForm,
} from "../../../reduxToolkit/slices/solarFormSlice";
import CustomLoadingSpinner from "../../../components/CustomLoadingSpinner/CustomLoadingSpinner";

/**
 * Component to select billing cycle for electricity usage.
 * @param {function} nextStep - Function to move to the next step.
 * @param {function} previousStep - Function to move to the previous step.
 */
const BillCycle = ({ nextStep, previousStep }) => {
  // Component State
  const [isInfoVisible, setInfoVisible] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redux
  const cycle = useSelector(selectSolarForm);
  const dispatch = useDispatch();

  /**
   * Content for the Information modal.
   */
  const InfoModalContent = () => (
    <div className="cartoon-content">
      {[
        {
          icon: faCalendarDay,
          text: "Monthly means you're billed every month.",
        },
        { icon: faCalendarAlt, text: "Quarterly means every three months." },
        { icon: faCalendarCheck, text: "Yearly means once a year." },
      ].map((item, index) => (
        <div key={index} className="cartoon-item">
          <FontAwesomeIcon
            icon={item.icon}
            size="2x"
            className="cartoon-icon"
          />
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  );

  /**
   * Radio options for billing cycle selection.
   * @param {object} cycle - Current selected cycle from the store.
   * @param {function} dispatch - Redux dispatch function.
   */
  const BillingCycleOptions = ({ cycle, dispatch }) => (
    <Radio.Group
      className="bill-cycle-options"
      onChange={(e) => {
        dispatch(
          updateField({
            section: "billingCycle",
            field: "cycle",
            value: e.target.value,
          })
        );
        setShowError(false);
      }}
      value={cycle.billingCycle?.cycle}
    >
      {["Monthly", "Quarterly", "Yearly"].map((choice) => (
        <Radio.Button
          className="bill-cycle-option"
          value={choice.toLowerCase()}
          key={choice}
        >
          <p>{choice}</p>
          <div className="choice-circle">
            {cycle.billingCycle?.cycle === choice.toLowerCase() && (
              <div className="choice-tick">✓</div>
            )}
          </div>
        </Radio.Button>
      ))}
    </Radio.Group>
  );

  /**
   * Error message for when no billing cycle is selected.
   */
  const ErrorMessage = () => (
    <p className="error-message">
      Please select a billing cycle before proceeding.
    </p>
  );

  /**
   * Navigation buttons (previous and next).
   * @param {function} handleClick - Function to handle button clicks.
   */
  const NavigationButtons = ({ handleClick }) => (
    <>
      <Button
        className="previous-button"
        icon={<FontAwesomeIcon icon={faArrowLeft} size="xs" />}
        onClick={() => handleClick(previousStep)}
        shape="circle"
      />
      <Button
        className="next-button"
        icon={<FontAwesomeIcon icon={faArrowRight} size="xs" />}
        onClick={() => handleClick(nextStep)}
        shape="circle"
      />
    </>
  );

  /**
   * Handles the click event for both next and previous buttons.
   * @param {function} callback - Callback to execute on successful validation.
   */
  const handleClick = (callback) => {
    if (!cycle.billingCycle?.cycle) {
      setShowError(true);
      return;
    }

    setShowError(false);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      callback();
    }, 2000); // Simulate loading state with 2 seconds delay
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
    <div className="bill-step">
      <h1>Electricity Usage</h1>

      {loading ? (
        <CustomLoadingSpinner />
      ) : (
        <div className="bill-step-container">
          <h2>
            Which is your billing cycle?
            <FontAwesomeIcon
              icon={faQuestionCircle}
              className="info-icon"
              onClick={() => setInfoVisible(true)}
              onMouseEnter={() => setInfoVisible(true)}
            />
          </h2>

          <Modal
            title="Billing Cycle Information"
            visible={isInfoVisible}
            onCancel={() => setInfoVisible(false)}
            footer={null}
            centered
            className="cartoon-modal"
          >
            <InfoModalContent />
          </Modal>

          <BillingCycleOptions cycle={cycle} dispatch={dispatch} />
          {showError && <ErrorMessage />}

          <NavigationButtons handleClick={handleClick} />
        </div>
      )}
    </div>
  );
};

BillCycle.propTypes = {
  nextStep: PropTypes.func.isRequired,
  previousStep: PropTypes.func.isRequired,
};

export default BillCycle;
