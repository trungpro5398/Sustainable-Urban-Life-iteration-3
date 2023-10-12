import React from "react";
import "./style.scss";
import calSpin from "../../assets/images/icon-animation/calspin.gif";
const CalculatedLoading = () => {
  return (
    <div className="calculated-loading-container">
      <img src={calSpin} alt="Loading..." />
      <h4>Calculating...</h4>
    </div>
  );
};

export default CalculatedLoading;
