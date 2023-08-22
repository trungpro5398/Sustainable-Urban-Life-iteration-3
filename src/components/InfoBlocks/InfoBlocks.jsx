import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faCity,
  faBalanceScale,
} from "@fortawesome/free-solid-svg-icons";

import "./InfoBlocks.scss";
const InfoBlocks = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);

  const reasonsData = [
    {
      title: "Renewable Energy",
      icon: faSun,
      content:
        "We utilize cutting-edge technologies to harness renewable sources...",
      illustration: "reason1",
    },
    {
      title: "Urban Planning",
      icon: faCity,
      content: "Our platform offers advanced solutions...",
      illustration: "reason2",
    },
    {
      title: "Governance and Policy",
      icon: faBalanceScale,
      content: "Through our robust framework...",
      illustration: "reason3",
    },
  ];

  return (
    <div className="outer-wrapper">
      <div className="headline-container">
        <h1>Shaping the Future, Sustainably.</h1>
        <p>
          Discover unparalleled solutions that blend innovation with
          sustainability, ensuring a brighter tomorrow.
        </p>
      </div>
      <div className="info-blocks">
        <div className="reasons-container">
          {reasonsData.map((reason, idx) => (
            <div
              className={`reason ${selectedIndex === idx ? "active" : ""}`}
              key={idx}
              onClick={() => {
                setSelectedImage(reason.illustration);
                setSelectedIndex(idx);
              }}
            >
              <FontAwesomeIcon
                icon={reason.icon}
                size="2x"
                className="fa-icon"
              />
              <div className="text-section">
                <h2>{reason.title}</h2>
                <p>{reason.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={`illustration-container ${selectedImage}`}>
          {/* No need for the img tag anymore */}
        </div>
      </div>
    </div>
  );
};

export default InfoBlocks;
