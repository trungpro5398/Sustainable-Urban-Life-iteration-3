// External Dependencies
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

// Components
import HeroSection from "../../components/HeroSection/HeroSection";
import SubOptions from "../../components/SubOptions/SubOptions";

// Styles
import "./Home.scss";
import InfoBlocks from "../../components/InfoBlocks/InfoBlocks";
import Testimonials from "../../components/Testimonials/Testimonials";

/**
 * Home Component
 *
 * This component renders the home page of the application. It provides a hero section,
 * sub-options, and a scroll-to-top button that appears when the user scrolls beyond a
 * certain point on the page.
 */
const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  /**
   * Toggles the visibility of the scroll-to-top button.
   * It shows the button after the user has scrolled more than 300px.
   */
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Setting up the event listener for scrolling
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    // Cleanup: remove the event listener when the component is unmounted
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  /**
   * Scrolls the window to the top with a smooth scrolling effect.
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="HomePage">
      <HeroSection />
      <SubOptions />
      <InfoBlocks />
      {isVisible && (
        <div onClick={scrollToTop} className="scroll-to-top">
          <FontAwesomeIcon icon={faChevronUp} className="icon" />
        </div>
      )}
      <Testimonials />
    </div>
  );
};

export default Home;
