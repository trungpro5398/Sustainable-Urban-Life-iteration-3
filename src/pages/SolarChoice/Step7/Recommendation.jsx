// -------------------
// IMPORTS
// -------------------

// React Dependencies
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// UI Components & Icons
import { Button, Card, Spin, Radio } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandPointRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

// Redux Actions
import { updateField } from "../../../reduxToolkit/slices/solarFormSlice";

// Styles
import "./style.scss";
import CustomLoadingSpinner from "../../../components/CustomLoadingSpinner/CustomLoadingSpinner";

/**
 * Recommendation Component.
 * This component provides a list of recommended installers based on user's preferences.
 * @param {Function} previousStep - Function to handle the previous step action.
 * @returns {JSX.Element} Rendered component.
 */
const Recommendation = ({ previousStep }) => {
  // Component State
  const [loading, setLoading] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortOpenPrice, setSortOpenPrice] = useState(false);
  const [installers, setInstallers] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [batteryOpen, setBatteryOpen] = useState(false);
  const [filterOpenSolarSystemSize, setFilterOpenSolarSystemSize] =
    useState(false);

  // Redux Hooks
  const dispatch = useDispatch();
  const solarFormData = useSelector((state) => state.solarForm);

  // Determine the appropriate dataset based on battery choice.
  const dataToUse =
    solarFormData.batteryChoice.wantBattery === "Yes"
      ? solarFormData.pricing.withBattery
      : solarFormData.pricing.withoutBattery;

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
  const addToCompare = (id) => {
    console.log(`Adding installer with ID ${id} to compare`);
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
  return (
    <div className="recommendation-container">
      <div className="sidebar">
        <div className="filter-sort-container">
          <div className="battery-choice-section">
            <h3 onClick={() => setBatteryOpen(!filterOpen)}>
              Battery Choice{" "}
              {batteryOpen ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            </h3>
            <Radio.Group
              value={solarFormData.batteryChoice.wantBattery}
              onChange={(e) => handleBatteryChoice(e.target.value)}
              className="custom-radio-group"
            >
              <Radio value="Yes">Yes</Radio>
              <Radio value="No">No</Radio>
            </Radio.Group>
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

              <Button onClick={() => addToCompare(installer.id)}>
                Add to Compare
              </Button>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Recommendation;
