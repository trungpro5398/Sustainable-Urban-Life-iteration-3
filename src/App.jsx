import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Styles
import "./App.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Redux store
import { store } from "./store";
import CustomLoadingSpinner from "./components/CustomLoadingSpinner/CustomLoadingSpinner";

// Lazy load your components
const Home = React.lazy(() => import("./pages/HomePage/Home"));
const SolarChoice = React.lazy(() => import("./pages/SolarChoice/SolarChoice"));
const GovernmentSupport = React.lazy(() =>
  import("./pages/GovernmentSupport/GovernmentSupport")
);
const SolarEnergyBenefit = React.lazy(() =>
  import("./pages/SolarEnergyBenefit/SolarEnergyBenefit")
);
const Estimation = React.lazy(() => import("./pages/Estimation/Estimation"));
const SolarTrend = React.lazy(() => import("./pages/SolarTrend/SolarTrend"));
const NotFoundPage = React.lazy(() =>
  import("./pages/NotFoundPage/NotFoundPage")
);

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <div className="content">
            {/* Use Suspense to show a fallback while your components are being lazy-loaded */}
            <Suspense fallback={<CustomLoadingSpinner isPageLoading={true} />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/solar-choice" element={<SolarChoice />} />
                <Route
                  path="/government-support"
                  element={<GovernmentSupport />}
                />
                <Route path="/estimation" element={<Estimation />} />
                <Route path="/solar-trend" element={<SolarTrend />} />
                <Route
                  path="/solar-energy-benefit"
                  element={<SolarEnergyBenefit />}
                />
                {/* Add your 404 page at the end as a catch-all route */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
