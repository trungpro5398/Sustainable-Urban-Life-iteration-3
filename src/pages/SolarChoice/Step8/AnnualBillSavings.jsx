import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { InputNumber, Button, Select, Slider, Input } from "antd";
import { updateField } from "../../../reduxToolkit/slices/solarFormSlice"; // Adjust this path to your project's directory structure
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

const AnnualBillSavings = ({ nextStep, previousStep }) => {
  const [errors, setErrors] = useState({
    electricityCost: "",
    annualSpend: "",
    supplyCharge: "",
    directionFacing: "",
    angle: "",
    isCalculated: "",
  });
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const [results, setResults] = useState({
    annualSavings: 0,
    annualBillWithSolar: 0,
    tenYearSavings: 0,
    twentyYearSavings: 0,
    percentAfterSolar: 0,
    percentBeforeSolar: 0,
  });
  const [directionState, setDirectionState] = useState({
    active: null,
    clicked: null,
    tooltip: "",
  });
  const resetLoadingAndResults = () => {
    setCalLoading(false);
    setShowResults(false);
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
  const validateFields = (isCalculated) => {
    let isValid = true;
    const newErrors = {
      electricityCost: "",
      annualSpend: "",
      supplyCharge: "",
      directionFacing: "",
      angle: "",
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

    if (!annualBillSavings.directionFacing) {
      newErrors.directionFacing = "Please select a direction.";
      isValid = false;
    }

    if (annualBillSavings.angle <= 0) {
      newErrors.angle = "Angle must be greater than 0.";
      isValid = false;
    }
    if (isValid && !isCalculated) {
      newErrors.isCalculated = "Please click calculate button.";
      isValid = false;
    }
    if (isCalculated) {
      setCalculated(true);
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleDirection = (direction, clicked = false) => {
    const tooltip = `You've ${
      clicked ? "selected" : "hovering over"
    } the ${direction} direction`;
    setDirectionState({
      ...directionState,
      active: direction,
      tooltip,
      clicked: clicked ? direction : directionState.clicked,
    });
    if (clicked)
      update({
        section: "annualBillSavings",
        field: "directionFacing",
        value: direction,
      });
  };

  const handleMouseOut = () =>
    handleDirection(annualBillSavings.directionFacing, true);

  const calcSavings = () => {
    const solarProd = postcodeInfo.data[annualBillSavings.solarPowerSystem];
    const effect = angle_and_orientation.data.find(
      (item) =>
        item.roof_pich === annualBillSavings.angle &&
        item.roof_oeratation === annualBillSavings.directionFacing
    ).percentage;
    const annualSavings =
      solarProd * 365 * annualBillSavings.electricityCost * effect * 0.0001;
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
      callback && callback();
    }, 4000);
  };

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
      <h1>Annual Bill Savings Calculator</h1>
      {loading ? (
        <CustomLoadingSpinner />
      ) : (
        <div className="annual-bill-savings-container">
          <Row className="solar-input-display" align="middle" gutter={8}>
            <Col>
              <h2>Your solar power system:</h2>
            </Col>
            <Col>
              <span>{annualBillSavings.solarPowerSystem}</span>
            </Col>
            <Col>
              <span>kWh</span>
            </Col>
          </Row>

          <div className="compass-wrapper">
            <div className="tooltip">{directionState.tooltip}</div>
            <div className="compass-container" onMouseOut={handleMouseOut}>
              <img
                src={compass}
                alt="Compass Needle"
                className={`compass-needle ${directionState.active}`}
              />
              {["NW", "N", "NE", "E", "SE", "S", "SW", "W"].map((direction) => (
                <div
                  key={direction}
                  className={`direction-box ${direction} ${
                    direction === directionState.clicked
                      ? "active"
                      : direction === directionState.active
                      ? "hovered"
                      : ""
                  }`}
                  onMouseEnter={() => handleDirection(direction)}
                  onClick={() => {
                    resetLoadingAndResults();

                    handleDirection(direction, true);
                  }}
                >
                  {direction}
                </div>
              ))}
            </div>
            <div className="error-text">{errors.directionFacing}</div>
          </div>

          <div className="angle">
            <p>Angle from Horizontal: {annualBillSavings.angle + "°"}</p>
            <Slider
              min={0}
              max={90}
              value={annualBillSavings.angle}
              onChange={(value) => {
                resetLoadingAndResults();
                update({ section: "annualBillSavings", field: "angle", value });
              }}
              step={5}
              className="annual-slider"
            />
            <div className="error-text">{errors.angle}</div>
          </div>

          <div className="cost">
            <div>
              <h2>Your Electricity Bill</h2>
              <p>
                Cost of usage per kWh inc GST: $
                {annualBillSavings.electricityCost}
              </p>
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
              <h2>
                Approximately how much do you spend on electricity in a year
              </h2>
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
              <h2>Supply charge (cents per day)</h2>
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
            <div className="results">
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
