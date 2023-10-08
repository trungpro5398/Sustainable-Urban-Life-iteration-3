import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { InputNumber, Button, Modal, Slider, message } from "antd";
import {
  updateField,
  addSolarArray,
  removeSolarArray,
  updateArrayField,
} from "../../../reduxToolkit/slices/solarFormSlice"; // Adjust this path to your project's directory structure
import compass from "../../../assets/images/solar-choice/Step8/compass.png";
import "./style.scss";
import { CalculatorOutlined } from "@ant-design/icons";
import { Progress, Row, Col } from "antd";
import "antd/dist/antd";
import CustomHandle from "../../../components/CustomHandle/CustomHandle";
import CalculatedLoading from "../../../components/CalculatedLoading/CalculatedLoading";
import NavigationButtons from "../../../components/NavigationButtons/NavigationButtons";
import CustomLoadingSpinner from "../../../components/CustomLoadingSpinner/CustomLoadingSpinner";
import Joyride, { ACTIONS, EVENTS, STATUS } from "react-joyride";
import { CloseCircleOutlined, PlusOutlined } from "@ant-design/icons"; // Import the close (X) icon

const AnnualBillSavings = ({ nextStep, previousStep }) => {
  const [errors, setErrors] = useState({
    electricityCost: "",
    annualSpend: "",
    supplyCharge: "",
    directionFacing: [], // Initialize as an array
    angle: [], // Initialize as an array
    isCalculated: "",
  });

  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const angle = useSelector((state) => state.solarForm.annualBillSavings.angle);
  const [numOfArrays, setNumOfArrays] = useState(1); // Initial value
  const directionFacing = useSelector(
    (state) => state.solarForm.annualBillSavings.directionFacing
  );
  const solarPanelPercentages = useSelector(
    (state) => state.solarForm.annualBillSavings.solarPanelPercentages
  );

  useEffect(() => {
    if (angle && Array.isArray(angle)) {
      setNumOfArrays(angle.length);
    }
  }, [angle]);

  const [results, setResults] = useState({
    annualSavings: 0,
    annualBillWithSolar: 0,
    tenYearSavings: 0,
    twentyYearSavings: 0,
    percentAfterSolar: 0,
    percentBeforeSolar: 0,
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState(null);
  const [firstPanelDisplay, setFirstPanelDisplay] = useState(
    solarPanelPercentages[0]
  );
  const [directionStates, setDirectionStates] = useState(directionFacing);
  useEffect(() => {
    const updatedDirectionStates = directionFacing.map((dir) => ({
      direction: dir,
      active: dir,
      clicked: dir, // set clicked to the current direction
      tooltip: "",
    }));
    setDirectionStates(updatedDirectionStates);
  }, [directionFacing]);

  const resetLoadingAndResults = () => {
    setCalLoading(false);
    setShowResults(false);
  };
  message.config({
    top: "50vh", // 50% of the viewport height, adjust accordingly
    duration: 5, // 5 seconds
  });
  const messageInput = (text) => {
    message.error({
      content: text,
      style: {
        fontSize: "20px", // Bigger font size
      },
    });
  };
  const [steps] = useState([
    {
      target: ".solar-input-display",
      content: "This displays your solar power system.",
    },
    {
      target: ".compass-container",
      content:
        "The direction that your roof faces will have an impact on the potential performance of your solar power panels. A north-facing roof is ideal in Australia, but many systems will perform well on east, west or even south facing roofs.",
    },
    {
      target: ".angle",
      content:
        "Most Australian roofs are at either 25º or 15º from horizontal. If you are unsure, just leave it at 20º and you'll get good enough result from the solar calculator. Please note that if the installation angle of your solar panels is between 0º to 10º, there will be an additional cleaning cost applied every year.",
    },
    {
      target: ".cost",
      content:
        "Tell us if you supply cost/usage cost base on your bill. You can typically find this information in the Statement section of your electricity bill.",
    },
    {
      target: ".cost",
      content:
        "Tell us if you supply cost/usage cost base on your bill. You can typically find this information in the Statement section of your electricity bill.",
    },
    //... you can add more steps as needed
  ]);

  const [calLoading, setCalLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { annualBillSavings, postcodeInfo, angle_and_orientation } =
    useSelector((state) => state.solarForm);
  const [calculated, setCalculated] = useState(false);

  const update = (payload) => dispatch(updateField(payload));
  const [showResults, setShowResults] = useState(false);
  const [inputError, setInputError] = useState("");

  const validateFields = (isCalculated) => {
    let isValid = true;
    const newErrors = {
      electricityCost: "",
      annualSpend: "",
      supplyCharge: "",
      directionFacing: [], // Initialize as an array
      angle: [], // Initialize as an array
      isCalculated: "",
    };

    if (annualBillSavings.electricityCost <= 0) {
      newErrors.electricityCost = "Electricity cost must be greater than 0.";
      isValid = false;
    }

    if (annualBillSavings.annualSpend <= 0) {
      newErrors.annualSpend = "Annual spend must be greater than 0.";
      isValid = false;
    }

    if (annualBillSavings.supplyCharge <= 0) {
      newErrors.supplyCharge = "Supply charge must be greater than 0.";
      isValid = false;
    }

    // Iterate over each directionFacing and angle of the solar panels
    directionStates.forEach((directionState, index) => {
      if (!directionState.clicked) {
        newErrors.directionFacing[index] = "Please select a direction.";
        isValid = false;
      } else {
        newErrors.directionFacing[index] = ""; // No error
      }

      if (annualBillSavings.angle <= 0) {
        newErrors.angle[index] = "Angle must be greater than 0.";
        isValid = false;
      } else {
        newErrors.angle[index] = ""; // No error
      }
    });

    if (isValid && !isCalculated) {
      newErrors.isCalculated = "Please click the calculate button.";
      isValid = false;
    }

    if (isCalculated) {
      setCalculated(true);
    }

    setErrors(newErrors);
    return isValid;
  };
  const handleDirection = (direction, index, clicked = false) => {
    const tooltip = `You've ${
      clicked ? "selected" : "hovering over"
    } the ${direction} direction`;

    // Update local state
    const newDirectionStates = [...directionStates];
    newDirectionStates[index] = {
      ...newDirectionStates[index],
      direction,
      active: direction,
      tooltip,
      clicked: clicked ? direction : newDirectionStates[index].clicked,
    };
    setDirectionStates(newDirectionStates);

    // Update Redux state when clicked
    if (clicked) {
      dispatch(
        updateArrayField({
          section: "annualBillSavings",
          field: "directionFacing",
          value: direction,
          index,
        })
      );
    }
  };
  /**
   * Smoothly scrolls the view to the "results" section of the page.
   */
  const handleButtonClickToResult = () => {
    const resultsMove = document.getElementById("results");
    if (resultsMove) {
      resultsMove.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleMouseOut = (index) =>
    handleDirection(directionStates[index].clicked, index, true);

  const calcSavings = () => {
    const solarProd = postcodeInfo.data[annualBillSavings.solarPowerSystem];

    // Total effect accumulates percentage effects from each solar panel
    let totalEffect = 0;

    // Loop over each direction state (each solar panel) to accumulate total effect
    directionStates.forEach((directionState, index) => {
      const effectFromPanel = angle_and_orientation.data.find(
        (item) =>
          item.roof_pich === annualBillSavings.angle[index] &&
          item.roof_oeratation === directionState.clicked
      ).percentage;

      // Weight the effect from this panel by its percentage
      totalEffect += (effectFromPanel * solarPanelPercentages[index]) / 100;
    });

    const annualSavings =
      solarProd *
      365 *
      annualBillSavings.electricityCost *
      totalEffect *
      0.0001;
    const billBefore =
      annualBillSavings.annualSpend -
      (annualBillSavings.supplyCharge * 365) / 100;

    dispatch(
      updateField({
        section: "annualBillSavings",
        field: "isCompleted",
        value: true,
      })
    );
    dispatch(
      updateField({
        section: "annualBillSavings",
        field: "yearlySaving",
        value: annualSavings,
      })
    );
    setResults({
      annualSavings,
      annualBillWithSolar: billBefore - annualSavings,
      tenYearSavings: 10 * annualSavings,
      twentyYearSavings: 20 * annualSavings,
      percentAfterSolar: (
        (annualSavings * 100) /
        annualBillSavings.annualSpend
      ).toFixed(2),
      percentBeforeSolar: (
        (billBefore * 100) /
        annualBillSavings.annualSpend
      ).toFixed(2),
    });
  };

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
  const handleClick = (callback) => {
    if (!validateFields(true)) return;

    setCalLoading(true);
    setTimeout(() => {
      setCalLoading(false);
      setShowResults(true);
      setTimeout(handleButtonClickToResult, 50); // introducing slight delay
      callback && callback();
    }, 4000);
  };
  const addSolarPanel = () => {
    // 1. Check for any existing input errors.
    if (inputValue === null) {
      messageInput("Please enter a number.");
      return;
    } else if (inputValue < 0 || inputValue > 100) {
      messageInput("Please enter a number between 0 and 100.");
    } else {
      setInputError(""); // Clear the error if the input is within the range
    }

    // 2. Calculate the percentage for the primary panel after adding the new panel.
    const primaryPanelPercentage = solarPanelPercentages[0] - inputValue;

    // 3. Validate if adding the new panel's percentage doesn't invalidate the primary panel's percentage.
    if (primaryPanelPercentage < 0) {
      setInputError(
        "The added percentage is too high and makes the primary panel's percentage go below 0%."
      );
      return;
    }

    // 5. Close the modal and reset the input value.
    setIsModalVisible(false);
    setInputValue(null);

    // 6. Create a new direction state for the new solar panel.
    const newDirectionState = {
      direction: null,
      active: null,
      clicked: null,
      tooltip: "",
    };
    setDirectionStates((prevStates) => [...prevStates, newDirectionState]);

    // 7. Dispatch the addition of a new solar array to the Redux store.
    // The update is now slightly different, where we pass the whole newDirectionState object instead of individual properties.
    dispatch(
      addSolarArray({
        directionFacing: newDirectionState,
        angle: 0,
        percentage: inputValue,
      })
    );

    // 8. Update the number of solar arrays.
    setNumOfArrays((prevNum) => prevNum + 1);
  };

  const removeSolarPanel = () => {
    if (numOfArrays > 1) {
      const removedPercentage =
        solarPanelPercentages[solarPanelPercentages.length - 1];

      const newDirectionStates = directionStates.slice(0, -1);
      setDirectionStates(newDirectionStates);

      const newSolarPanelPercentages = solarPanelPercentages.slice(0, -1);
      newSolarPanelPercentages[0] += removedPercentage;

      // Remove last direction and angle from redux
      dispatch(removeSolarArray({ index: numOfArrays - 1 }));

      setNumOfArrays(numOfArrays - 1);
    }
  };
  const showAddSolarPanelModal = () => {
    setIsModalVisible(true);
  };
  useEffect(() => {
    const totalOfOtherPanels = solarPanelPercentages.reduce(
      (acc, currVal, idx) => (idx !== 0 ? acc + currVal : acc),
      0
    );
    setFirstPanelDisplay(100 - totalOfOtherPanels);
  }, [solarPanelPercentages]);

  return (
    <div className="annual-bill-savings">
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
      <h2>Annual Bill Savings Calculator</h2>
      {loading ? (
        <CustomLoadingSpinner />
      ) : (
        <div className="annual-bill-savings-container">
          <Row className="solar-input-display" align="middle" gutter={8}>
            <Col>
              <h4>Your solar power system:</h4>
            </Col>
            <Col>
              <span>{annualBillSavings.solarPowerSystem}h</span>
            </Col>
          </Row>
          {Array.from({ length: numOfArrays }).map((_, index) => (
            <div key={index} className="array-container">
              <h4 className="percentage-display">
                Roof's top {index + 1}:{" "}
                {index === 0 ? (
                  `${firstPanelDisplay}%`
                ) : (
                  <div className="percentage-display-container">
                    <InputNumber
                      min={0}
                      max={100}
                      value={solarPanelPercentages[index]}
                      className="percentage-display-input"
                      onChange={(value) => {
                        const totalOfOtherPanels = solarPanelPercentages.reduce(
                          (acc, currVal, idx) =>
                            idx !== 0 ? acc + currVal : acc,
                          0
                        );
                        if (value === null) {
                          messageInput("Please enter a number.");
                          return;
                        } else if (100 - totalOfOtherPanels - value < 0) {
                          messageInput("Please enter smaller percentage.");
                          return;
                        } else if (value < 0 || value > 100) {
                          messageInput(
                            "Please enter a number between 0 and 100."
                          );
                        } else {
                          setInputError(""); // Clear the error if the input is within the range
                        }

                        // Dispatch the action to update the Redux store:
                        dispatch(
                          updateArrayField({
                            section: "annualBillSavings",
                            field: "solarPanelPercentages",
                            value: value,
                            index: index,
                          })
                        );
                      }}
                    />
                    <div className="percentage-display-unit">%</div>
                  </div>
                )}
              </h4>

              <div className="compass-wrapper">
                {directionStates && (
                  <div className="tooltip">
                    {directionStates[index].tooltip}
                  </div>
                )}
                <div
                  className="compass-container"
                  onMouseOut={() => handleMouseOut(index)}
                >
                  <img
                    src={compass}
                    alt="Compass Needle"
                    className={`compass-needle ${directionStates[index].active}`}
                  />
                  {["NW", "N", "NE", "E", "SE", "S", "SW", "W"].map(
                    (direction) => (
                      <div
                        key={direction}
                        className={`direction-box ${direction} ${
                          direction === directionStates[index].clicked
                            ? "active"
                            : direction === directionStates[index].active
                            ? "hovered"
                            : ""
                        }`}
                        onMouseEnter={() => handleDirection(direction, index)}
                        onClick={() => {
                          resetLoadingAndResults();
                          handleDirection(direction, index, true);
                        }}
                      >
                        {direction}
                      </div>
                    )
                  )}
                </div>
                <div className="error-text">
                  {errors.directionFacing[index]}
                </div>
              </div>

              <div className="angle">
                <p>
                  Angle from Horizontal: {annualBillSavings.angle[index] + "°"}
                </p>
                <Slider
                  min={0}
                  max={40}
                  value={annualBillSavings.angle[index]}
                  onChange={(value) => {
                    resetLoadingAndResults();
                    // Create a new angles array with the updated value
                    const updatedAngles = [...annualBillSavings.angle];
                    updatedAngles[index] = value;
                    dispatch(
                      updateField({
                        section: "annualBillSavings",
                        field: "angle",
                        value: updatedAngles, // dispatch the entire updated angles array
                      })
                    );
                  }}
                  step={5}
                  className="annual-slider"
                />
                <div className="error-text">{errors.angle[index]}</div>
              </div>
              {index > 0 && (
                <button
                  className="remove-array-button"
                  onClick={removeSolarPanel}
                >
                  <CloseCircleOutlined /> Remove Solar Array
                </button>
              )}
            </div>
          ))}
          <button onClick={showAddSolarPanelModal}>
            <PlusOutlined /> Add Another Solar Panel Array
          </button>

          <Modal
            title="Enter Percentage"
            visible={isModalVisible}
            onOk={addSolarPanel}
            onCancel={() => setIsModalVisible(false)}
          >
            <p>Please enter the percentage for the new solar panel:</p>
            <InputNumber
              min={0}
              max={100}
              value={inputValue}
              onChange={(value) => {
                const totalOfOtherPanels = solarPanelPercentages.reduce(
                  (acc, currVal, idx) => (idx !== 0 ? acc + currVal : acc),
                  0
                );

                if (value === null) {
                  messageInput("Please enter a number.");
                  return;
                } else if (100 - totalOfOtherPanels - value < 0) {
                  messageInput("Please enter smaller percentage.");
                  return;
                } else if (value < 0 || value > 100) {
                  messageInput("Please enter a number between 0 and 100.");
                } else {
                  setInputError(""); // Clear the error if the input is within the range
                }
                setInputValue(value);
              }}
            />

            {inputError && (
              <div style={{ color: "red", marginTop: "10px" }}>
                {inputError}
              </div>
            )}
          </Modal>
          <div className="cost">
            <div>
              {/* <h4>Your Electricity Bill</h4> */}
              <h4>
                Cost of usage per kWh inc GST:{" "}
                {annualBillSavings.electricityCost}{" "}
                {annualBillSavings.electricityCost === 1 ? "cent" : "cents"}
              </h4>

              <Slider
                min={0}
                max={90}
                placeholder="$0.00"
                handle={<CustomHandle />}
                value={annualBillSavings.electricityCost}
                onChange={(value) => {
                  resetLoadingAndResults();

                  update({
                    section: "annualBillSavings",
                    field: "electricityCost",
                    value,
                  });
                }}
                className="annual-slider"
              />
              <div className="error-text">{errors.electricityCost}</div>
            </div>

            <div>
              <h4>
                Approximately how much do you spend on electricity in a year
              </h4>
              <InputNumber
                placeholder="0.00"
                prefix="$"
                value={annualBillSavings.annualSpend}
                onChange={(value) => {
                  resetLoadingAndResults();

                  update({
                    section: "annualBillSavings",
                    field: "annualSpend",
                    value,
                  });
                }}
              />
              <div className="error-text">{errors.annualSpend}</div>
            </div>

            <div>
              <h4>Supply charge (cents per day)</h4>
              <InputNumber
                placeholder="0.00"
                suffix="cents"
                value={annualBillSavings.supplyCharge}
                onChange={(value) => {
                  resetLoadingAndResults();

                  update({
                    section: "annualBillSavings",
                    field: "supplyCharge",
                    value,
                  });
                }}
              />
              <div className="error-text">{errors.supplyCharge}</div>
            </div>
          </div>
          <Button
            onClick={() => handleClick(calcSavings)}
            icon={<CalculatorOutlined />}
          >
            Calculate
          </Button>
          <div className="error-text-container">
            <div className="error-text">{errors.isCalculated}</div>
          </div>
          {calLoading && <CalculatedLoading />}
          {showResults && (
            <div className="results" id="results">
              <h1>Results:</h1>
              <Row gutter={16} className="row">
                <Col span={16}>
                  <p>
                    Your first year's savings: $
                    {results.annualSavings.toFixed(2)}
                  </p>
                </Col>
              </Row>
              <Row gutter={16} className="row">
                <Col span={8}>
                  <span>Bill After Solar:</span>
                </Col>
                <Col span={16}>
                  <Progress
                    percent={results.percentAfterSolar}
                    strokeColor="#52c41a"
                  />
                  <div
                    className="progress-label"
                    style={{ left: `${results.percentAfterSolar}%` }}
                  >
                    ${results.annualSavings.toFixed(2)}
                  </div>
                </Col>
              </Row>
              <Row gutter={16} className="row">
                <Col span={8}>
                  <span>Your Bills (Annual bill with solar):</span>
                </Col>
                <Col span={16}>
                  <Progress
                    percent={results.percentBeforeSolar}
                    strokeColor="#f5222d"
                  />
                  <div
                    className="progress-label"
                    style={{ left: `${results.percentBeforeSolar}%` }}
                  >
                    ${results.annualBillWithSolar.toFixed(2)}
                  </div>
                </Col>
              </Row>
              <p>Your 10 year savings: ${results.tenYearSavings.toFixed(2)}</p>
              <p>
                Your 20 year savings: ${results.twentyYearSavings.toFixed(2)}
              </p>
              {/* Insert your charts here */}
            </div>
          )}
          <NavigationButtons
            nextStep={nextStep}
            previousStep={previousStep}
            condition={annualBillSavings.isCompleted}
            setShowError={null}
            setLoading={setLoading}
            validateFields={() => validateFields(calculated || false)}
          />
        </div>
      )}
    </div>
  );
};

export default AnnualBillSavings;
