// Importing required dependencies and styles
import React from "react";
import "./SubOptions.scss";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// The SubOptions component
const SubOptions = () => {
  // Initializing navigate function
  const navigate = useNavigate();

  // Handler functions for navigation
  const handleButtonClicktoSolarEnergyBenefit = () => {
    navigate("/solar-energy-benefit");
  };

  const handleButtonClick = () => {
    navigate("/solar-choice");
  };
  const handleButtonClickToEstimation = () => {
    navigate("/estimation");
  };
  const handleButtonClicktoGovernmentSupport = () => {
    navigate("/government-support");
  };
  function NextArrow(props) {
    const { className, onClick } = props;
    return (
      <div
        className={`${className} custom-next-arrow`} // added custom-next-arrow class
        onClick={onClick}
      />
    );
  }

  function PrevArrow(props) {
    const { className, onClick } = props;
    return (
      <div
        className={`${className} custom-prev-arrow`} // added custom-prev-arrow class
        onClick={onClick}
      />
    );
  }
  const settings = {
    dots: true, // if you want dots for navigation
    infinite: true, // disables infinite looping of slides
    speed: 500,
    slidesToShow: 3, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at once
    initialSlide: 0, // Slide to start on
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Autoplay every 3 seconds
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, // Number of slides to show at once
          slidesToScroll: 1, // Number of slides to scroll at once
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2, // Number of slides to show at once
          slidesToScroll: 1, // Number of slides to scroll at once
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1, // Number of slides to show at once
          slidesToScroll: 1, // Number of slides to scroll at once
        },
      },
    ],
  };

  // Rendering the SubOptions component
  return (
    <div className="outer-wrapper-sub-options" id="sub-options">
      <div className="intro-section">
        <h1>Unlock the Power of Solar!</h1>
        <p>
          From understanding benefits to choosing the right solution, we've got
          you covered.
        </p>
      </div>

      <Slider {...settings} className="sub-options-container">
        <div className="option-card">
          <div className="option-card-img-1"></div>

          <h3>Solar Energy Benefit</h3>
          <p>Discover the advantages of solar energy </p>
          <button onClick={handleButtonClicktoSolarEnergyBenefit}>
            Learn More
          </button>
        </div>

        <div className="option-card">
          <div className="option-card-img-2"></div>

          <h3>Solar Choice</h3>
          <p>Explore the various solar panel choices suitable.</p>
          <button onClick={handleButtonClick}>Explore</button>
        </div>

        <div className="option-card">
          <div className="option-card-img-3"></div>

          <h3>Government Support Program</h3>
          <p>Learn about the government incentive.</p>
          <button onClick={handleButtonClicktoGovernmentSupport}>
            Get Info
          </button>
        </div>
        <div className="option-card">
          <div className="option-card-img-4"></div>
          <h3>Calculate roof's solar</h3>
          <p>Explore the solar potential of your roof</p>
          <button onClick={handleButtonClickToEstimation}>Explore</button>
        </div>
      </Slider>
    </div>
  );
};

export default SubOptions;
