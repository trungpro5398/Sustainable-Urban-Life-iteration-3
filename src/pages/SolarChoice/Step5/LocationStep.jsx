import React, { useState } from "react";
import { Select, Radio, Button, Spin } from "antd";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
const LocationStep = ({ nextStep, previousStep }) => {
  const [loading, setLoading] = useState(false);
  const regionsData = [
    { name: "NT", suburbs: ["Suburb 1", "Suburb 2", "Suburb 3"] },
    { name: "SA", suburbs: ["Suburb 1", "Suburb 2", "Suburb 3"] },
    {
      name: "WA",
      suburbs: ["Suburb 1", "Suburb 2", "Suburb 3"],
    },
    { name: "NSW", suburbs: ["Suburb 1", "Suburb 2", "Suburb 3"] },
    { name: "TAS", suburbs: ["Suburb 1", "Suburb 2", "Suburb 3"] },
    {
      name: "QLD",
      suburbs: ["Suburb 1", "Suburb 2", "Suburb 3"],
    },
    { name: "VIC", suburbs: ["Suburb 1", "Suburb 2", "Suburb 3"] },
    // ... add other regions here
  ];
  const handleClick = (callback) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (callback && typeof callback === "function") {
        callback();
      }
    }, 2000); // Wait for 2 seconds before invoking the callback
  };

  const [suburb, setSuburb] = useState(null); // Store the selected suburb

  const [region, setregion] = useState(null); // Store the selected region

  return (
    <div className="location-step">
      <h1>Location</h1>

      {loading ? (
        <div className="loading-container">
          <Spin size="large" tip="Preparing your solar journey..."></Spin>
        </div>
      ) : (
        <div className="location-step-container">
          <p>Which region are you living now?</p>
          <Radio.Group
            className="region-options"
            onChange={(e) => setregion(e.target.value)}
            value={region}
          >
            {regionsData.map((regionData, idx) => (
              <Radio.Button
                key={idx}
                className="region-option"
                value={regionData.name}
              >
                <div className={`region-image ${regionData.name}`}></div>
                <div className="choice-circle">
                  {region === regionData.name && (
                    <div className="choice-tick">✓</div>
                  )}
                </div>
                <p className="region-option-name">{regionData.name}</p>
              </Radio.Button>
            ))}
          </Radio.Group>
          {region && ( // This conditionally renders the suburb dropdown based on if a region is selected
            <>
              <p>Which suburb are you located in?</p>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a suburb"
                optionFilterProp="children"
                onChange={setSuburb}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {regionsData
                  .find((r) => r.name === region)
                  .suburbs.map((sub) => (
                    <Select.Option key={sub} value={sub}>
                      {sub}
                    </Select.Option>
                  ))}
              </Select>
            </>
          )}
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

export default LocationStep;
