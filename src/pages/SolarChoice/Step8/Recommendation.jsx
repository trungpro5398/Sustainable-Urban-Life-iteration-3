import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Button, Card, Spin, Radio } from "antd";
import "./style.scss";
import {
  StarFilled,
  ArrowUpOutlined,
  ArrowDownOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandPointRight,
  faSmile,
  faGrinStars,
} from "@fortawesome/free-solid-svg-icons";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { updateField } from "../../../reduxToolkit/slices/solarFormSlice"; // Adjust this path to your project's directory structure

const Recommendation = ({ previousStep }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useState(false);

  const [sortOpen, setSortOpen] = useState(false);
  const [sortOpenPrice, setSortOpenPrice] = useState(false);

  const solarFormData = useSelector((state) => state.solarForm);
  const [installers, setInstallers] = useState([]);

  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");

  const [filterOpen, setFilterOpen] = useState(false);
  const [batteryOpen, setBatteryOpen] = useState(false);

  const [filterOpenSolarSystemSize, setFilterOpenSolarSystemSize] =
    useState(false);

  // Use the batteryChoice from Redux store to select the appropriate dataset
  const dataToUse =
    solarFormData.batteryChoice.wantBattery === "Yes"
      ? solarFormData.pricing.withBattery
      : solarFormData.pricing.withoutBattery;

  useEffect(() => {
    let filteredData = dataToUse;
    if (filter) {
      const filterValue = parseFloat(filter); // Converts "1.5kWh" to 1.5
      filteredData = dataToUse.filter(
        (item) => parseFloat(item.system_size) === filterValue
      );
    }

    if (sort) {
      let sortedData = [...filteredData];
      sortedData.sort((a, b) => {
        const priceA = parseFloat(a.price || a.price_battery);
        const priceB = parseFloat(b.price || b.price_battery);

        if (sort === "low") return priceA - priceB;
        if (sort === "high") return priceB - priceA;
      });
      filteredData = sortedData;
    }

    setInstallers(filteredData);
  }, [filter, sort, dataToUse]);
  const getRecommendedSize = (dailyUsage) => {
    if (dailyUsage < 6) return "1.5";
    if (dailyUsage >= 6 && dailyUsage < 15) return "3";
    if (dailyUsage >= 15 && dailyUsage < 24) return "6";
    return "10"; // For daily usage 24kw and above
  };
  const recommendedSize = getRecommendedSize(
    solarFormData.electricityUsage.usageDaily
  );

  const addToCompare = (id) => {
    console.log(`Adding installer with ID ${id} to compare`);
  };
  const handleClick = (callback) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      callback && callback();
    }, 2000);
  };
  const handleBatteryChoice = (choice) => {
    dispatch(
      updateField({
        section: "batteryChoice",
        field: "wantBattery",
        value: choice,
      })
    );
  };

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
          <Spin size="large" tip="Preparing your solar journey..." />
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
