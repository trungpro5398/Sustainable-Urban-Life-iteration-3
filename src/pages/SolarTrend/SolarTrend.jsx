import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

import Navbar from "../../components/Navbar/Navbar";
import CustomLoadingSpinner from "../../components/CustomLoadingSpinner/CustomLoadingSpinner";
import { fetchSolarTrend } from "./dataFetcher.js";
import { Slide, Fade } from "react-awesome-reveal";

import "./style.scss";

const renderBarTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}%`}</p>
        <p className="intro">Dwellings with solar energy.</p>
      </div>
    );
  }
  return null;
};

const renderPieTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${payload[0].name} : ${payload[0].value.toFixed(
          2
        )}%`}</p>
      </div>
    );
  }
  return null;
};
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A463BF",
  "#D9E564",
  "#67E2D9",
  "#E267AC",
  "#72E467",
  "#E29467",
];
const COLORS_LineChart = [
  "#0088FE",
  "#FF8042",
  "#00C49F",
  "#FFBB28",
  "#A463BF",
];
const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value, // <-- added this prop
  name,
  index,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 20; // This will separate the labels further out and stagger them a bit
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <>
      <line x1={cx} y1={cy} x2={x} y2={y} stroke={"#000000"} />
      <text x={x} y={y} textAnchor={x > cx ? "start" : "end"}>
        {`${name} - ${value.toFixed(2)}%`}
      </text>
    </>
  );
};

const SolarTrend = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const solarForm = useSelector((state) => state.solarForm);
  const { dewellings, tarffic, top10 } = solarForm.data_trend;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchSolarTrend(dispatch);
        setIsLoading(false);
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="solar-trend-page">
        <Navbar isHomePage={false} />
        <CustomLoadingSpinner />
      </div>
    );
  }

  const barData = dewellings.map((item) => ({
    name: item.state,
    percentage: item.percentage,
  }));

  const pieChartData = top10.map((item) => ({
    name: item.Country,
    value: item.Share,
  }));

  // Create a copy of the tarffic array and then sort it
  const sortedData = [...tarffic].sort((a, b) => {
    const yearA = parseInt(a.Year.split("-")[0], 10); // Parsing the starting year from the Year string
    const yearB = parseInt(b.Year.split("-")[0], 10); // Parsing the starting year from the Year string
    return yearA - yearB; // Sorting in ascending order
  });

  // Then create a data structure suitable for the LineChart
  const lineData = sortedData.reduce((acc, cur) => {
    const year = cur.Year;
    const existingYearData = acc.find((data) => data.Year === year);

    if (existingYearData) {
      existingYearData[cur.state] = cur.minimum_feed_in_tarffis;
    } else {
      acc.push({ Year: year, [cur.state]: cur.minimum_feed_in_tarffis });
    }
    return acc;
  }, []);
  const threshold = 3; // Percentage threshold below which data points are combined into "Other"

  // Filter out data points with a percentage less than 3%
  const filteredBarData = pieChartData.filter(
    (item) => item.value >= threshold
  );

  // Calculate the sum of percentages for data points below the threshold
  const otherPercentage =
    100 - filteredBarData.reduce((sum, item) => sum + item.value, 0);

  // Create a "Other" data point if there are data points below the threshold
  if (otherPercentage > 0) {
    filteredBarData.push({
      name: "Other",
      value: otherPercentage,
    });
  }

  return (
    <div className="solar-trend-page">
      <Navbar isHomePage={false} />

      <div className="solar-trend-page-container">
        <div className="intro-section">
          <h3>Welcome to Solar Trend Analysis</h3>
          <p>
            Discover the solar energy trends across different states and
            countries.
          </p>
        </div>

        <div className="charts-container">
          <div className="bar-pie-section">
            <div className="bar-pie-section-container">
              <div className="bar-container">
                <h4>Region solar PV generation</h4>
                <Slide direction="left" triggerOnce>
                  <BarChart width={500} height={550} data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={renderBarTooltip} />
                    <Legend />
                    <Bar dataKey="percentage" fill="#82ca9d" />
                  </BarChart>
                </Slide>
              </div>
              <div className="pie-container">
                <h4>Global solar PV generation </h4>
                <Slide direction="right" triggerOnce>
                  <PieChart width={710} height={600}>
                    <Pie
                      data={filteredBarData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={180}
                      labelLine={false}
                      label={renderCustomLabel}
                    >
                      {filteredBarData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={renderPieTooltip} />
                  </PieChart>
                </Slide>
              </div>
            </div>
            <Fade triggerOnce>
              <p>
                Based on the charts above, Australia is a global leader in
                harnessing solar power, contributing to nearly 40% of the
                world's solar energy. However, in Victoria, only 25.4% of
                dwellings have embraced solar power, a figure that lags behind
                Queensland(QLD, 44.9%)and South Australia(SA, 44.0%). By
                installing a solar system, you can join the growing number of
                Victorians making a positive environmental impact and saving on
                energy costs. Victoria can potentially increase its percentage
                of dwellings with solar installations, further contributing to
                Australia's lead in global solar power generation and promoting
                sustainable and renewable energy use.
              </p>
            </Fade>
          </div>

          <div className="line-section">
            <h4>VIC Solar Feed-In Tariffs</h4>
            <Slide direction="up" triggerOnce>
              <LineChart width={1000} height={500} data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Year" />
                <YAxis />
                <Tooltip />
                <Legend />
                {Array.from(new Set(tarffic.map((item) => item.state))).map(
                  (state, index) => (
                    <Line
                      key={state}
                      type="monotone"
                      dataKey={state}
                      stroke={COLORS[index % COLORS_LineChart.length]}
                      dot={{
                        strokeWidth: 2,
                        r: 4,
                      }} // This prop adds dots to the line
                    />
                  )
                )}
              </LineChart>
            </Slide>
            <Fade triggerOnce>
              <p>
                The data shows a fluctuating trend in Victoria's (VIC) minimum
                feed-in tariffs from 2015 to 2023, peaking at 12.0 in 2019-2020
                and decreasing to 5.2 by 2022-2023. Similar patterns are seen in
                other states, albeit with different tariff rates. These
                fluctuations are tied to policy changes and market conditions.
                After the Premium Solar Feed-in Tariff program ended in 2011,
                the Victorian Essential Services Commission started setting
                yearly minimum tariffs. A variable tariff was introduced in
                2018, incentivizing electricity exports during peak times.
                Although minimum tariffs are guaranteed, they've been lower in
                recent years. Decisions on solar power investments should
                consider more than just feed-in rates. Fortunately, residents of
                Victoria receive a guaranteed minimum feed-in tariff, unlike in
                other states where there is no such minimum tariff.
              </p>
            </Fade>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarTrend;
