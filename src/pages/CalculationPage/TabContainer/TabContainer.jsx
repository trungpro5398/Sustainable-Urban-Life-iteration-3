import React, { useState } from "react";
import TabButton from "./TabButton";

import "./TabContainer.scss";
import SolarAnalysisContainer from "../SolarAnalysisContainer/SolarAnalysisContainer";
import ChartsContainer from "../ChartsContainer/ChartsContainer";
const TabContainer = () => {
  const [activeTab, setActiveTab] = useState("User Input Results");

  return (
    <div className="tab-container">
      <div className="tab-buttons">
        <TabButton
          active={activeTab === "User Input Results"}
          onClick={() => setActiveTab("User Input Results")}
          label="User Input Results"
        />
        <TabButton
          active={activeTab === "Charts"}
          onClick={() => setActiveTab("Charts")}
          label="Suburb’s solar"
        />
        <TabButton
          active={activeTab === "Quotes"}
          onClick={() => setActiveTab("Quotes")}
          label="Quotes"
        />
      </div>
      {activeTab === "User Input Results" && <SolarAnalysisContainer />}
      {activeTab === "Charts" && <ChartsContainer />}
    </div>
  );
};

export default TabContainer;
