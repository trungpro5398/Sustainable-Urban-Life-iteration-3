// External Dependencies
import React from "react";
import { Row, Col } from "antd";
import hero_bg from "../../assets/images/hero-bg.avif";
// Components
import Navbar from "../Navbar/Navbar";

// Styles
import "./HeroSection.scss";

/**
 * HeroSection Component
 *
 * Represents the hero banner at the top of the page. It displays an animated welcome message,
 * a subtitle, and two call-to-action buttons. The call-to-action buttons smoothly scroll
 * the user to either the 'Sub Options' or 'Info Blocks' sections of the page.
 */
const HeroSection = () => {
  // Animated text for the hero section
  const text = "Welcome to Sustainable Urban Life";
  const smallText = text.split(" ");

  /**
   * Smoothly scrolls the view to the "sub-options" section of the page.
   */
  const handleButtonClickToSubOptions = () => {
    const subOptions = document.getElementById("sub-options");
    if (subOptions) {
      subOptions.scrollIntoView({ behavior: "smooth" });
    }
  };

  /**
   * Smoothly scrolls the view to the "info-blocks" section of the page.
   */
  const handleButtonClickToInfoBlocks = () => {
    const infoBlocks = document.getElementById("info-blocks");
    if (infoBlocks) {
      infoBlocks.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero">
      <Navbar isHomePage={true} />

      <div className="container">
        <div className="hero-overlay">
          {/* Animated Welcome Text */}
          <div className="outer-text">
            {smallText.map((word, wordIndex) => (
              <h1 key={wordIndex}>
                {word.split("").map((char, charIndex) => (
                  <span
                    style={{ animationDelay: `${charIndex * 0.1}s` }}
                    key={charIndex}
                  >
                    {char}
                  </span>
                ))}
              </h1>
            ))}
          </div>

          {/* Hero Subtitle */}
          <p>
            Bright Futures: The Confluence of Solar Solutions and Government
            Support in Urban Living
          </p>

          {/* Call-to-action Buttons */}
          <Row gutter={16}>
            <Col>
              <button
                className="cta-button  cta-button-1"
                onClick={handleButtonClickToSubOptions}
              >
                Learn More
              </button>
            </Col>
            <Col>
              <button
                className="cta-button"
                onClick={handleButtonClickToInfoBlocks}
              >
                See How It Works
              </button>
            </Col>
          </Row>
          <img src={hero_bg} alt="hero background" className="hero-image" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
