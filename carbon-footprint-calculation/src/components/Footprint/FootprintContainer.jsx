import React from "react";
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
  const data = [
    { name: "Gas", Consumption: 1000 },
    { name: "Electricity", Consumption: 1000 },
    { name: "CO2", Consumption: 1000 },
  ];

  return (
    <div className="footprint-container">
      <div className="cards">
        <FootprintCard type="Gas" value="1000 kWh" />
        <FootprintCard type="Electricity" value="1000 kWh" />
        <FootprintCard type="CO2" value="1000 kWh" />
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
