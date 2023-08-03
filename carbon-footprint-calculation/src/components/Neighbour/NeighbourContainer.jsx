import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Button, Select } from "antd";
import "./NeighbourContainer.scss";

const { Option } = Select;

const NeighbourContainer = () => {
  const [suburb, setSuburb] = useState("");
  const userFootprint = 120; // Update with your own data
  const suburbFootprint = 80; // Update with your own data

  const data = [
    { name: "User", value: userFootprint },
    { name: "Suburb Average", value: suburbFootprint },
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
        <PieChart>
          <Pie
            dataKey="value"
            data={data}
            fill="#8884d8"
            labelLine={false}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
          >
            <Cell fill="#0088FE" />
            <Cell fill="#00C49F" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="legend">
        <span className="user-color" /> User
        <span className="suburb-color" /> Suburb Average
      </div>
    </div>
  );
};

export default NeighbourContainer;
