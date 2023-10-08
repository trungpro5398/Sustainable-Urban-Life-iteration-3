import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>
            We aim to provide insights, solutions, and knowledge about urban
            sustainability. Join us in the path towards a greener future.
          </p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/solar-choice">Solar choice</Link>
            </li>

            <li>
              <Link to="/solar-trend">Solar Trend</Link>
            </li>
            <li>
              <Link to="/estimation"> Calculate Solar Potential</Link>
            </li>
            <li>
              <Link to="/solar-energy-benefit">Solar energy benefit</Link>
            </li>
            <li>
              <Link to="/government-support">Government Support</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Stay Connected</h4>
          <div className="social-icons">
            <a
              href="https://www.facebook.com/Monash.University/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://twitter.com/MonashUni?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://www.instagram.com/monash_uni/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.linkedin.com/school/monash-university/?originalSubdomain=au"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; 2023 Sustainable Urban Life. All Rights Reserved. | Privacy
          Policy | Terms of Service
        </p>
      </div>
    </footer>
  );
};

export default Footer;
