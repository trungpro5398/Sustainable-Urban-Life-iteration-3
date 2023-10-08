import React from "react";
import "./style.scss";

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <div className="error-code">404</div>
      <h1>Oops! Page not found...</h1>
      <p>We can't seem to find the page you're looking for.</p>
      <a href="/" className="home-link">
        Go Back Home
      </a>
    </div>
  );
};

export default NotFoundPage;
