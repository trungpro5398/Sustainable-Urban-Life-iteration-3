import React, { useState, useEffect } from "react";
import { Select, Button, Spin, Modal } from "antd";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  updateField,
  selectSolarForm,
  updatePostcodeInfo,
} from "../../../reduxToolkit/slices/solarFormSlice";
import CustomLoadingSpinner from "../../../components/CustomLoadingSpinner/CustomLoadingSpinner";
import Joyride, { STATUS } from "react-joyride";
import NavigationButtons from "../../../components/NavigationButtons/NavigationButtons";

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
  console.log(data);
  const locationData = useSelector(selectSolarForm).location;
  const dispatch = useDispatch();

  // -------------------
  // LOCAL STATE MANAGEMENT
  // -------------------
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [runTour, setRunTour] = useState(true);
  const [steps, setSteps] = useState([
    {
      target: ".select-location",
      content:
        " Type or select your suburb directly into the input box to search for matching suburbs. Location is one of the most important variables in calculating solar performance. We use this to apply the sunlight radiation that your system will receive. Your address will also affect the size the soalr rebate you will receive when you purchase your system.",
      placement: "top-start",
    },
  ]);
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
    dispatch(
      updateField({
        section: "location",
        field: "isCompleted",
        value: true,
      })
    );
    const postcode = data.filter((suburb) => suburb.place_name === value)[0]
      .postcode;
    dispatch(
      updateField({ section: "location", field: "postcode", value: postcode })
    );

    const selectedSuburbInfo = data.find((loc) => loc.place_name === value);
    dispatch(updatePostcodeInfo(selectedSuburbInfo));
  };

  // Extract unique suburbs with postcode and place name

  const uniqueSuburbsSet = new Set(
    data?.map((loc) =>
      JSON.stringify({
        key: loc.postcode + loc.place_name,
        postcode: loc.postcode,
        place_name: loc.place_name,
      })
    )
  );

  const uniqueSuburbs = [...uniqueSuburbsSet].map((suburbStr) =>
    JSON.parse(suburbStr)
  );

  useEffect(() => {
    // Check if the user has visited the page before
    const firstTime = localStorage.getItem("firstTime");
    if (!firstTime) {
      setRunTour(true);
      localStorage.setItem("firstTime", "false");
    }

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
  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      setRunTour(false);
    }
  };
  return (
    <div className="location-step">
      <h2>Location</h2>

      {loading ? (
        <CustomLoadingSpinner />
      ) : (
        <div className="location-step-container">
          <Joyride
            steps={steps}
            run={runTour}
            continuous={true}
            scrollToFirstStep={true}
            showProgress={true}
            showSkipButton={true}
            stepIndex={0}
            callback={handleJoyrideCallback}
          />
          <h3>Which suburb are you located in?</h3>
          <div className="select-location">
            <Select
              showSearch
              placeholder="Select or type a suburb"
              optionFilterProp="children"
              onChange={handleSuburbChange}
              data-testid="suburb-select"
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
                <Select.Option
                  key={suburb.key}
                  value={suburb.place_name}
                  data-testid="suburb-option"
                >
                  {suburb.postcode} - {suburb.place_name}
                </Select.Option>
              ))}
            </Select>
          </div>
          {showError && (
            <p className="error-message">
              Please select a suburb before proceeding.
            </p>
          )}

          <NavigationButtons
            nextStep={nextStep}
            previousStep={previousStep}
            condition={locationData.suburb}
            setShowError={setShowError}
            setLoading={setLoading}
          />
        </div>
      )}
    </div>
  );
};

export default LocationStep;
