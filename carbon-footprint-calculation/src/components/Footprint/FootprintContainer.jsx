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
  Cell,
} from "recharts";

import "./FootprintContainer.scss";

const FootprintContainer = () => {
  const { electricity, gas } = useSelector((state) => state.energy);
  const electricityCoefficient = 0.9825946582890537;
  const gasCoefficient = 0.018008133249378278;

  const co2eElectricity = electricity * electricityCoefficient;
  const co2eGas = gas * gasCoefficient;
  const total = (co2eElectricity + co2eGas).toFixed(4);
  const data = [
    { name: "Gas", Consumption: gas },
    { name: "Electricity", Consumption: electricity },
    { name: "CO2", Consumption: total },
  ];
  const COLORS = {
    Gas: "#ea5353",
    Electricity: " #3b3be0",
    CO2: "#47d647",
  };

  return (
    <div className="footprint-container">
      <div className="cards">
        <FootprintCard type="Gas" value={`${gas} kWh`} />
        <FootprintCard type="Electricity" value={`${electricity} kWh`} />
        <FootprintCard type="CO2" value={`${total} kg CO2e`} />
      </div>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="Consumption" fill="#8884d8">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
};

export default FootprintContainer;
