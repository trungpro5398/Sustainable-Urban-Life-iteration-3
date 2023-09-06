import React, { useState } from "react";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import "./Navbar.scss";

import iconweb1 from "../../assets/images/icon-web/iconweb1.png";
import iconweb2 from "../../assets/images/icon-web/iconweb2.png";

const Navbar = ({ isHomePage }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <header className={`header ${isHomePage ? "home-header" : ""}`}>
      <Link to="/" className="logo-link">
        <div className="logo-container">
          <img
            src={isHovered ? iconweb2 : iconweb1}
            className="logo-icon"
            alt=""
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
          <span className="logo-text">Sustainable Urban Life</span>
        </div>
      </Link>
      <nav className="navbar">
        <Link to="/" className="nav-item">
          Home
        </Link>
        <Popup
          trigger={
            <span className="nav-item">
              Solutions <i className="dropdown-icon">▼</i>
            </span>
          }
          position="bottom center"
          on="hover"
        >
          <div className="menu">
            <Link to="/solar-choice" className="menu-item">
              Solar Choice
            </Link>
            <Link to="/solar-energy-benefit" className="menu-item">
              Solar Energy Benefit
            </Link>
            <Link to="/government-support" className="menu-item">
              Government Support Program
            </Link>
            <Link to="/estimation" className="menu-item">
              Calculate Solar Potential
            </Link>
          </div>
        </Popup>
      </nav>
    </header>
  );
};

export default Navbar;
