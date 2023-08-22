import React, { useState } from "react";
import "./style.scss";
import { Image, Collapse } from "antd";
import sup1 from "../../assets/images/gov-sup/sup-1.png";
import sup2 from "../../assets/images/gov-sup/sup-2.png";
import sup3 from "../../assets/images/gov-sup/sup-3.png";
import sup4 from "../../assets/images/gov-sup/sup-4.png";
import Navbar from "../../components/Navbar/Navbar";

const { Panel } = Collapse;

const CustomPanel = ({ image, title, children }) => (
  <div className="custom-panel">
    {image && <Image src={image} />}
    <div className="content">{children}</div>
  </div>
);

const GovernmentSupport = () => {
  const [activeKeys, setActiveKeys] = useState(["1", "2", "3", "4", "5"]); // Initially all panels are active (open)

  return (
    <div className="government-support">
      <Navbar isHomePage={false} />
      <h1>Government Support</h1>

      <Collapse
        accordion={false}
        activeKey={activeKeys} // Active panels
        onChange={(key) => setActiveKeys(key)}
        destroyInactivePanel={false} // keep the inactive panels
        className="question-collapse"
        expandIconPosition="right"
      >
        <div className="sub-img">
          <Image src={sup1} />
        </div>
        <h2 className="sub-title">VICTORIA’S SOLAR REBATE</h2>
        <p className="sub-description">
          The Victoria Solar Homes Program in Australia's Victoria state is an
          initiative aimed at encouraging the adoption of solar power systems
          among homeowners. As part of this program, eligible homeowners can
          receive a solar rebate to help offset the costs of installing solar
          panels. Victorian government is offering a generous solar rebate of up
          to $4,000 for eligible households who install a solar PV system. The
          rebate is available to both homeowners and renters and is designed to
          make solar more affordable for Victorians. It's important to check the
          official government website or contact relevant authorities for the
          most up-to-date information on the program's eligibility criteria and
          rebate amounts.
        </p>
        <Panel
          header="Q：Who is eligible for the rebate/subsidy, specifically?"
          key="1"
          className="question-panel"
        >
          <CustomPanel title="Q：Who is eligible for the rebate/subsidy, specifically?">
            <p>
              A：The Victorian Solar Rebate is available to eligible households
              in Victoria, Australia, who install a solar photovoltaic (PV)
              system with a capacity of up to 4 kilowatts (kW). To be eligible,
              households must have a combined income of less than $180,000 per
              year, live in a property with a rateable value of less than $3
              million, and own the property or have a long-term lease agreement
              (at least 6 months). The household must also be an owner-occupier
              or a tenant living in the property, and the solar PV system must
              be installed by a licensed and accredited solar installer. The
              system must meet all relevant safety standards and be approved by
              the Victorian Government's Solar Victoria program. The rebate is
              available until 30 June 2024, or until funds are exhausted. To
              determine eligibility and obtain accurate information, it is
              advisable to refer to the official guidelines provided by the
              government or program administrators.
            </p>
          </CustomPanel>
        </Panel>

        <Panel
          header="Q：How do I claim the VIC solar rebate?"
          key="2"
          className="question-panel"
        >
          <CustomPanel image={sup2} title="How to Claim?">
            <p>
              A：To claim the VIC solar rebate under the Victoria Solar Homes
              Program, you typically need to follow a few steps. First, select
              an approved solar retailer from the list provided by the Clean
              Energy Council. Then, obtain a quote from the chosen retailer for
              the installation of a solar panel system. If you decide to
              proceed, the solar retailer will submit the rebate application on
              your behalf, requiring documentation such as proof of income and
              property ownership. Once your application is approved, you can
              proceed with the installation by the approved retailer. After the
              system is installed and operational, the rebate amount will be
              deducted from the total cost of the system. It is important to
              note that the claiming process may have changed, so it is
              advisable to consult the official government website or contact
              the relevant program authorities for the most up-to-date
              instructions and requirements. Solar Victoria is a Victorian
              government portfolio that runs the Solar Homes Program. This
              program encourages the adoption of renewable solar energy by
              offering a number of different rebates. You can find out more
              about each of the following rebates via the Solar Victoria
              website.
            </p>
          </CustomPanel>
        </Panel>
        <h2 className="sub-title">Federal Incentives & Solar Rebates</h2>
        <p className="sub-description">
          The federal solar rebates provides an incentive for solar systems both
          small and large under the Renewable Energy Target (RET).The RET
          incentivises small-scale and large-scale solar projects differently,
          with separate segments known as the Large-Scale Renewable Energy
          Target (LRET) and the Small-Scale Renewable Energy Scheme (SRES). In
          this article we discuss how incentives operate under each of these
          programs.
        </p>
        <Panel
          header="Q：Incentives for small-scale solar (Residential & commercial under 100kW)"
          key="3"
          className="question-panel"
        >
          <CustomPanel title="Q：Incentives for small-scale solar (Residential & commercial under 100kW)">
            <p>
              A：The SRES was developed to assist households, small business and
              community groups with the cost of installing a solar PV system.
              The SRES works by issuing Small-scale Technology Certificates
              (STCs) to homes & businesses that install systems under 100
              kilowatts (kW) in terms of the DC Solar Panel capacity. The STCs
              are officially created once an accredited Solar Installer has
              commissioned the system.
            </p>
          </CustomPanel>
        </Panel>

        <Panel
          header="Q：How Are STCs Calculated?"
          key="4"
          className="question-panel"
        >
          <CustomPanel image={sup3} title="Q：How Are STCs Calculated?">
            <p>
              STCs are based on the expected output..A：STCs are based on the
              expected output of the solar system until 2030 when the STC rebate
              will cease. One STC is the equivalent of 1 megawatt-hour (MWh) of
              renewable energy. So to calculate your STCs you will need to
              calculate how many MWh is produced by your system each year until
              2030. Important the number of years in the calculation changes on
              the 1st of January each year. Without fail many in the solar
              industry will use this date to create a false sense of urgency as
              the change of one year will only impact the purchase price by
              around 4-5%..
            </p>
          </CustomPanel>
        </Panel>
        <Panel
          header="Q: What is the Typical System Sizes?"
          key="5"
          className="question-panel"
        >
          <CustomPanel
            image={sup4}
            title="Q: What is the Typical System Sizes?"
          >
            <p>
              A: The most common residential system size is a 6.6kW Solar Panel
              system with a 5kW inverter – as this is the maximum allowable for
              single phase connections in many of Australia’s electrical
              networks. A 6.6kW Solar Panel System in Sydney would generate
              approximately 9.1 MWh per year. As 1MWh = 1 STC then the system
              would generate 9.1 STCs per year. As there are 10 years left
              between 2021 and 2030 (inclusive) then a system installed this
              year would generate 9.1 x 10 = 91 STCs. At todays price of $35 per
              STC the rebate for a 6.6kW system in Sydney would be worth $3,185.
              As a 6.6kW system would generate a different amount of power
              depending where in Australia it is installed (based on the
              different amount of sunlight), the clean energy regulator has
              split Australia into four zones. Remaining factors that would
              influence the output of a system like shading, panel orientation,
              efficiency losses are ignored for the purposes of the STC solar
              rebate.
            </p>
          </CustomPanel>
        </Panel>
      </Collapse>
    </div>
  );
};

export default GovernmentSupport;
