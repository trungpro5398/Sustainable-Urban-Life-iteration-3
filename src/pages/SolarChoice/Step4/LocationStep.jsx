import React, { useState, useEffect } from "react";
import { Select, Button, Spin, Modal } from "antd";
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
} from "../../../reduxToolkit/slices/solarFormSlice";
import CustomLoadingSpinner from "../../../components/CustomLoadingSpinner/CustomLoadingSpinner";

/**
 * LocationStep Component
 * @param {Object} props - Properties passed to the component
 * @param {Array} props.data - Array of location data
 * @param {Function} props.nextStep - Function to move to the next step
 * @param {Function} props.previousStep - Function to move to the previous step
 * @returns JSX.Element
 */
const LocationStep = ({ data, nextStep, previousStep }) => {
  // -------------------
  // REDUX STATE MANAGEMENT
  // -------------------
  const locationData = useSelector(selectSolarForm).location;
  const dispatch = useDispatch();

  // -------------------
  // LOCAL STATE MANAGEMENT
  // -------------------
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [showError, setShowError] = useState(false);

  // -------------------
  // UTILITY FUNCTIONS
  // -------------------
  /**
   * Handle button click actions
   * @param {Function} callback - Function to be called after loading
   */
  const handleClick = (callback) => {
    if (!locationData.suburb) {
      setShowError(true);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      callback?.();
    }, 2000);
  };

  /**
   * Handle suburb dropdown changes
   * @param {string} value - The selected suburb's value
   */
  const handleSuburbChange = (value) => {
    setShowError(false);
    dispatch(updateField({ section: "location", field: "suburb", value }));

    const selectedSuburbInfo = data.find((loc) => loc.place_name === value);
    dispatch(updatePostcodeInfo(selectedSuburbInfo));
  };

  // Extract unique suburbs with postcode and place name
  const uniqueSuburbs = Array.from(
    new Set(
      data.map((loc) => ({
        key: loc.postcode + loc.place_name,
        postcode: loc.postcode,
        place_name: loc.place_name,
      }))
    ),
    JSON.stringify
  ).map(JSON.parse);

  useEffect(() => {
    const handleKeyPress = (event) => {
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
  return (
    <div className="location-step">
      <h1>Location</h1>

      {loading ? (
        <CustomLoadingSpinner />
      ) : (
        <div className="location-step-container">
          <p>Which suburb are you located in?</p>
          <div className="select-location">
            <Select
              showSearch
              placeholder="Select or type a suburb"
              optionFilterProp="children"
              onChange={handleSuburbChange}
              value={locationData.suburb}
              filterOption={(input, option) => {
                const suburbValue = option.value;
                const matchingSuburb = uniqueSuburbs.find(
                  (suburb) => suburb.place_name === suburbValue
                );
                if (matchingSuburb) {
                  return `${matchingSuburb.postcode} - ${matchingSuburb.place_name}`
                    .toLowerCase()
                    .includes(input.toLowerCase());
                }
                return false;
              }}
            >
              {uniqueSuburbs.map((suburb) => (
                <Select.Option key={suburb.key} value={suburb.place_name}>
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
                  Type or select your suburb directly into the input box to
                  search for matching suburbs.
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
