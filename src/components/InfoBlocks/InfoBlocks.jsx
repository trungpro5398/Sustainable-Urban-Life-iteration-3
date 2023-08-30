// External Dependencies
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faCity,
  faBalanceScale,
} from "@fortawesome/free-solid-svg-icons";
import { Carousel } from "react-responsive-carousel";
import { Image } from "antd";

// Styles
import "./InfoBlocks.scss";
import s1 from "../../assets/images/solar-energy-benefit/s1.jpeg";
import s2 from "../../assets/images/solar-energy-benefit/s2.webp";
import s3 from "../../assets/images/solar-energy-benefit/s3.jpg";
import s4 from "../../assets/images/solar-energy-benefit/s4.jpg";
import s5 from "../../assets/images/solar-energy-benefit/s5.jpg";
import s6 from "../../assets/images/solar-energy-benefit/s6.jpg";
import s7 from "../../assets/images/solar-energy-benefit/s7.jpg";
import s8 from "../../assets/images/solar-energy-benefit/s8.png";
import s9 from "../../assets/images/solar-energy-benefit/s9.webp";
import s10 from "../../assets/images/solar-energy-benefit/s10.jpg";
import sup1 from "../../assets/images/gov-sup/sup-1.png";
import sup2 from "../../assets/images/gov-sup/sup-2.png";
import sup3 from "../../assets/images/gov-sup/sup-3.png";
import sup4 from "../../assets/images/gov-sup/sup-4.png";
import solar1 from "../../assets/images/solar-choice/solar1.png";
import solar2 from "../../assets/images/solar-choice/solar2.png";
import solar3 from "../../assets/images/solar-choice/solar3.png";
import solar4 from "../../assets/images/solar-choice/solar4.png";
import solar5 from "../../assets/images/solar-choice/solar5.png";
import solar6 from "../../assets/images/solar-choice/solar6.png";

/**
 * InfoBlocks Component
 *
 * Displays information blocks about renewable energy, urban planning, and governance policy.
 * Each block contains an icon, title, list of points, and associated images showcased in a carousel.
 */

const InfoBlocks = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const solarBenefits = `
  
  - Cost Savings: Reduce electricity bills and achieve yearly savings. 
  - Eco friendly: Decreases carbon emissions.
  - Government Support: Rebates like Victoria's $1,850 AUD for installations.
  - Feed in Tariffs: Earn from excess energy returned to the grid.
  - Job Creation: Rise in solar industry jobs.
  - Property Value: Solar homes tend to have higher resale values.
  - Energy Independence: Reduced reliance on external sources.
  - Grid Stability: Contribute during peak demand.
  - Tech Advancements: Improved solar panel efficiency over time.
`;

  const governmentSup = `
  - VICTORIA’S SOLAR REBATE: The Victoria Solar Homes Program provides up to $4,000 in solar rebates for eligible Victorian homeowners and renters. Eligibility is based on household income, property value, and solar system specifics. Check the official website for full details.
  - Federal Incentives & Solar Rebates: The federal government offers incentives under the Renewable Energy Target (RET) for solar installations. This includes both small scale and large scale projects, each with its own set of guidelines. Details can be found on the official website.`;

  const solarChoicePlaning = `
  - Step 1: Get the user's billing cycle 
  - Step 2: Get the user's electricity daily usage
  - Step 3: Get the user's suburb
  - Step 4: Show some solar installers in the user's choice of suburb
  - Step 5: Get the battery choice
  - Step 6: Give user some recommendations of battery installers based on their choice
  `;
  const solarBenefitsArray = solarBenefits
    .split("-")
    .map((benefit) => benefit.trim())
    .filter(Boolean); // this will remove any empty strings

  const solarChoicePlaningArray = solarChoicePlaning
    .split("-")
    .map((benefit) => benefit.trim())
    .filter(Boolean); // this will remove any empty strings

  const governmentSupArray = governmentSup
    .split("-")
    .map((sup) => sup.trim())
    .filter(Boolean); // this will remove any empty strings
  const [currentImages, setCurrentImages] = useState([
    s1,
    s2,
    s3,
    s4,
    s5,
    s6,
    s7,
    s8,
    s9,
    s10,
  ]);

  const reasonsData = [
    {
      title: "Renewable Energy",
      icon: faSun,
      content: solarBenefitsArray,
      illustration: "reason1",
      images: [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10],
    },
    {
      title: "Urban Planning",
      icon: faCity,
      content: solarChoicePlaningArray,
      illustration: "reason2",
      images: [solar1, solar2, solar3, solar4, solar5, solar6],
    },
    {
      title: "Governance and Policy",
      icon: faBalanceScale,
      content: governmentSupArray,
      illustration: "reason3",
      images: [sup1, sup2, sup3, sup4],
    },
  ];

  return (
    <div className="outer-wrapper" id="info-blocks">
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
                setSelectedIndex(idx);
                setCurrentImages(reason.images);
              }}
            >
              <FontAwesomeIcon
                icon={reason.icon}
                size="2x"
                className="fa-icon"
              />
              <div className="text-section">
                <h2>{reason.title}</h2>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {reason.content.map((benefit, bIdx) => (
                    <span key={bIdx}>- {benefit}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`illustration-container`}>
          <Carousel
            showThumbs={false}
            autoPlay={true}
            infiniteLoop={true}
            interval={4000}
            showStatus={false}
            // showArrows={true}
            className="cartoon-carousel"
          >
            {currentImages.map((image, idx) => (
              <div key={idx} className="carousel-image-container">
                <Image
                  src={image}
                  alt={`Illustration ${idx + 1}`}
                  className="carousel-image"
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default InfoBlocks;
