import React from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSection.scss";
import Navbar from "../Navbar/Navbar";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/calculation");
  };

  return (
    <section className="hero">
      <Navbar isHomePage={true} />

      <div className="hero-overlay">
        <h1>Welcome to Sustainable Urban Life</h1>
        <p>Learn about your carbon impact and ways to reduce it.</p>
        <button className="cta-button" onClick={handleButtonClick}>
          Calculation
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
