import React, { useState } from "react";
import { Button, Spin } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A83731",
  "#7A9A01",
];

const mockedData = {
  area: "Glen-iris",
  householdsWithSolar: 7, // percentage
  peakSunHours: 3.95,
  systemSizes: [
    { size: "1.5kW system", production: "4.74kWh" },
    { size: "3kW system", production: "9.48kWh" },
    { size: "5kW system", production: "15.8kWh" },
    { size: "10kW system", production: "31.6kWh" },
  ],
  quotesProvided: 254,
  postcode: 3146,
  installers: 22,
};
const PostcodeInfo = ({ data = mockedData, nextStep, previousStep }) => {
  const handleClick = (callback) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (callback && typeof callback === "function") {
        callback();
      }
    }, 2000); // Wait for 2 seconds before invoking the callback
  };
  const solarData = [
    { name: "With Solar", value: data.householdsWithSolar },
    { name: "Without Solar", value: 100 - data.householdsWithSolar },
  ];
  const [loading, setLoading] = useState(false);

  return (
    <div className="postcode-info">
      <h2>About solar panel installations in the {data.area} area</h2>
      <p>Below is some basic information about solar energy in {data.area}.</p>
      {loading ? (
        <div className="loading-container">
          <Spin size="large" tip="Preparing your solar journey..."></Spin>
        </div>
      ) : (
        <div className="postcode-info-container">
          <div className="charts">
            <div className="pie-container">
              <PieChart width={250} height={250}>
                <Pie
                  data={solarData}
                  dataKey="value"
                  outerRadius={90}
                  innerRadius={50}
                  fill="#8884d8"
                  paddingAngle={5}
                  label
                >
                  {solarData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
              <p>{data.householdsWithSolar}% of households have solar panels</p>
            </div>
            {/* You can add BarChart here similarly */}
          </div>

          <div className="sun-info">
            <p>
              Average rooftop receives approximately {data.peakSunHours} hours
              of ‘peak sun’ per day.
            </p>
          </div>

          <div className="system-efficiency">
            {/* ... other system sizes */}
            {data.systemSizes.map((system, idx) => (
              <p key={idx}>
                {system.size} will produce about {system.production} per day.
              </p>
            ))}
          </div>

          <div className="solar-choice-info">
            <p>
              Since 2008, Solar Choice has provided {data.quotesProvided} quotes
              for homes and businesses in the {data.postcode} area.
            </p>
          </div>

          <div className="installers-info">
            <p>
              There are currently {data.installers} solar installers offering
              quotes in the {data.postcode} area.
            </p>
          </div>
          <Button
            className="previous-button"
            icon={<FontAwesomeIcon icon={faArrowLeft} size="xs" />}
            onClick={() => handleClick(previousStep)}
            shape="circle"
          ></Button>
          <Button
            className="next-button"
            icon={<FontAwesomeIcon icon={faArrowRight} size="xs" />}
            onClick={() => handleClick(nextStep)}
            shape="circle"
          ></Button>
        </div>
      )}
    </div>
  );
};

export default PostcodeInfo;
