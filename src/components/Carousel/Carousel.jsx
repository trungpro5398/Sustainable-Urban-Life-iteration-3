import React from "react";
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import "./Carousel.scss";

const CarouselComponent = () => {
  const slidesData = [
    {
      title: "Reduce Energy",
      description: "Learn how reducing energy consumption can help.",
      imgSrc: "/assets/images/slider1.png",
      link: "https://medium.com/topic/environment",
    },
    {
      title: "Reduce Energy",
      description: "Learn how reducing energy consumption can help.",
      imgSrc: "/assets/images/slider1.png",
      link: "https://medium.com/topic/environment",
    },
    {
      title: "Reduce Energy",
      description: "Learn how reducing energy consumption can help.",
      imgSrc: "/assets/images/slider1.png",
      link: "https://medium.com/topic/environment",
    },
    {
      title: "Reduce Energy",
      description: "Learn how reducing energy consumption can help.",
      imgSrc: "/assets/images/slider1.png",
      link: "https://medium.com/topic/environment",
    },
  ];

  return (
    <ResponsiveCarousel showThumbs={false} infiniteLoop={true} autoPlay={true}>
      {slidesData.map((slide, index) => (
        <div key={index} className="carousel-slide">
          <a href={slide.link} target="_blank" rel="noopener noreferrer">
            <img src={slide.imgSrc} alt={`slide ${index + 1}`} />
            <h3>{slide.title}</h3>
            <p>{slide.description}</p>
          </a>
        </div>
      ))}
    </ResponsiveCarousel>
  );
};

export default CarouselComponent;
