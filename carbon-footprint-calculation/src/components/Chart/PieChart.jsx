import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import "./PieChart.scss";

const data = [
  { name: "Gas", value: 1000 },
  { name: "Electricity", value: 1000 },
  { name: "CO2", value: 1000 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const Chart = () => {
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default Chart;
