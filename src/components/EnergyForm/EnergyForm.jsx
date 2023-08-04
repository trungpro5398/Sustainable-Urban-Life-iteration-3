import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";
import { useDispatch } from "react-redux";
import {
  updateEnergy,
  setActiveTab,
} from "../../reduxToolkit/slices/energySlice";
import "./EnergyForm.scss";

const EnergyForm = () => {
  const dispatch = useDispatch();
  const [energy, setEnergy] = useState({ electricity: "", gas: "" });

  const handleInput = (type, value) => {
    setEnergy({ ...energy, [type]: value });
  };

  const handleCalculate = () => {
    if (energy.electricity && energy.gas) {
      dispatch(updateEnergy(energy));
      dispatch(setActiveTab("Your Neighbour"));
    }
  };
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("https://carbon-footprint-calculator-backend.onrender.com/api/hello")
      .then((response) => response.json())
      .then((data) => setMessage(data.msg));
  }, []);
  console.log(message);
  return (
    <div className="energy-form">
      <h2 className="question">How much energy do you consume in your home?</h2>
      <label className="label">Electricity</label>
      <Input
        className="input"
        onChange={(e) => handleInput("electricity", e.target.value)}
      />
      <label className="label-gas">Gas</label>
      <Input
        className="input"
        onChange={(e) => handleInput("gas", e.target.value)}
      />
      <Button className="calculate-button" onClick={handleCalculate}>
        Calculate
      </Button>
      <div className="App">
        <header className="App-header">
          <p>{message}</p>
        </header>
      </div>
    </div>
  );
};

export default EnergyForm;
