// Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTree } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ isHomePage }) => {
  return (
    <header className={`header ${isHomePage ? "home-header" : ""}`}>
      <Link to="/" className="logo-link">
        <div className="logo-container">
          <FontAwesomeIcon icon={faTree} size="2x" className="logo-icon" />
          <span className="logo-text">Sustainable Urban Life</span>
        </div>
      </Link>
      <nav className="navbar">
        <Link to="/" className="nav-item">
          Home
        </Link>
        <Link to="/calculation" className="nav-item">
          Solar Choice
        </Link>
        <Link to="/about-us" className="nav-item">
          About Us
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
