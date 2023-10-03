import React from "react";
import "./style.scss";

// Importing Font Awesome icons
import { FaLeaf, FaCalculator, FaDollarSign, FaGift } from "react-icons/fa";

const data = [
  {
    icon: <FaLeaf size={50} />,
    title: "Eco-friendly",
    description: "Promoting a green and sustainable future.",
  },
  {
    icon: <FaCalculator size={50} />,
    title: "Easy Calculation",
    description: "Effortlessly calculate your energy savings.",
  },
  {
    icon: <FaDollarSign size={50} />,
    title: "Find Good Price",
    description: "Discover affordable solar solutions.",
  },
  {
    icon: <FaGift size={50} />,
    title: "Good Rebate",
    description: "Enjoy incredible rebates on your installations.",
  },
];

const SquareContainers = () => {
  return (
    <div className="square-container-wrapper">
      {data.map((item, index) => (
        <div className="square" key={index}>
          <div className="icon-wrapper">{item.icon}</div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default SquareContainers;
