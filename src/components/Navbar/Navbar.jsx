import React from "react";
import { Link } from "react-router-dom";
import { Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTree } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ isHomePage }) => {
  const menu = (
    <Menu className="cartoon-dropdown">
      <Menu.Item key="1">
        <Link to="/solar-choice" className="cartoon-dropdown-item">
          Solar Choice
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/solar-energy-benefit" className="cartoon-dropdown-item">
          Solar Energy Benefit
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/government-support" className="cartoon-dropdown-item">
          Government Support Program
        </Link>
      </Menu.Item>
    </Menu>
  );

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
        <Dropdown overlay={menu}>
          <span className="nav-item">
            Solutions <DownOutlined />
          </span>
        </Dropdown>

        <Link to="/about-us" className="nav-item">
          About Us
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
