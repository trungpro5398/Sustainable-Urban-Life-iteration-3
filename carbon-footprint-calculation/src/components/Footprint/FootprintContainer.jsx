import React from "react";
import { useSelector } from "react-redux";
import FootprintCard from "./FootprintCard";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import "./FootprintContainer.scss";

const FootprintContainer = () => {
  const { electricity, gas } = useSelector((state) => state.energy);
  const electricityCoefficient = 0.9825946582890537;
  const gasCoefficient = 0.018008133249378278;

  const co2eElectricity = electricity * electricityCoefficient;
  const co2eGas = gas * gasCoefficient;

  const data = [
    { name: "Gas", Consumption: gas },
    { name: "Electricity", Consumption: electricity },
    { name: "CO2", Consumption: co2eElectricity + co2eGas },
  ];

  return (
    <div className="footprint-container">
      <div className="cards">
        <FootprintCard type="Gas" value={`${gas} kWh`} />
        <FootprintCard type="Electricity" value={`${electricity} kWh`} />
        <FootprintCard
          type="CO2"
          value={`${(co2eElectricity + co2eGas).toFixed(4)} kg CO2e`}
        />
      </div>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Consumption" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default FootprintContainer;
