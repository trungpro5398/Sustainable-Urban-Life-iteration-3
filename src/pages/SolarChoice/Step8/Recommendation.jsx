import React, { useState } from "react";
import { Select, Button, Card, Modal, Spin } from "antd";
import "./style.scss";
import { StarFilled } from "@ant-design/icons";
import filterIcon from "../../../assets/images/icon-aus/filter.gif"; // Assuming your directory structure
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
const Recommendation = ({ previousStep }) => {
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [chosenFilters, setChosenFilters] = useState(0);
  const { Option } = Select;
  const [loading, setLoading] = useState(false);

  const handleClick = (callback) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (callback && typeof callback === "function") {
        callback();
      }
    }, 2000);
  };
  const showInstallerInfo = (name) => {
    alert(`Details about ${name}`);
  };

  const mockData = [
    {
      id: 1,
      name: "Installer A",
      price: "$5000",
      rated: "4.5/5",
      solarBranch: "XYZ",
      inverterBranch: "ABC",
      systemSize: "Medium",
    },
    {
      id: 1,
      name: "Installer A",
      price: "$5000",
      rated: "4.5/5",
      solarBranch: "XYZ",
      inverterBranch: "ABC",
      systemSize: "Medium",
    },
    {
      id: 1,
      name: "Installer A",
      price: "$5000",
      rated: "4.5/5",
      solarBranch: "XYZ",
      inverterBranch: "ABC",
      systemSize: "Medium",
    },
    {
      id: 1,
      name: "Installer A",
      price: "$5000",
      rated: "4.5/5",
      solarBranch: "XYZ",
      inverterBranch: "ABC",
      systemSize: "Medium",
    },
    // ... Add more installer objects
  ];

  const addToCompare = (id) => {
    console.log(`Adding installer with ID ${id} to compare`);
  };

  const updateChosenFilters = () => {
    let count = 0;
    if (filter) count++;
    if (sort) count++;
    setChosenFilters(count);
  };
  const clearChoices = () => {
    setFilter("");
    setSort("");
    updateChosenFilters();
  };
  return (
    <div className="recommendation-container">
      <div
        className="filter-icon-container"
        onClick={() => setIsFilterVisible(true)}
      >
        <img src={filterIcon} alt="Filter" />
        {chosenFilters > 0 && (
          <span className="filter-count">{chosenFilters}</span>
        )}
      </div>
      <Modal
        visible={isFilterVisible}
        onCancel={() => setIsFilterVisible(false)}
        onOk={() => setIsFilterVisible(false)}
        centered
        title="Filters & Sorting"
        className="custom-modal"
        footer={[
          <Button key="clear" className="gradient-btn" onClick={clearChoices}>
            Clear Choices
          </Button>,
          <Button
            key="apply"
            className="gradient-btn-1"
            onClick={() => setIsFilterVisible(false)}
          >
            Apply
          </Button>,
        ]}
      >
        <div className="filter-section">
          <h3>Filter By:</h3>
          <Select
            value={filter}
            style={{ width: 200 }}
            onChange={(value) => {
              setFilter(value);
              updateChosenFilters();
            }}
          >
            <Option value="small">Small</Option>
            <Option value="medium">Medium</Option>
            <Option value="large">Large</Option>
          </Select>
        </div>
        <div className="sort-section">
          <h3>Sort By:</h3>
          <Select
            value={sort}
            style={{ width: 200 }}
            onChange={(value) => {
              setSort(value);
              updateChosenFilters();
            }}
          >
            <Option value="low">Low to high </Option>
            <Option value="high">High to low </Option>
          </Select>
        </div>
      </Modal>
      <h1>Discover the Best Installers</h1>
      <h2>Find the perfect fit tailored to your preferences.</h2>
      {loading ? (
        <div className="loading-container">
          <Spin size="large" tip="Preparing your solar journey..."></Spin>
        </div>
      ) : (
        <div className="content">
          <div className="installer-list">
            {mockData.map((installer) => (
              <Card key={installer.id} className="installer-card">
                <h3 onClick={() => showInstallerInfo(installer.name)}>
                  {installer.name}
                </h3>
                <p className="rated">
                  <StarFilled className="stars" /> {installer.rated}
                </p>
                <p>Price: {installer.price}</p>
                <p>Solar Branch: {installer.solarBranch}</p>
                <p>Inverter Branch: {installer.inverterBranch}</p>
                <Button onClick={() => addToCompare(installer.id)}>
                  Add to Compare
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}
      )
      <Button
        className="previous-button"
        icon={<FontAwesomeIcon icon={faArrowLeft} size="xs" />}
        onClick={() => handleClick(previousStep)}
        shape="circle"
      ></Button>
    </div>
  );
};

export default Recommendation;
