// -------------------
// IMPORTS
// -------------------

// React Dependencies
import React, { useState, useEffect } from "react";

// UI Components & Icons
import { Button, Card, Spin, Radio } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandPointRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

// Redux Actions
import { useSelector, useDispatch } from "react-redux";

import { updateField } from "../../../reduxToolkit/slices/solarFormSlice";

// Styles
import "./style.scss";
import CustomLoadingSpinner from "../../../components/CustomLoadingSpinner/CustomLoadingSpinner";
import Joyride, { ACTIONS, EVENTS, STATUS } from "react-joyride";

/**
 * Recommendation Component.
 * This component provides a list of recommended installers based on user's preferences.
 * @param {Function} previousStep - Function to handle the previous step action.
 * @returns {JSX.Element} Rendered component.
 */
const Recommendation = ({ previousStep, nextStep }) => {
  // Component State
  const [loading, setLoading] = useState(false);
  const [sortOpen, setSortOpen] = useState(true);
  const [sortOpenPrice, setSortOpenPrice] = useState(true);
  const [installers, setInstallers] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [filterOpen, setFilterOpen] = useState(true);
  const [batteryOpen, setBatteryOpen] = useState(true);
  const [filterOpenSolarSystemSize, setFilterOpenSolarSystemSize] =
    useState(true);
  // Joyride state
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  // Redux Hooks
  const dispatch = useDispatch();
  const solarFormData = useSelector((state) => state.solarForm);

  // Determine the appropriate dataset based on battery choice.
  const dataToUse =
    solarFormData.batteryChoice.wantBattery === "Yes"
      ? solarFormData.pricing.withBattery
      : solarFormData.pricing.withoutBattery;
  // Joyride steps
  const [steps] = useState([
    {
      target: ".battery-choice-section",
      content: "Choose whether you want a battery with your solar system.",
      placement: "right",
    },
    {
      target: ".filter-section",
      content: "This section allows you to filter the installers.",
      placement: "right",
    },
    {
      target: ".filter-section-solar",
      content: "Filter installers by solar system size.",
      placement: "right",
    },
    {
      target: ".sort-section",
      content: "This section allows you to sort the installers.",
      placement: "right",
    },
    {
      target: ".sort-section-price",
      content: "Sort installers by price.",
      placement: "right",
    },
    {
      target: ".main-content",
      content:
        "Check out the recommended installers based on your preferences.",
      placement: "left",
    },
  ]);
  /**
   * This effect is responsible for filtering and sorting the installers data.
   * It triggers every time the filter, sort order, or data changes.
   * The logic involves:
   * - Filtering the data based on the user's selected system size.
   * - Sorting the filtered data based on price in the order selected by the user.
   */
  useEffect(() => {
    let filteredData = dataToUse;

    // Filter data based on system size
    if (filter) {
      const filterValue = parseFloat(filter);
      filteredData = dataToUse.filter(
        (item) => parseFloat(item.system_size) === filterValue
      );
    }

    // Sort the filtered data based on price
    if (sort) {
      let sortedData = [...filteredData];
      sortedData.sort((a, b) => {
        const priceA = parseFloat(a.price || a.price_battery);
        const priceB = parseFloat(b.price || a.price_battery);

        return sort === "low" ? priceA - priceB : priceB - priceA;
      });

      filteredData = sortedData;
    }

    // Update the installers state with the sorted and filtered data
    setInstallers(filteredData);
  }, [filter, sort, dataToUse]);

  /**
   * Computes the recommended solar system size based on daily electricity usage.
   *
   * @param {number} dailyUsage - The daily electricity usage.
   * @returns {string} - The recommended system size.
   */
  const getRecommendedSize = (dailyUsage) => {
    if (dailyUsage < 6) return "1.5";
    if (dailyUsage >= 6 && dailyUsage < 15) return "3";
    if (dailyUsage >= 15 && dailyUsage < 24) return "6";
    return "10"; // For daily usage 24kw and above
  };
  const recommendedSize = getRecommendedSize(
    solarFormData.electricityUsage.usageDaily
  );
  /**
   * Handles the logic when an installer is selected to be compared.
   *
   * @param {number} id - The ID of the installer.
   */
  const addToCompare = (systemSize, price) => {
    // Dispatching the updateField action with the necessary payload
    dispatch(
      updateField({
        section: "annualBillSavings",
        field: "solarPowerSystem",
        value: systemSize,
      })
    );
    dispatch(
      updateField({
        section: "rebate",
        field: "price_installation",
        value: price,
      })
    );
    dispatch(
      updateField({
        section: "pricing",
        field: "isCompleted",
        value: true,
      })
    );
    handleClick(nextStep);
  };

  /**
   * Provides a loading effect when moving to a different UI state.
   *
   * @param {Function} callback - The callback function to execute after loading.
   */
  const handleClick = (callback) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      callback && callback();
    }, 2000);
  };
  /**
   * Updates the Redux store based on user's battery choice.
   *
   * @param {string} choice - The battery choice made by the user.
   */
  const handleBatteryChoice = (choice) => {
    dispatch(
      updateField({
        section: "batteryChoice",
        field: "wantBattery",
        value: choice,
      })
    );
  };
  useEffect(() => {
    // Check if the user has visited the page before
    const firstTime = localStorage.getItem("firstTime");
    if (!firstTime) {
      setRun(true);
      localStorage.setItem("firstTime", "false");
    }
    const handleKeyPress = (event) => {
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
    const { action, index, status, type } = data;

    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      // Update state to advance the tour
      setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
    }

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Tour is finished
      setRun(false);
    }
  };
  return (
    <div className="recommendation-container">
      <Joyride
        steps={steps}
        run={true}
        stepIndex={stepIndex}
        continuous={true}
        scrollToFirstStep={true}
        showProgress={true}
        showSkipButton={true}
        callback={handleJoyrideCallback}
      />

      <div className="sidebar">
        <div className="filter-sort-container">
          <div className="battery-choice-section">
            <h3 onClick={() => setBatteryOpen(!batteryOpen)}>
              Battery Choice{" "}
              {batteryOpen ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            </h3>
            {batteryOpen && (
              <Radio.Group
                value={solarFormData.batteryChoice.wantBattery}
                onChange={(e) => handleBatteryChoice(e.target.value)}
                className="custom-radio-group"
              >
                <Radio value="Yes">Yes</Radio>
                <Radio value="No">No</Radio>
              </Radio.Group>
            )}
          </div>

          <div className="filter-section">
            <h3 onClick={() => setFilterOpen(!filterOpen)}>
              Filter By:{" "}
              {filterOpen ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            </h3>
            {filterOpen && (
              <div className="filter-section-solar">
                <h3
                  onClick={() =>
                    setFilterOpenSolarSystemSize(!filterOpenSolarSystemSize)
                  }
                >
                  Solar System By Size:{" "}
                  {filterOpenSolarSystemSize ? (
                    <ArrowUpOutlined />
                  ) : (
                    <ArrowDownOutlined />
                  )}
                </h3>
                {filterOpenSolarSystemSize && (
                  <Radio.Group
                    value={filter}
                    onChange={(e) => setFilter(e ? e.target.value : "")}
                    className="custom-radio-group"
                  >
                    <Radio value="1.5">
                      1.5kWh{" "}
                      {recommendedSize === "1.5" && (
                        <span>
                          <FontAwesomeIcon
                            icon={faHandPointRight}
                            className="recommendation-arrow"
                          />{" "}
                          recommendation
                        </span>
                      )}
                    </Radio>
                    <Radio value="3">
                      3kWh{" "}
                      {recommendedSize === "3" && (
                        <span>
                          <FontAwesomeIcon
                            icon={faHandPointRight}
                            className="recommendation-arrow"
                          />{" "}
                          recommendation
                        </span>
                      )}
                    </Radio>
                    <Radio value="6">
                      6kWh{" "}
                      {recommendedSize === "6" && (
                        <span>
                          <FontAwesomeIcon
                            icon={faHandPointRight}
                            className="recommendation-arrow"
                          />{" "}
                          recommendation
                        </span>
                      )}
                    </Radio>
                    <Radio value="10">
                      10kWh{" "}
                      {recommendedSize === "10" && (
                        <span>
                          <FontAwesomeIcon
                            icon={faHandPointRight}
                            className="recommendation-arrow"
                          />{" "}
                          recommendation
                        </span>
                      )}
                    </Radio>
                    <Radio value="">Clear Selection</Radio>
                  </Radio.Group>
                )}
              </div>
            )}
          </div>

          <div className="sort-section">
            <h3 onClick={() => setSortOpen(!sortOpen)}>
              Sort By: {sortOpen ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            </h3>
            {sortOpen && (
              <div className="sort-section-price">
                <h3 onClick={() => setSortOpenPrice(!sortOpenPrice)}>
                  Price:{" "}
                  {sortOpenPrice ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                </h3>
                {sortOpenPrice && (
                  <Radio.Group
                    value={sort}
                    onChange={(e) => setSort(e ? e.target.value : "")}
                    className="custom-radio-group"
                  >
                    <Radio value="low">Low to high</Radio>
                    <Radio value="high">High to low</Radio>
                    <Radio value="">Clear Selection</Radio> {/* This line */}
                  </Radio.Group>
                )}
              </div>
            )}
          </div>
        </div>

        <Button
          className="previous-button"
          icon={<FontAwesomeIcon icon={faArrowLeft} size="xs" />}
          onClick={() => handleClick(previousStep)}
          shape="circle"
        />
      </div>

      <div className="main-content">
        <h1>Discover the Best Installers</h1>
        <h2>Find the perfect fit tailored to your preferences.</h2>
        {loading ? (
          <CustomLoadingSpinner />
        ) : (
          installers.map((installer, index) => (
            <Card key={index} className="installer-card">
              <h3>{installer.name}</h3>
              <h3>Brand: {installer.brand}</h3>
              <p>System Size: {installer.system_size} kW</p>
              <p>Price: ${installer.price || installer.price_battery}</p>

              <Button
                onClick={() => {
                  addToCompare(
                    installer.system_size + "kw",
                    installer.price || installer.price_battery
                  );
                }}
              >
                Discover cost savings
              </Button>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Recommendation;
