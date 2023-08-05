// Inside Home.js

import React from "react";

import HeroSection from "../../components/HeroSection/HeroSection";
import Carousel from "../../components/Carousel/Carousel";
import InfoBlocks from "../../components/InfoBlocks/InfoBlocks";
import Testimonials from "../../components/Testimonials/Testimonials";
import Footer from "../../components/Footer/Footer";
// import Navbar from "../../components/Navbar/Navbar";
import "./Home.scss";
import SubOptions from "../../components/SubOptions/SubOptions";
const Home = () => {
  return (
    <div className="HomePage">
      <HeroSection />
      <SubOptions />
      <Carousel />
      <InfoBlocks />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
