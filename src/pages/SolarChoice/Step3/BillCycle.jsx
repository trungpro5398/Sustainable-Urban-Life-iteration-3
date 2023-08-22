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
} from "../../../reduxToolkit/slices/solarFormSlice"; // Update with the path to your slice for billing

const BillCycle = ({ nextStep, previousStep }) => {
  const [isInfoVisible, setInfoVisible] = useState(false);
  const [showError, setShowError] = useState(false);

  const cycle = useSelector(selectSolarForm);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleClick = (callback) => {
    if (!cycle.billingCycle?.cycle) {
      // If cycle hasn't been chosen, show an error and return early
      setShowError(true);
      return;
    }
    console.log(cycle.billingCycle?.cycle);
    console.log(showError);
    setShowError(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (callback && typeof callback === "function") {
        callback();
      }
    }, 2000); // Wait for 2 seconds before invoking the callback
  };

  return (
    <div className="bill-step">
      <h1>Electricity Usage</h1>

      {loading ? (
        <div className="loading-container">
          <Spin size="large" tip="Charging solar energy..."></Spin>
        </div>
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
            <div className="cartoon-content">
              <div className="cartoon-item">
                <FontAwesomeIcon
                  icon={faCalendarDay}
                  size="2x"
                  className="cartoon-icon"
                />
                <p>
                  Monthly means you're billed <strong>every month</strong>.
                </p>
              </div>
              <div className="cartoon-item">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  size="2x"
                  className="cartoon-icon"
                />
                <p>
                  Quarterly means <strong>every three months</strong>.
                </p>
              </div>
              <div className="cartoon-item">
                <FontAwesomeIcon
                  icon={faCalendarCheck}
                  size="2x"
                  className="cartoon-icon"
                />
                <p>
                  Yearly means <strong>once a year</strong>.
                </p>
              </div>
            </div>
          </Modal>

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
          {showError && (
            <p className="error-message">
              Please select a billing cycle before proceeding.
            </p>
          )}

          <Button
            className="previous-button"
            icon={<FontAwesomeIcon icon={faArrowLeft} size="xs" />}
            onClick={() => handleClick(previousStep)}
            shape="circle"
          ></Button>
          <Button
            className="next-button"
            icon={<FontAwesomeIcon icon={faArrowRight} size="xs" />}
            onClick={() => handleClick(nextStep)}
            shape="circle"
            // disabled={!cycle.billingCycle?.cycle} // Disable the button if cycle is not chosen
          ></Button>
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
