import React, { useState } from "react";
import { Button, Spin } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useSelector } from "react-redux";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A83731",
  "#7A9A01",
];

const PostcodeInfo = ({ nextStep, previousStep }) => {
  const data = useSelector((state) => state.solarForm.postcodeInfo.data);

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
    { name: "With Solar", value: parseFloat(data.percentage_installation) },
    {
      name: "Without Solar",
      value: 100 - parseFloat(data.percentage_installation),
    },
  ];
  const [loading, setLoading] = useState(false);

  return (
    <div className="postcode-info">
      <h2>About solar panel installations in {data.place_name}</h2>
      <p>
        Below is some basic information about solar energy in {data.place_name}.
      </p>

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
              <p>
                {data.percentage_installation}% of households have solar panels
              </p>
            </div>
          </div>

          <div className="sun-info">
            <p>
              Average rooftop receives approximately {data.hour} hours of ‘peak
              sun’ per day.
            </p>
          </div>

          <div className="system-efficiency">
            <p>1.5kw system will produce about {data["1.5kw"]} kWh per day.</p>
            <p>3kw system will produce about {data["3kw"]} kWh per day.</p>
            <p>5kw system will produce about {data["5kw"]} kWh per day.</p>
            <p>10kw system will produce about {data["10kw"]} kWh per day.</p>
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
