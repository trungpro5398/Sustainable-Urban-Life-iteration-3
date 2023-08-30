import React, { useState } from "react";
import "./style.scss";
import { Image, Collapse } from "antd";
import s1 from "../../assets/images/solar-energy-benefit/s1.jpeg";
import s2 from "../../assets/images/solar-energy-benefit/s2.webp";
import s3 from "../../assets/images/solar-energy-benefit/s3.jpg";
import s4 from "../../assets/images/solar-energy-benefit/s4.jpg";
import s5 from "../../assets/images/solar-energy-benefit/s5.jpg";
import s6 from "../../assets/images/solar-energy-benefit/s6.jpg";
import s7 from "../../assets/images/solar-energy-benefit/s7.jpg";
import s8 from "../../assets/images/solar-energy-benefit/s8.png";
import s9 from "../../assets/images/solar-energy-benefit/s9.webp";
import s10 from "../../assets/images/solar-energy-benefit/s10.jpg";

import Navbar from "../../components/Navbar/Navbar";

const { Panel } = Collapse;

const CustomPanel = ({ image, title, children }) => (
  <div className="custom-panel">
    {image && <Image src={image} />}
    <div className="content">{children}</div>
  </div>
);

const SolarEnergyBenefit = () => {
  const [activeKeys, setActiveKeys] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ]); // Initially all panels are active (open)

  return (
    <div className="solar-energy-benefit">
      <Navbar isHomePage={false} />
      <h1>SOLAR ENERGY BENEFITS</h1>

      <Collapse
        accordion={false}
        activeKey={activeKeys} // Active panels
        onChange={(key) => setActiveKeys(key)}
        destroyInactivePanel={false} // keep the inactive panels
        className="question-collapse"
        expandIconPosition="right"
      >
        {/* <h2 className="sub-title">VICTORIA’S SOLAR REBATE</h2> */}
        <p className="sub-description">
          There are numerous benefits of solar energy which are as follows:
        </p>
        <Panel
          header="1.	Reduced Electricity Bills:"
          key="1"
          className="question-panel"
        >
          <CustomPanel image={s1} title="1.	Reduced Electricity Bills:">
            <p>
              • Solar panels allow homeowners to generate their own electricity,
              reducing their dependence on the grid.{" "}
            </p>
            <span>
              • According to the Australian Energy Regulator (AER), the average
              annual electricity bill in Victoria is around $1,134 AUD.
              https://blog.hood.ai/average-electricity-rates-melbourne#:~:text=According%20to%20the%20Australian%20Energy,cost%20per%20kWh%20of%2027.29.
            </span>
          </CustomPanel>
        </Panel>

        <Panel header="2.	Financial Savings:" key="2" className="question-panel">
          <CustomPanel image={s2} title="2.	Financial Savings:">
            <p>
              • Solar panels can result in significant financial savings over
              time.
              https://www.cleanenergycouncil.org.au/resources/technologies/solar-energy
            </p>
            <span>
              • On average, a 6.6 kW solar system can save homeowners around
              $400 to $800 AUD annually, according to the Clean Energy Council.
            </span>
          </CustomPanel>
        </Panel>

        <Panel
          header="3.	Environmentally Friendly:"
          key="3"
          className="question-panel"
        >
          <CustomPanel image={s3} title="3.	Environmentally Friendly:">
            <p>
              • Solar energy reduces carbon emissions and dependence on fossil
              fuels, promoting a cleaner environment.
              https://www.solar.vic.gov.au/apply?gclid=Cj0KCQjwi7GnBhDXARIsAFLvH4lq3j_jtiYxxPP4zqn2QibCt42WF9nUT3TFiZvDU5IH_hv706BB1rgaAlB2EALw_wcB
            </p>
            <span>
              • Victoria's solar installations have offset approximately 4.2
              million tonnes of CO2 emissions, as reported by the Victoria State
              Government.
            </span>
          </CustomPanel>
        </Panel>

        <Panel
          header="4.	Government Incentives:"
          key="4"
          className="question-panel"
        >
          <CustomPanel image={s4} title="4.	Government Incentives:">
            <p>
              • Victoria provides feed-in tariffs for excess solar energy that
              is exported back to the grid.
              https://engage.vic.gov.au/minimum-feed-tariff-review-202223
            </p>
            <span>
              • The current minimum feed-in tariff rate in Victoria is around
              10.2 cents per kilowatt-hour, as per the Essential Services
              Commission.
            </span>
          </CustomPanel>
        </Panel>
        <Panel header="5.	Feed-in Tariffs:" key="5" className="question-panel">
          <CustomPanel image={s5} title="5.	Feed-in Tariffs:">
            <p>
              • Victoria provides feed-in tariffs for excess solar energy that
              is exported back to the grid.
              https://engage.vic.gov.au/minimum-feed-tariff-review-202223
            </p>
            <span>
              • The current minimum feed-in tariff rate in Victoria is around
              10.2 cents per kilowatt-hour, as per the Essential Services
              Commission.
            </span>
          </CustomPanel>
        </Panel>
        <Panel header="6.	Job Creation:" key="6" className="question-panel">
          <CustomPanel image={s6} title="6.	Job Creation:">
            <p>
              • The solar industry creates job opportunities, contributing to
              the local economy.
            </p>
            <span>
              • In Victoria, solar jobs have increased by over 85% in recent
              years, according to data from the Australian Solar Council.
              https://www.abs.gov.au/statistics/labour/employment-and-unemployment/employment-renewable-energy-activities-australia/latest-release#:~:text=The%20increase%20of%20FTE%20employment,(1%2C220%20additional%20FTE%20jobs).
            </span>
          </CustomPanel>
        </Panel>
        <Panel
          header="7.	Increased Property Value:"
          key="7"
          className="question-panel"
        >
          <CustomPanel image={s7} title="7.	Increased Property Value:">
            <p>
              • Solar panel installations can increase the resale value of
              properties.
            </p>
            <span>
              • A study by the Lawrence Berkeley National Laboratory found that
              solar-equipped homes tend to have higher property values in the
              United States. This can be extrapolated to Victoria as well in the
              future.
              https://newscenter.lbl.gov/2015/01/13/berkeley-lab-illuminates-price-premiums-u-s-solar-home-sales/
            </span>
          </CustomPanel>
        </Panel>
        <Panel
          header="8.	Energy Independence:"
          key="8"
          className="question-panel"
        >
          <CustomPanel image={s8} title="8.	Energy Independence:">
            <p>
              • Solar energy reduces reliance on external energy sources,
              enhancing energy security.
            </p>
            <span>
              • As of 2021, around 20% of Victoria's electricity was generated
              from renewable sources, contributing to energy diversification.
            </span>
          </CustomPanel>
        </Panel>
        <Panel
          header="9.	Supports Grid Stability:"
          key="9"
          className="question-panel"
        >
          <CustomPanel image={s9} title="9.	Supports Grid Stability:">
            <p>
              • Solar installations can help stabilize the grid by generating
              power during peak demand periods.
            </p>
            <span>
              • During sunny days, residential solar systems contribute to
              meeting electricity demand and reducing strain on the grid.
            </span>
          </CustomPanel>
        </Panel>
        <Panel
          header="10.	Technological Advancements:"
          key="10"
          className="question-panel"
        >
          <CustomPanel image={s10} title="10.	Technological Advancements:">
            <p>
              • Solar technology continues to improve, making it more efficient
              and affordable.
            </p>
            <span>
              • The efficiency of solar panels has improved by around 40% over
              the last decade, increasing overall energy generation.
            </span>
          </CustomPanel>
        </Panel>
      </Collapse>
    </div>
  );
};

export default SolarEnergyBenefit;
