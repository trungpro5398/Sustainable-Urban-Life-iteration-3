import React from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import EnergyForm from "./components/EnergyForm/EnergyForm";
import TabContainer from "./components/Tab/TabContainer";
import { Provider } from "react-redux";
import { store } from "./store";
const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <div className="container">
          <EnergyForm />
          <div className="outer-container">
            <TabContainer />
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default App;
