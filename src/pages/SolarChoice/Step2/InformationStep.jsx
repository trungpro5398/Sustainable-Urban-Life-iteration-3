import React, { useState } from "react";
import { Input, Radio, Button, Spin } from "antd";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  updateField,
  selectSolarForm,
} from "../../../reduxToolkit/slices/solarFormSlice.js"; // Replace with the path to your slice

const InformationStep = ({ nextStep, previousStep }) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const solarForm = useSelector(selectSolarForm);
  const { gender } = solarForm.personalDetails;
  const handleClick = (callback) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (callback && typeof callback === "function") {
        callback();
      }
    }, 2000); // Wait for 2 seconds before invoking the callback
  };

  return (
    <div className="info-step">
      <h1>Let's Get to Know You Better</h1>

      {loading ? (
        <div className="loading-container">
          <Spin size="large" tip="Preparing your solar journey..."></Spin>
        </div>
      ) : (
        <div className="info-step-container">
          <label htmlFor="name">What's your name?</label>

          <Input
            value={solarForm.personalDetails.name}
            onChange={(e) =>
              dispatch(
                updateField({
                  section: "personalDetails",
                  field: "name",
                  value: e.target.value,
                })
              )
            }
            id="name"
            placeholder="Enter your name"
          />
          <p>What's your gender?</p>
          <Radio.Group
            className="gender-options"
            onChange={(e) =>
              dispatch(
                updateField({
                  section: "personalDetails",
                  field: "gender",
                  value: e.target.value,
                })
              )
            }
            value={solarForm.personalDetails.gender}
          >
            <Radio.Button className="gender-option" value="male">
              <p>Male</p>
              <div className="choice-circle">
                {gender === "male" && <div className="choice-tick">✓</div>}
              </div>
            </Radio.Button>
            <Radio.Button className="gender-option" value="female">
              <p>Female</p>
              <div className="choice-circle">
                {gender === "female" && <div className="choice-tick">✓</div>}
              </div>
            </Radio.Button>
            <Radio.Button className="gender-option" value="other">
              <p>Other</p>
              <div className="choice-circle">
                {gender === "other" && <div className="choice-tick">✓</div>}
              </div>
            </Radio.Button>
          </Radio.Group>
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
          ></Button>
        </div>
      )}
    </div>
  );
};

export default InformationStep;
