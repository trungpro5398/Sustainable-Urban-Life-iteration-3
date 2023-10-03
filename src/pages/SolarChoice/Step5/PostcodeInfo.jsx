// -------------------
// IMPORTS
// -------------------

// React Dependencies
import React, { useState, useEffect } from "react";
// UI Components & Icons

import "./style.scss";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import {
  BarChart,
  XAxis,
  YAxis,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../../reduxToolkit/slices/solarFormSlice";
// Redux Dependencies
import CustomLoadingSpinner from "../../../components/CustomLoadingSpinner/CustomLoadingSpinner";
import Joyride, { STATUS } from "react-joyride";
import NavigationButtons from "../../../components/NavigationButtons/NavigationButtons";

// Array of colors for the pie chart

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A83731",
  "#7A9A01",
];
/**
 * PostcodeInfo Component
 * @param {Object} props - Properties passed to the component
 * @param {Array} props.data - Array of location data
 * @param {Function} props.nextStep - Function to move to the next step
 * @param {Function} props.previousStep - Function to move to the previous step
 * @returns JSX.Element
 */
const PostcodeInfo = ({ nextStep, previousStep }) => {
  // -------------------
  // REDUX STATE MANAGEMENT
  // -------------------
  // Get postcode data from Redux store
  const data = useSelector((state) => state.solarForm.postcodeInfo.data);
  // -------------------
  // LOCAL STATE MANAGEMENT
  // -------------------
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  dispatch(
    updateField({
      section: "postcodeInfo",
      field: "isCompleted",
      value: true,
    })
  );
  const [runTour, setRunTour] = useState(true);
  const systemEfficiencies = [
    { name: "1.5kw", value: parseFloat(data["1.5kw"]) },
    { name: "3kw", value: parseFloat(data["3kw"]) },
    { name: "6kw", value: parseFloat(data["6kw"]) },
    { name: "10kw", value: parseFloat(data["10kw"]) },
  ];

  const [steps, setSteps] = useState([
    {
      target: ".charts",
      content:
        "Here you'll see the percentage of households with solar panels and without solar panels.",
      placement: "top",
    },
    {
      target: ".sun-info",
      content:
        "Here you'll see the average hours of peak sun your rooftop receives per day.",
      placement: "top",
    },

    {
      target: ".system-efficiency-chart",
      content:
        "Here you'll see the estimated kWh per day for different system sizes.",
      placement: "left",
    },
  ]);
  // -------------------
  // UTILITY FUNCTIONS
  // -------------------
  /**
   * Handle loading animation and then invoke the callback
   * @param {Function} callback - Callback to be invoked after loading
   */
  const handleClick = (callback) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (callback && typeof callback === "function") {
        callback();
      }
    }, 2000); // Delay of 2 seconds before invoking the callback
  };

  // Prepare data for the pie chart
  const solarData = [
    { name: "With Solar", value: parseFloat(data.percentage_installation) },
    {
      name: "Without Solar",
      value: 100 - parseFloat(data.percentage_installation),
    },
  ];
  useEffect(() => {
    dispatch(
      updateField({
        section: "location",
        field: "isCompleted",
        value: true,
      })
    );
    const handleKeyPress = (event) => {
      // Check if the user has visited the page before
      const firstTime = localStorage.getItem("firstTime");
      if (!firstTime) {
        setRunTour(true);
        localStorage.setItem("firstTime", "false");
      }
      // Checking for the arrow right key

      if (event.keyCode === 39) {
        handleClick(nextStep); // go to the next step
      }

      // Checking for the arrow left key
      if (event.keyCode === 37) {
        handleClick(previousStep); // go to the previous step
      }
    };

    // Adding the event listener
    window.addEventListener("keydown", handleKeyPress);

    // Cleanup: remove the event listener when component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      setRunTour(false);
    }
  };
  return (
    <div className="postcode-info">
      <h2>About solar panel installations in {data.place_name}</h2>
      <p>
        Below is some basic information about solar energy in {data.place_name}.
      </p>

      {loading ? (
        <CustomLoadingSpinner />
      ) : (
        <div className="postcode-info-container">
          <Joyride
            steps={steps}
            run={runTour}
            continuous={true}
            scrollToFirstStep={true}
            showProgress={true}
            showSkipButton={true}
            callback={handleJoyrideCallback}
          />
          <div className="charts">
            <div className="pie-container">
              <h3>Solar Data Overview</h3>

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

          <div className="system-efficiency-chart">
            <h4>System Efficiency Overview (Daily)</h4>

            <ResponsiveContainer width={500} height={300}>
              <BarChart
                layout="vertical"
                width={500}
                height={400}
                data={systemEfficiencies}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  label={{
                    value: "Average Power Generation (kWh/day)",

                    position: "insideBottom",
                    offset: -1,
                    style: {
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                    },
                  }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  label={{
                    value: "Solar System Size",
                    angle: -90,
                    position: "insideLeft",
                    offset: 0,
                  }}
                />
                <Tooltip />
                <Bar
                  dataKey="value"
                  fill="#82ca9d"
                  label={{ position: "right" }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <NavigationButtons
            nextStep={nextStep}
            previousStep={previousStep}
            condition={true}
            setShowError={null}
            setLoading={setLoading}
          />
        </div>
      )}
    </div>
  );
};

export default PostcodeInfo;
