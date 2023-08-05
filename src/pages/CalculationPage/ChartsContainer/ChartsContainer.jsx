import React, { useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { useSelector } from "react-redux";
import "./style.scss";
const ChartsContainer = () => {
  // Example data. In real-world scenarios, you may fetch this data from an API or from the Redux store.
  const suburbData = {
    Sunnyvale: 5000,
    Greendale: 6000,
    Brookside: 4200,
    Evergreen: 5300,
    Lakeside: 4800,
  };

  const userSuburb = useSelector(
    (state) => state.solarForm.householdDetails.postcode
  ); // Assuming postcode represents the suburb
  const valueSuburb = useSelector(
    (state) => state.solarForm.householdDetails.avgBill
  );
  const [selectedSuburbs, setSelectedSuburbs] = useState([]);

  const handleSuburbSelection = (event) => {
    const suburb = event.target.value;
    setSelectedSuburbs((prev) => {
      if (prev.includes(suburb)) {
        return prev.filter((s) => s !== suburb);
      }
      return [...prev, suburb];
    });
  };

  // Prepare data for recharts
  const rechartsData = [
    { name: userSuburb, value: parseFloat(valueSuburb) },
    ...selectedSuburbs.map((suburb) => ({
      name: suburb,
      value: suburbData[suburb],
    })),
  ];

  // Set colors
  const COLORS = ["red", "blue", "green", "yellow", "cyan"]; // You can add more colors if needed

  return (
    <div>
      <h2>Suburb Comparison</h2>
      <div>
        <label>Select Suburbs to Compare:</label>
        {Object.keys(suburbData)
          .filter((suburb) => suburb !== userSuburb)
          .map((suburb) => (
            <div key={suburb}>
              <input
                type="checkbox"
                value={suburb}
                checked={selectedSuburbs.includes(suburb)}
                onChange={handleSuburbSelection}
              />
              <label>{suburb}</label>
            </div>
          ))}
      </div>
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={rechartsData}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {rechartsData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default ChartsContainer;
