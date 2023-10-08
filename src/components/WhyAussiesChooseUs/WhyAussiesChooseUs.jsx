import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCity,
  faSolarPanel,
} from "@fortawesome/free-solid-svg-icons";
import "./style.scss";

const features = [
  {
    icon: faBook,
    title: "Educational Content",
    description:
      "Educational materials on sustainable living and renewable energy.",
  },
  {
    icon: faCity,
    title: "Government Policy Info",
    description: "Info on government renewable energy policies and programs.",
  },
  {
    icon: faSolarPanel,
    title: "Energy Recommendations",
    description: "Personalized recommendations for energy sustainability.",
  },
];

const WhyAussiesChooseUs = () => {
  return (
    <div className="why-aussies">
      <h3>Why Aussies Choose Us</h3>
      <div className="features-list">
        {features.map((feature, index) => (
          <div key={index} className="feature-item">
            <FontAwesomeIcon icon={feature.icon} className="feature-icon" />
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyAussiesChooseUs;
