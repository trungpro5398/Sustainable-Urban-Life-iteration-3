import React, { useState, useRef } from "react";
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
        <Popup
          on="hover"
          mouseLeaveDelay={500}
          mouseEnterDelay={0}
          contentStyle={{ padding: "0px", border: "none" }}
          trigger={
            <span className="nav-item">
              Solar Info <i className="dropdown-icon">▼</i>
            </span>
          }
        >
          <div className="menu">
            <Link to="/solar-energy-benefit" className="menu-item">
              Solar Energy Benefit
            </Link>
            <Link to="/government-support" className="menu-item">
              Government Support Program
            </Link>
            <Link to="/solar-trend" className="menu-item">
              Solar Trend Statistics
            </Link>
          </div>
        </Popup>
        <Popup
          on="hover"
          mouseLeaveDelay={500}
          mouseEnterDelay={0}
          contentStyle={{ padding: "0px", border: "none" }}
          trigger={
            <span className="nav-item">
              Solar Solutions <i className="dropdown-icon">▼</i>
            </span>
          }
        >
          <div className="menu">
            <Link to="/solar-choice" className="menu-item">
              Solar Choice
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
