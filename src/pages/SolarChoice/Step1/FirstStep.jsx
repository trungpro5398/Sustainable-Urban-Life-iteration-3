import React, { useState } from "react";
import { Button, Spin } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
const FirstStep = ({ nextStep }) => {
  const [loading, setLoading] = useState(false);
  const text = "Your Journey to Solar Begins Here";
  const smallText = text.split(" ");

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
    <div className="first-step-container">
      <div className="outer-text">
        {smallText.map((word, index) => (
          <h1>
            {word.split("").map((char, index) => (
              <span style={{ animationDelay: `${index * 0.1}s` }} key={index}>
                {char}
              </span>
            ))}
          </h1>
        ))}
      </div>
      {loading ? (
        <Spin />
      ) : (
        <Button
          className="start-button"
          icon={<ArrowRightOutlined />}
          onClick={() => handleClick(nextStep)}
        >
          Make the first step now
        </Button>
      )}
      <div className="moving-balloon"></div>
      <Button
        className="next-button"
        icon={<FontAwesomeIcon icon={faArrowRight} size="xs" />}
        onClick={() => handleClick(nextStep)}
        shape="circle"
      ></Button>
    </div>
  );
};

export default FirstStep;
