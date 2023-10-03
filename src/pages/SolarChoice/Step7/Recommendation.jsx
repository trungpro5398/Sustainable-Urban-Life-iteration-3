// -------------------
// IMPORTS
// -------------------

// React Dependencies
import React, { useState, useEffect } from "react";

// UI Components & Icons
import { Button, Card, Slider, Input, Radio } from "antd";
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
  const batteryChoice = useSelector((state) => state.solarForm.batteryChoice);
  const batteryData = useSelector(
    (state) => state.solarForm.batteryChoice.data
  );
  const [batteryUsage, setBatteryUsage] = useState({
    usageValue: batteryChoice.batterySize,
    costValue: null,
  });
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
      placement: "top",
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
        const priceA = parseFloat(
          a.price || a.price_battery + batteryUsage.costValue
        );
        const priceB = parseFloat(
          b.price || b.price_battery + batteryUsage.costValue
        );

        console.log(priceA, priceB);
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
  const marks = batteryData.reduce((acc, item) => {
    acc[parseFloat(item.battery_size)] = item.battery_size;
    return acc;
  }, {});

  const handleJoyrideCallback = (data) => {
    const { action, index, status, type } = data;
    if (type === EVENTS.STEP_BEFORE) {
      if (index === 0) {
        // Adjust according to the desired step's index
        window.scrollTo(0, 0); // Scrolls to the top of the page
      }
    }
    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      // Update state to advance the tour
      setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
    }

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Tour is finished
      setRun(false);
    }
  };
  // Find min and max battery size from batteryData
  const minBatterySize = Math.min(
    ...batteryData.map((item) => parseFloat(item.battery_size))
  );
  const maxBatterySize = Math.max(
    ...batteryData.map((item) => parseFloat(item.battery_size))
  );

  const handleUsageChange = (value) => {
    // Find the corresponding price for the selected battery size
    const selectedBattery = batteryData.find(
      (battery) => parseFloat(battery.battery_size) === value
    );

    if (selectedBattery) {
      const cost = selectedBattery.price;
      setBatteryUsage({
        usageValue: selectedBattery.battery_size,
        costValue: cost,
      });

      // Also, update the redux store for battery size and cost
      dispatch(
        updateField({
          section: "batteryChoice",
          field: "batterySize",
          value: selectedBattery.battery_size,
        })
      );
      dispatch(
        updateField({
          section: "batteryChoice",
          field: "batteryCost",
          value: cost,
        })
      );
    }
  };

  const handleAfterSlide = (value) => {
    // Find the nearest battery size
    const nearestBatterySize = batteryData.reduce((prev, curr) => {
      return Math.abs(curr.battery_size - value) <
        Math.abs(prev.battery_size - value)
        ? curr
        : prev;
    });

    handleUsageChange(nearestBatterySize.battery_size);
  };

  return (
    <div className="recommendation-container">
      <Joyride
        steps={steps}
        run={true}
        stepIndex={stepIndex}
        continuous={true}
        scrollToFirstStep={true} // Add this line to prevent scrolling to the first step
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
              <div className="battery-choice-container">
                <Radio.Group
                  value={solarFormData.batteryChoice.wantBattery}
                  onChange={(e) => handleBatteryChoice(e.target.value)}
                  className="custom-radio-group-choice"
                >
                  <div
                    data-testid="No"
                    className={`radio-container ${
                      solarFormData.batteryChoice.wantBattery === "No"
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handleBatteryChoice("No")}
                  >
                    <label>
                      <Radio value="No">No</Radio>
                    </label>
                    <p>$0</p>
                  </div>
                  <div
                    data-testid="Yes"
                    className={`radio-container ${
                      solarFormData.batteryChoice.wantBattery === "Yes"
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handleBatteryChoice("Yes")}
                  >
                    <label>
                      <Radio value="Yes">Yes, I want Battery</Radio>
                    </label>
                    <p>$</p>
                  </div>
                </Radio.Group>

                {batteryChoice.wantBattery === "Yes" && (
                  <div className="usage-slider">
                    <div className="electricity-usage-size">Battery Size</div>
                    <div className="range-labels">
                      <span className="range-labels-low">
                        {minBatterySize}kWh
                      </span>
                      <Slider
                        min={minBatterySize}
                        max={maxBatterySize}
                        step={0.1}
                        marks={marks}
                        onChange={handleUsageChange}
                        onAfterChange={handleAfterSlide}
                        value={parseFloat(batteryUsage.usageValue)}
                        className="electricity-usage-slider"
                      />
                      <span className="range-labels-high">
                        {maxBatterySize}kWh
                      </span>
                    </div>

                    <div className="electricity-usage-input-container">
                      <div className="electricity-usage-unit">
                        Battery Cost:{" "}
                      </div>

                      <Input
                        value={String(batteryUsage.costValue)}
                        onChange={(e) => handleUsageChange(e.target.value)}
                        className="electricity-usage-input"
                        data-testid="electricity-usage-input"
                        prefix="$"
                      />
                    </div>
                  </div>
                )}
              </div>
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
                    <div data-testid="low">
                      <Radio value="low">Low to high</Radio>
                    </div>
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
        <div className="main-conten-text">
          <h3>Discover the Best Installers</h3>
          <h4>Find the perfect fit tailored to your preferences.</h4>
        </div>
        {loading ? (
          <CustomLoadingSpinner />
        ) : (
          installers.map((installer, index) => (
            <Card key={index} className="installer-card">
              <h3>{installer.name}</h3>
              <h3>Brand: {installer.brand}</h3>
              <p>System Size: {installer.system_size} kW</p>
              <p>
                Price: $
                {installer.price ||
                  installer.price_battery + batteryUsage.costValue}
              </p>

              <Button
                data-testid="compare-button"
                onClick={() => {
                  addToCompare(
                    installer.system_size + "kw",
                    installer.price ||
                      installer.price_battery + batteryUsage.costValue
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
