// Inside SubOptions.jsx

import React from "react";
import "./SubOptions.scss";
import { useNavigate } from "react-router-dom";

const SubOptions = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/calculation");
  };

  return (
    <div className="sub-options-container">
      <div className="option-card">
        <h3>Solar Energy Benefit</h3>
        <p>Discover the advantages of solar energy for your home.</p>
        <button>Learn More</button>
      </div>

      <div className="option-card">
        <h3>Solar Choice</h3>
        <p>Explore the various solar panel choices suitable for your needs.</p>
        <button onClick={handleButtonClick}>Explore</button>
      </div>

      <div className="option-card">
        <h3>Government support program</h3>
        <p>Learn about the government incentives for solar installation.</p>
        <button>Get Info</button>
      </div>
    </div>
  );
};

export default SubOptions;
