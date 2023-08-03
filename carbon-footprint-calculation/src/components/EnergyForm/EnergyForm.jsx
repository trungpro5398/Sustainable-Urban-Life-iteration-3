import React from "react";
import { Input } from "antd";
import "./EnergyForm.scss";

const EnergyForm = () => {
  return (
    <div className="energy-form">
      <h2 className="question">How much do you consume energy in your home?</h2>
      <label className="label">Electricity</label>
      <div>
        <Input className="input" />
      </div>
      <label className="label-gas">Gas</label>
      <div>
        <Input className="input" />
      </div>
    </div>
  );
};

export default EnergyForm;
