import React, { useState } from "react";
import { Select, Radio, Button, Spin } from "antd";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faInfoCircle,
  faLightbulb,
  faSearch,
  faMousePointer,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  updateField,
  selectSolarForm,
  updatePostcodeInfo,
} from "../../../reduxToolkit/slices/solarFormSlice"; // Adjust path if necessary
import { Modal } from "antd";

const LocationStep = ({ data, nextStep, previousStep }) => {
  const locationData = useSelector(selectSolarForm).location;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleClick = (callback) => {
    if (!locationData.suburb) {
      // If cycle hasn't been chosen, show an error and return early
      setShowError(true);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (callback && typeof callback === "function") {
        callback();
      }
    }, 2000);
  };

  const handleSuburbChange = (value) => {
    // Update the suburb value in the redux store
    setShowError(false);
    dispatch(updateField({ section: "location", field: "suburb", value }));
    // Find the suburb object using the postcode value
    const selectedSuburbInfo = data.find((loc) => loc.postcode === value);

    // Dispatch the data to the redux store
    dispatch(updatePostcodeInfo(selectedSuburbInfo));
  };

  // Extract unique suburbs with postcode and place name
  const uniqueSuburbs = Array.from(
    new Set(
      data.map((loc) => ({
        postcode: loc.postcode,
        place_name: loc.place_name,
      }))
    ),
    JSON.stringify
  ).map(JSON.parse);

  return (
    <div className="location-step">
      <h1>Location</h1>

      {loading ? (
        <div className="loading-container">
          <Spin size="large" tip="Preparing your solar journey..."></Spin>
        </div>
      ) : (
        <div className="location-step-container">
          <p>Which suburb are you located in?</p>
          <div className="select-location">
            <Select
              showSearch
              placeholder="Select a suburb"
              optionFilterProp="children"
              onChange={handleSuburbChange}
              value={locationData.suburb}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {uniqueSuburbs.map((suburb) => (
                <Select.Option key={suburb.postcode} value={suburb.postcode}>
                  {suburb.postcode} - {suburb.place_name}
                </Select.Option>
              ))}
            </Select>
            <FontAwesomeIcon
              icon={faInfoCircle}
              className="location-icon"
              onClick={() => setModalVisible(true)}
              onMouseEnter={() => setModalVisible(true)}
            />
          </div>
          {showError && (
            <p className="error-message">
              Please select a suburb before proceeding.
            </p>
          )}
          <Modal
            title={
              <div className="location-item">
                <FontAwesomeIcon icon={faLightbulb} className="location-icon" />
                How to Choose a Suburb
              </div>
            }
            visible={isModalVisible}
            onCancel={() => setModalVisible(false)}
            footer={null}
            centered
            className="location-modal"
          >
            <div className="location-content">
              <div className="location-item">
                <FontAwesomeIcon icon={faSearch} className="location-icon" />
                <p>
                  Type your suburb directly into the input box to search for
                  matching suburbs.
                </p>
              </div>
              <div className="location-item">
                <FontAwesomeIcon
                  icon={faMousePointer}
                  className="location-icon"
                />
                <p>
                  Scroll through the list and select a suburb from the dropdown.
                </p>
              </div>
            </div>
          </Modal>

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
