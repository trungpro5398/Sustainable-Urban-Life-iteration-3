import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Styles
import "./App.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Redux store
import { store } from "./store";

// Pages
import Home from "./pages/HomePage/Home";
import AboutUs from "./pages/AboutUsPage/AboutUs";
import SolarChoice from "./pages/SolarChoice/SolarChoice";
import GovernmentSupport from "./pages/GovernmentSupport/GovernmentSupport";
import SolarEnergyBenefit from "./pages/SolarEnergyBenefit/SolarEnergyBenefit";

/**
 * Main application component.
 *
 * This component sets up the Redux provider and React Router.
 * It defines routes for different pages of the application.
 */
const App = () => {
  return (
    // Redux provider to make the Redux store available to all container components.
    <Provider store={store}>
      {/* Set up the React Router */}
      <Router>
        {/* Main app container */}
        <div className="App">
          {/* Content container */}
          <div className="content">
            {/* Define the routes for the application */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/solar-choice" element={<SolarChoice />} />
              <Route
                path="/government-support"
                element={<GovernmentSupport />}
              />
              <Route path="/about-us" element={<AboutUs />} />
              <Route
                path="/solar-energy-benefit"
                element={<SolarEnergyBenefit />}
              />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
