// External Dependencies
import React from "react";
import { Row, Col } from "antd";
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";
// Components
import Navbar from "../Navbar/Navbar";
import background_1 from "../../assets/images/hero-section/background-1.jpeg";
import background_2 from "../../assets/images/hero-section/background-2.jpeg";
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
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <section className="hero">
      <Navbar isHomePage={true} />

      <div className="container">
        <ResponsiveCarousel
          showArrows={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          autoPlay={true}
          interval={4000}
        >
          <div className="carousel-item">
            <div className="carousel-content">
              <h1>Sustainable Renewable Solution</h1>
              <p>
                Embrace an eco-friendly approach to urban living with
                innovative, sustainable solutions that not only benefit the
                environment but also significantly reduce energy costs.
              </p>
            </div>
          </div>
          <div
            className="carousel-item"
            style={{
              backgroundImage: `linear-gradient(
              rgba(0, 0, 0, 0.5),
              rgba(0, 0, 0, 0.1)
            ),url(${background_2})`,
            }}
          >
            <div className="carousel-content">
              <h1>Discover and Learn</h1>
              <p>
                Explore the transformative power of solar energy. See how
                government support and initiatives are accelerating the adoption
                of green technologies in urban settings.
              </p>
            </div>
          </div>
        </ResponsiveCarousel>
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
                className="cta-button "
                onClick={handleButtonClickToSubOptions}
              >
                Learn More
              </button>
            </Col>
            {/* <Col>
              <button
                className="cta-button"
                onClick={handleButtonClickToInfoBlocks}
              >
                See How It Works
              </button>
            </Col> */}
          </Row>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
