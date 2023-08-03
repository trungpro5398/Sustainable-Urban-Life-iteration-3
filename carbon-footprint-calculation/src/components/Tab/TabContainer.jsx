import React, { useState } from "react";
import { useSelector } from "react-redux";
import TabButton from "./TabButton";
import FootprintContainer from "../Footprint/FootprintContainer";
import NeighbourContainer from "../Neighbour/NeighbourContainer";
import SettingsContainer from "../SettingContainer/SettingContainer";
import "./TabContainer.scss";

const TabContainer = () => {
  const [activeTab, setActiveTab] = useState("Your Footprint");
  const energyData = useSelector((state) => state.energy);

  const handleTabChange = (tabName) => {
    if (
      !(
        tabName === "Your Neighbour" &&
        !(energyData.gas && energyData.electricity)
      )
    ) {
      setActiveTab(tabName);
    }
  };

  const isNeighbourDisabled = !(energyData.gas && energyData.electricity); // adjust this condition according to your requirements

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
          disabled={isNeighbourDisabled}
        />
        <TabButton
          active={activeTab === "Your Settings"}
          onClick={() => handleTabChange("Your Settings")}
          label="Your Settings"
        />
      </div>
      {activeTab === "Your Footprint" && <FootprintContainer />}
      {activeTab === "Your Neighbour" && !isNeighbourDisabled && (
        <NeighbourContainer />
      )}
      {activeTab === "Your Settings" && <SettingsContainer />}
    </div>
  );
};

export default TabContainer;
