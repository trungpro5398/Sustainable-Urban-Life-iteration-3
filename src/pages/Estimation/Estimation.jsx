import React, { useState, useEffect } from "react";
import { Input } from "antd";

import {
  GoogleMap,
  LoadScript,
  DrawingManagerF,
  Autocomplete,
} from "@react-google-maps/api";
import "./style.scss";
import CustomLoadingSpinner from "../../components/CustomLoadingSpinner/CustomLoadingSpinner";
import Navbar from "../../components/Navbar/Navbar";
const containerStyle = {
  width: "100%",
  height: "500px",
};

const libraries = ["drawing", "places"];

const Estimation = () => {
  const googleMapsApiKey = "AIzaSyBKa8pMdDd-8T-Ox9feuS2vI5vO9_J41Ls";

  const [area, setArea] = useState(0); // Store the area of the drawn polygon
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  });
  const calculateArea = (polygon) => {
    const path = polygon.getPath();
    const area = window.google.maps.geometry.spherical.computeArea(path);
    setArea(area);
  };
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      const location = place.geometry.location;
      setCenter({
        lat: location.lat(),
        lng: location.lng(),
      });
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  return (
    <div className="estimation-container">
      <Navbar isHomePage={false} />

      <h1>Discover the solar potential of your roof</h1>

      {googleMapsApiKey ? (
        <LoadScript
          googleMapsApiKey={googleMapsApiKey}
          libraries={libraries}
          onLoad={() => setMapsLoaded(true)}
        >
          {mapsLoaded ? (
            <div className="container-0">
              <div className="container-1">
                <div className="address-input">
                  <label>
                    <p>Step 1. Enter your address:</p>
                    <Autocomplete
                      onLoad={onLoad}
                      onPlaceChanged={onPlaceChanged}
                    >
                      <Input placeholder="Enter your address here" />
                    </Autocomplete>
                  </label>
                  <p>
                    Step 2. Click and join dots to form a shape on your roof
                    (click rather than drag), and your preferred solar panel
                    area will be shaded.
                  </p>
                </div>

                <div className="estimated-values">
                  <div className="estimated-row">
                    <span className="estimated-label">
                      Estimated Roof Area:
                    </span>
                    <span className="estimated-value">
                      {Math.round(area)} m2
                    </span>
                  </div>
                  <div className="estimated-row">
                    <span className="estimated-label">
                      Estimated System Size:
                    </span>
                    <span className="estimated-value">
                      {Math.round(area * 0.01)} kW
                    </span>
                  </div>
                  <div className="estimated-row">
                    <span className="estimated-label">
                      Average Daily Output:
                    </span>
                    <span className="estimated-value">
                      {Math.round(area * 0.01 * 5)} kWh
                    </span>
                  </div>
                  <div className="estimated-row">
                    <span className="estimated-label">
                      Estimated Yearly Output:
                    </span>
                    <span className="estimated-value">
                      {Math.round(area * 0.01 * 5 * 365)} kWh
                    </span>
                  </div>
                </div>
              </div>

              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={20}
              >
                <DrawingManagerF
                  onPolygonComplete={(polygon) => calculateArea(polygon)}
                  options={{
                    drawingMode: "polygon",
                    drawingControl: true,
                    drawingControlOptions: {
                      position: window.google.maps.ControlPosition.TOP_CENTER,
                      drawingModes: ["polygon"],
                    },
                    polygonOptions: {
                      fillColor: "blue",
                      strokeColor: "blue",
                      editable: true,
                      draggable: true,
                    },
                  }}
                />
              </GoogleMap>
            </div>
          ) : (
            <CustomLoadingSpinner />
          )}
          {area > 0 && (
            <p className="estimation-text">
              The estimated solar potential for the selected area is
              approximately {Math.round(area * 150)}W.
            </p>
          )}
        </LoadScript>
      ) : (
        <CustomLoadingSpinner />
      )}
    </div>
  );
};

export default Estimation;
