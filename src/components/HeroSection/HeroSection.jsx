import React from "react";
import "./HeroSection.scss";
import Navbar from "../Navbar/Navbar";

const HeroSection = () => {
  const text = "Welcome to Sustainable Urban Life";
  const smallText = text.split(" ");

  const handleButtonClick = () => {
    const subOptions = document.getElementById("sub-options");
    if (subOptions) {
      subOptions.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero">
      <Navbar isHomePage={true} />

      <div className="hero-overlay">
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

        <p>Learn about your carbon impact and ways to reduce it.</p>
        <button className="cta-button" onClick={handleButtonClick}>
          Learn More
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
