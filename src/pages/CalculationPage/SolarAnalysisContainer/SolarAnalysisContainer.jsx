import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";

const SolarAnalysisContainer = () => {
  const solarFormData = useSelector((state) => state.solarForm);
  const dailyGeneration = solarFormData.solarSystemDetails.systemSize * 3.8; // using an average of 3.8 kWh/day per kW

  // Calculate Annual Solar Power Generation
  const annualGeneration = dailyGeneration * 365;

  // Lifetime Solar Power Generation (assuming 25 years)
  const lifetimeGeneration = annualGeneration * 25;

  // Calculate Carbon Footprint Reduction. Assume 0.7 kg CO2/kWh
  const lifetimeCarbonReduction = lifetimeGeneration * 0.7;

  return (
    <div className="solar-analysis-container">
      <h2>Solar Power Analysis</h2>

      {/* Annual Solar Power Generation */}
      <div className="analysis-card">
        <h3>Annual Solar Power Generation</h3>
        <p>{annualGeneration.toFixed(2)} kWh</p>
      </div>

      {/* Lifetime Solar Power Generation */}
      <div className="analysis-card">
        <h3>Lifetime Solar Power Generation (25 years)</h3>
        <p>{lifetimeGeneration.toFixed(2)} kWh</p>
      </div>

      {/* Carbon Footprint Reduction */}
      <div className="analysis-card">
        <h3>Lifetime Carbon Footprint Reduction</h3>
        <p>{lifetimeCarbonReduction.toFixed(2)} kg CO2</p>
      </div>
    </div>
  );
};

export default SolarAnalysisContainer;
