import React from "react";
import "./style.scss";
import calSpin from "../../assets/images/icon-animation/calspin.gif";
const CalculatedLoading = () => {
  return (
    <div className="calculated-loading-container">
      <img src={calSpin} alt="Loading..." />
      <p>Calculating...</p>
    </div>
  );
};

export default CalculatedLoading;
