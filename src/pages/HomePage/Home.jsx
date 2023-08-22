// Inside Home.js

import React, { useState, useEffect } from "react";
import HeroSection from "../../components/HeroSection/HeroSection";
import Carousel from "../../components/Carousel/Carousel";
import InfoBlocks from "../../components/InfoBlocks/InfoBlocks";
import Testimonials from "../../components/Testimonials/Testimonials";
import Footer from "../../components/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons"; // or whichever icon you choose

// import Navbar from "../../components/Navbar/Navbar";
import "./Home.scss";
import SubOptions from "../../components/SubOptions/SubOptions";
const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Toggle the visibility of the scroll-to-top button
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      // Show the button after 300px of scrolling
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    // Clean up the event listener
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll-to-top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: smooth scrolling effect
    });
  };
  return (
    <div className="HomePage">
      <HeroSection />
      <SubOptions />
      {/* <Carousel /> */}
      <InfoBlocks />
      <Testimonials />
      <Footer />
      {isVisible && (
        <div onClick={scrollToTop} className="scroll-to-top">
          <FontAwesomeIcon icon={faChevronUp} className="icon" />
        </div>
      )}
    </div>
  );
};

export default Home;
