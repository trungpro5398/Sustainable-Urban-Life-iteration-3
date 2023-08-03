import React from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import EnergyForm from "./components/EnergyForm/EnergyForm";
import TabContainer from "./components/Tab/TabContainer";
const App = () => {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <EnergyForm />
        <div className="outer-container">
          <TabContainer />
        </div>
      </div>
    </div>
  );
};

export default App;
