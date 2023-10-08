import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import "./Navbar.scss";

import iconweb1 from "../../assets/images/icon-web/iconweb1.png";
import iconweb2 from "../../assets/images/icon-web/iconweb2.png";

const Navbar = ({ isHomePage }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [openPopup1, setOpenPopup1] = useState(false);
  const [openPopup2, setOpenPopup2] = useState(false);
  const timeoutId1 = useRef(null);
  const timeoutId2 = useRef(null);

  const handleMouseEnter = (setOpenFunc, timeoutIdRef) => {
    clearTimeout(timeoutIdRef.current);
    setOpenFunc(true);
  };

  const handleMouseLeave = (setOpenFunc, timeoutIdRef) => {
    timeoutIdRef.current = setTimeout(() => {
      setOpenFunc(false);
    }, 5000); // 300ms delay before hiding
  };

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
          open={openPopup1}
          on="hover"
          onMouseEnter={() => handleMouseEnter(setOpenPopup1, timeoutId1)}
          onMouseLeave={() => handleMouseLeave(setOpenPopup1, timeoutId1)}
          trigger={
            <span
              className="nav-item"
              onMouseEnter={() => handleMouseEnter(setOpenPopup1, timeoutId1)}
              onMouseLeave={() => handleMouseLeave(setOpenPopup1, timeoutId1)}
            >
              Solar Info <i className="dropdown-icon">▼</i>
            </span>
          }
        >
          <div
            className="menu"
            onMouseEnter={() => handleMouseEnter(setOpenPopup1, timeoutId1)}
            onMouseLeave={() => handleMouseLeave(setOpenPopup1, timeoutId1)}
          >
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
          open={openPopup2}
          on="hover"
          onMouseEnter={() => handleMouseEnter(setOpenPopup2, timeoutId2)}
          onMouseLeave={() => handleMouseLeave(setOpenPopup2, timeoutId2)}
          trigger={
            <span
              className="nav-item"
              onMouseEnter={() => handleMouseEnter(setOpenPopup2, timeoutId2)}
              onMouseLeave={() => handleMouseLeave(setOpenPopup2, timeoutId2)}
            >
              Solar Solutions <i className="dropdown-icon">▼</i>
            </span>
          }
        >
          <div
            className="menu"
            onMouseEnter={() => handleMouseEnter(setOpenPopup2, timeoutId2)}
            onMouseLeave={() => handleMouseLeave(setOpenPopup2, timeoutId2)}
          >
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
