// CustomLoadingSpinner.js

import React from "react";
import { Spin, Image } from "antd";
import spin from "../../assets/images/icon-animation/spin.gif";
import "./style.scss";

const CustomLoadingSpinner = () => {
  return (
    <div
      className="custom-spinner-container"
      data-testid="custom-spinner-container"
    >
      <Image src={spin} preview={false} />
      <p>Hold on to your tickets! We're arriving shortly...</p>
    </div>
  );
};

export default CustomLoadingSpinner;
