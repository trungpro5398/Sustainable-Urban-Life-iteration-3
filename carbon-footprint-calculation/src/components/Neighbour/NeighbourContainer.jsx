import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { Button, Select } from "antd";
import "./NeighbourContainer.scss";
import { useSelector } from "react-redux";

const { Option } = Select;
// Add a function to calculate the user's carbon footprint
const calculateCarbonFootprint = (electricity, gas) => {
  const electricityCoefficient = 0.9825946582890537;
  const gasCoefficient = 0.018008133249378278;
  const co2eElectricity = electricity * electricityCoefficient;
  const co2eGas = gas * gasCoefficient;
  const total = (co2eElectricity + co2eGas).toFixed(4);
  return total;
};

const NeighbourContainer = () => {
  const [suburb, setSuburb] = useState("");
  const { electricity, gas } = useSelector((state) => state.energy);
  const userFootprint = calculateCarbonFootprint(electricity, gas);
  const suburbFootprint = 80; // Update with your own data
  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : ${payload[0].value}`}</p>
          <p className="intro">This is data related to {label}</p>
          <p className="desc">Anything you want can be displayed here.</p>
        </div>
      );
    }

    return null;
  };

  const data = [
    { name: "User", footprint: userFootprint },
    { name: "Suburb Average", footprint: suburbFootprint },
  ];

  const handleSuburbChange = (value) => {
    setSuburb(value);
    // Fetch and display the data for the selected suburb here
  };

  return (
    <div className="neighbour-tab">
      <div className="input-area">
        <Select
          placeholder="Select a suburb..."
          onChange={handleSuburbChange}
          className="dragdown"
        >
          <Option value="suburb1">Suburb 1</Option>
          <Option value="suburb2">Suburb 2</Option>
          // Add options for other suburbs here
        </Select>
        <Button type="primary" className="button" onClick={() => {}}>
          Apply
        </Button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="footprint" fill="#52e0a4">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.name === "User" ? "#8884d8" : "#82ca9d"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="result">
        Your carbon footprint is{" "}
        {userFootprint > suburbFootprint ? "higher" : "lower"} than the average
        of {suburb}.
      </div>
    </div>
  );
};

export default NeighbourContainer;
