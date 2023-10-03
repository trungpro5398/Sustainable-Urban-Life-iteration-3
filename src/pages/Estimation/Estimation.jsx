import React, { useState, useEffect } from "react";
import { Input } from "antd";
import Joyride, { STATUS } from "react-joyride";

import {
  GoogleMap,
  LoadScript,
  DrawingManagerF,
  Autocomplete,
  Marker,
} from "@react-google-maps/api";

import "./style.scss";
import CustomLoadingSpinner from "../../components/CustomLoadingSpinner/CustomLoadingSpinner";
import Navbar from "../../components/Navbar/Navbar";
import PolygonInfo from "./PolygonInfo/PolygonInfo";
const containerStyle = {
  width: "100%",
  height: "500px",
};

const libraries = ["drawing", "places"];

const Estimation = () => {
  const [polygons, setPolygons] = useState([]); // Use this to store multiple polygons
  const [areas, setAreas] = useState([]);
  const googleMapsApiKey = "AIzaSyBKa8pMdDd-8T-Ox9feuS2vI5vO9_J41Ls";
  const [selectedAddress, setSelectedAddress] = useState("");
  const [showMarker, setShowMarker] = useState(false);
  const [address, setAddress] = useState(0);
  const [inputError, setInputError] = useState(false);

  const [vertices3D, setVertices3D] = useState([]);

  const [mapsLoaded, setMapsLoaded] = useState(false);
  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  });

  const [runTour, setRunTour] = useState(true);
  const [steps, setSteps] = useState([
    {
      target: "label",
      content: "Start by entering your address in this field.",
      placement: "top-start",
    },

    {
      target: ".estimated-values",
      content:
        "Here you'll see the calculations based on the area you've drawn.",
      placement: "left",
    },
    {
      target: ".ggMap",
      content:
        "Draw a shape on the map to represent your roof area. Just click to create each point and close the shape by joining the first and last point.",
      placement: "top",
    },
    {
      target: ".gm-control-active:nth-child(1)", // This will likely target the zoom in button.
      content: "Use this button to zoom in.",
      placement: "right",
    },
    {
      target: ".gm-style-mtc", // This will likely target the satellite/roadmap toggle.
      content: "Switch between satellite and roadmap views using this toggle.",
      placement: "top",
    },

    {
      target: ".gm-svpc-control", // Street View Pegman control
      content: "Drag this figure to a road to enter Street View mode.",
      placement: "left",
    },
    {
      target: "button[title='Draw a shape']", // Drawing polygon button
      content:
        "Click this button and then draw a polygon on the map by connecting multiple points.",
      placement: "top",
    },
  ]);

  useEffect(() => {
    // Check if the user has visited the page before
    const firstTime = localStorage.getItem("firstTime");
    if (!firstTime) {
      setRunTour(true);
      localStorage.setItem("firstTime", "false");
    }
  }, []);

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      setRunTour(false);
    }
  };
  const calculateArea = (polygon) => {
    const path = polygon.getPath();
    const area = window.google.maps.geometry.spherical.computeArea(path);
    return area;
  };
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();

      if (!place.geometry) {
        // Check if the user has selected a valid location
        setInputError(true); // Set error to true if no location is selected
        return;
      }

      setInputError(false); // Reset error if there's a valid location
      const location = place.geometry.location;

      // Extract street number (or unit number) from address components
      let streetNumber = "";
      if (place.address_components) {
        for (let component of place.address_components) {
          if (component.types.includes("street_number")) {
            streetNumber = component.long_name;
            break;
          }
        }
      }

      setSelectedAddress(place.formatted_address);
      setCenter({
        lat: location.lat(),
        lng: location.lng(),
      });
      setShowMarker(true);
      setAddress(streetNumber); // Set the extracted street number
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  const handlePolygonComplete = (polygon) => {
    calculateArea(polygon);

    // Add event listener for right-click to remove last point of current polygon
    polygon.addListener("rightclick", () => {
      undoLastPoint(polygon);
    });

    // Update the polygons array
    setPolygons((prevPolygons) => [...prevPolygons, polygon]);
    const newArea = calculateArea(polygon); // Make sure calculateArea returns the area
    setPolygons([...polygons, polygon]);
    setAreas([...areas, newArea]);
    const path = polygon.getPath();

    const new3DVertices = path.getArray().map((latlng) => {
      return { x: latlng.lng(), y: latlng.lat(), z: 0 }; // z is 0 for simplicity
    });
    setVertices3D([...vertices3D, new3DVertices]);
  };

  const deletePolygon = (index) => {
    polygons[index].setMap(null);

    const newPolygons = [...polygons];
    const newAreas = [...areas];
    const newVertices3D = [...vertices3D];

    newPolygons.splice(index, 1);
    newAreas.splice(index, 1);
    newVertices3D.splice(index, 1);

    setPolygons(newPolygons);
    setAreas(newAreas);
    setVertices3D(newVertices3D);
  };

  const getTotalArea = () => areas.reduce((total, area) => total + area, 0);

  const undoLastPoint = (polygon) => {
    if (!polygon || !polygon.latLngs || !polygon.latLngs.g) return;

    const path = polygon.latLngs.g[0];

    if (path && path.getLength() > 0) {
      console.log("Removing last point");
      path.removeAt(path.getLength() - 1); // Remove the last point
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
              <Joyride
                steps={steps}
                run={runTour}
                continuous={true}
                scrollToFirstStep={true}
                showProgress={true}
                showSkipButton={true}
                callback={handleJoyrideCallback}
              />
              <div className="container-1">
                <div className="address-input">
                  <label>
                    <p>Step 1. Enter your address:</p>
                    <Autocomplete
                      onLoad={onLoad}
                      onPlaceChanged={onPlaceChanged}
                    >
                      <Input
                        value={selectedAddress}
                        onChange={(e) => setSelectedAddress(e.target.value)}
                        placeholder="Enter your address here"
                      />
                    </Autocomplete>
                  </label>
                  {inputError && (
                    <p style={{ color: "red" }}>
                      Please enter a valid address.
                    </p>
                  )}
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
                      {Math.round(getTotalArea())} m2
                    </span>
                  </div>
                  <div className="estimated-row">
                    <span className="estimated-label">
                      Estimated System Size:
                    </span>
                    <span className="estimated-value">
                      {Math.round(getTotalArea()) > 0
                        ? Math.round(
                            1.4524 * Math.round(getTotalArea()) - 7.5538
                          )
                        : 0}{" "}
                      kW
                    </span>
                  </div>
                </div>
              </div>

              <div className="ggMap">
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={20}
                  mapTypeId="satellite" // <-- Add this line
                  mapTypeControl={true} // <-- Add this line if you want a control to switch between map types
                >
                  {showMarker && <Marker position={center} label={address} />}
                  <DrawingManagerF
                    onPolygonComplete={handlePolygonComplete}
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
              {/* Polygon Management Section */}
              <div className="polygon-management">
                <h3>Drawn Polygons</h3>
                {polygons.map((_, index) => (
                  <PolygonInfo
                    key={index}
                    index={index}
                    onDelete={() => deletePolygon(index)}
                    area={areas[index]}
                    vertices2D={vertices3D[index]} // Add this line
                  />
                ))}
              </div>
            </div>
          ) : (
            <CustomLoadingSpinner />
          )}
        </LoadScript>
      ) : (
        <CustomLoadingSpinner />
      )}
    </div>
  );
};

export default Estimation;
