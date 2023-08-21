import React, { useState } from "react";
import Swal from "sweetalert2";
import "./App.scss";

import Home from "./pages/HomePage/Home"; // assuming you've created a Home.js inside pages directory
import AboutUs from "./pages/AboutUsPage/AboutUs";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SolarChoice from "./pages/SolarChoice/SolarChoice";

const App = () => {
  const [isBlurred, setIsBlurred] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(true);
  const [password, setPassword] = useState("");

  const handlePasswordCheck = async () => {
    const response = await fetch(
      "https://carbon-footprint-calculator-backend.onrender.com/api/check-password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      }
    );

    const data = await response.json();
    if (data.isValid) {
      setIsBlurred(false);
      setShowPasswordModal(false);
      Swal.fire({
        title: "Success!",
        text: "Password is correct.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "Incorrect password!",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <div className={`content ${isBlurred ? "blurred" : ""}`}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/solar-choice" element={<SolarChoice />} />
              <Route path="/about-us" element={<AboutUs />} />
            </Routes>
          </div>
          {/* {showPasswordModal && (
            <div className="passwordModal">
              <input
                type="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handlePasswordCheck}>Submit</button>
            </div>
          )} */}
        </div>
      </Router>
      <div className="App"></div>
    </Provider>
  );
};

export default App;
