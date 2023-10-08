// CustomLoadingSpinner.js

import React from "react";
import { Spin, Image } from "antd";
import spin from "../../assets/images/icon-animation/spin.gif";
import pageLoading from "../../assets/images/icon-animation/page.gif";

import "./style.scss";

const CustomLoadingSpinner = ({ isPageLoading }) => {
  return (
    <div
      className="custom-spinner-container"
      data-testid="custom-spinner-container"
    >
      {!isPageLoading ? (
        <Image src={pageLoading} preview={false} />
      ) : (
        <Image src={spin} preview={false} />
      )}
      {!isPageLoading ? (
        <h3 className="spin">
          Waiting a little bit! We're loading the page shortly...
        </h3>
      ) : (
        <h3 className="spin">
          Hold on to your tickets! We're arriving shortly...
        </h3>
      )}
    </div>
  );
};

export default CustomLoadingSpinner;
