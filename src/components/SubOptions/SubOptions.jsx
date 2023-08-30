// Inside SubOptions.jsx

import React from "react";
import "./SubOptions.scss";
import { useNavigate } from "react-router-dom";

const SubOptions = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/solar-choice");
  };
  const handleButtonClicktoGovernmentSupport = () => {
    navigate("/government-support");
  };
  const handleButtonClicktoSolarEnergyBenefit = () => {
    navigate("/solar-energy-benefit");
  };
  return (
    <div className="outer-wrapper-sub-options" id="sub-options">
      <div className="intro-section">
        <h1>Unlock the Power of Solar!</h1>
        <p>
          From understanding benefits to choosing the right solution, we've got
          you covered.
        </p>
      </div>

      <div className="sub-options-container">
        <div className="option-card">
          <div className="option-card-img-1"></div>

          <h3>Solar Energy Benefit</h3>
          <p>Discover the advantages of solar energy for your home.</p>
          <button onClick={handleButtonClicktoSolarEnergyBenefit}>
            Learn More
          </button>
        </div>

        <div className="option-card">
          <div className="option-card-img-2"></div>

          <h3>Solar Choice</h3>
          <p>
            Explore the various solar panel choices suitable for your needs.
          </p>
          <button onClick={handleButtonClick}>Explore</button>
        </div>

        <div className="option-card">
          <div className="option-card-img-3"></div>

          <h3>Government support program</h3>
          <p>Learn about the government incentives for solar installation.</p>
          <button onClick={handleButtonClicktoGovernmentSupport}>
            Get Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubOptions;
