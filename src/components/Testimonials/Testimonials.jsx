import React from "react";
import "./style.scss";

const Testimonials = () => {
  const quotes = [
    {
      text: "We have this handy fusion reactor in the sky called the sun, you don't have to do anything, it just works. It shows up every day.",
      author: "Elon Musk",
    },
    {
      text: "Solar is the most exciting thing in the energy space.",
      author: "Bill Gates",
    },
    {
      text: "I’d put my money on the sun and solar energy. What a source of power! I hope we don’t have to wait until oil and coal run out before we tackle that.",
      author: "Thomas Edison",
    },
  ];

  return (
    <div className="container-testimonials">
      <h2>What the Pioneers Say</h2>
      <div className="testimonials">
        {quotes.map((quote, index) => (
          <div className="testimonial" key={index}>
            <p>{quote.text}</p>
            <span>- {quote.author}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
