import React, { useState } from "react";
import TabButton from "./TabButton";
import FootprintContainer from "../Footprint/FootprintContainer";
import NeighbourContainer from "../Neighbour/NeighbourContainer";
import "./TabContainer.scss";

const TabContainer = () => {
  const [activeTab, setActiveTab] = useState("Your Footprint");

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="tab-container">
      <div className="tab-buttons">
        <TabButton
          active={activeTab === "Your Footprint"}
          onClick={() => handleTabChange("Your Footprint")}
          label="Your Footprint"
        />
        <TabButton
          active={activeTab === "Your Neighbour"}
          onClick={() => handleTabChange("Your Neighbour")}
          label="Your Neighbour"
        />
        <TabButton
          active={activeTab === "Your Settings"}
          onClick={() => handleTabChange("Your Settings")}
          label="Your Settings"
        />
      </div>
      {activeTab === "Your Footprint" && <FootprintContainer />}
      {activeTab === "Your Neighbour" && <NeighbourContainer />}
      {/* Add similar condition for "Your Settings" when you have the component */}
    </div>
  );
};

export default TabContainer;
