// External Dependencies
import React, { useRef, useState, useEffect } from "react";
import { Row, Col } from "antd";
import ReactPlayer from "react-player"; // <-- Import the ReactPlayer
import introductionVideo from "../../assets/videos/introduction.mp4";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// Components
import Navbar from "../Navbar/Navbar";
import background_1 from "../../assets/images/hero-section/background-1.jpeg";
import background_2 from "../../assets/images/hero-section/background-2.jpeg";
// Styles
import "./HeroSection.scss";
import { FaPlay } from "react-icons/fa";
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
  // State to manage video play/pause
  const [isPlaying, setIsPlaying] = useState(false);

  // Handler for video play button
  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  /**
   * Smoothly scrolls the view to the "sub-options" section of the page.
   */
  const handleButtonClickToVideoSection = () => {
    const subOptions = document.getElementById("video-options");
    if (subOptions) {
      subOptions.scrollIntoView({ behavior: "smooth" });
    }
  };
  const videoSectionRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        videoSectionRef.current &&
        !videoSectionRef.current.contains(event.target)
      ) {
        setIsPlaying(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <section className="hero">
      <Navbar isHomePage={true} />

      {/* <div className="container">
        <div className="carousel-item">
          <div className="carousel-content">
            <h3>Sustainable Renewable Solution</h3>
            <p>
              Embrace an eco-friendly approach to urban living with innovative,
              sustainable solutions that not only benefit the environment but
              also significantly reduce energy costs.
            </p>
          </div>
        </div>
        <div className="hero-overlay">

          <div className="outer-text">
            {smallText.map((word, wordIndex) => (
              <h3 key={wordIndex}>
                {word.split("").map((char, charIndex) => (
                  <span
                    style={{ animationDelay: `${charIndex * 0.1}s` }}
                    key={charIndex}
                  >
                    {char}
                  </span>
                ))}
              </h3>
            ))}
          </div>
          <div className="video-section">
            <ReactPlayer
              url={introductionVideo}
              playing={isPlaying} 
              width="100%"
              height="100%"
              controls
            />

            {!isPlaying && (
              <div className="play-video-button" onClick={handlePlayVideo}>
                <i className="your-icon-class-here"></i>
                Introduction
              </div>
            )}
          </div>
          <h4>
            Bright Futures: The Confluence of Solar Solutions and Government
            Support in Urban Living
          </h4>

          <Row gutter={16}>
            <Col>
              <button
                className="cta-button "
                onClick={handleButtonClickToSubOptions}
              >
                Learn More
              </button>
            </Col>
          </Row>
        </div>
      </div> */}
      <div className="container">
        <div className="video-section" ref={videoSectionRef}>
          <ReactPlayer
            url={introductionVideo}
            playing={isPlaying}
            width="100%"
            height="100%"
            onClick={() => setIsPlaying(false)}
          />

          {!isPlaying && (
            <div
              className="play-video-button"
              onClick={() => {
                handlePlayVideo();
                handleButtonClickToVideoSection();
              }}
            >
              <FaPlay />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
