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
  const [zoom, setZoom] = useState(20); // initial zoom level

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
    console.log("Polygon creation detected!"); // Debugging line

    const newArea = calculateArea(polygon);

    const bounds = new window.google.maps.LatLngBounds();
    polygon.getPath().forEach((point) => {
      bounds.extend(point);
    });
    const center = bounds.getCenter();

    setPolygons((prevPolygons) => {
      console.log("Previous Polygons:", prevPolygons);
      return [...prevPolygons, { polygon, center }];
    });
    setAreas([...areas, newArea]);
  };

  const moveToPolygon = (polygonCenter) => {
    if (!polygonCenter || !polygonCenter.lat || !polygonCenter.lng) {
      console.error("Invalid polygonCenter:", polygonCenter);
      return;
    }
    setCenter({
      lat: polygonCenter.lat(),
      lng: polygonCenter.lng(),
    });
    setZoom(100); // Set zoom level to 20, or any desired level
  };

  const deletePolygon = (index) => {
    polygons[index].setMap(null);

    const newPolygons = [...polygons];
    const newAreas = [...areas];

    newPolygons.splice(index, 1);
    newAreas.splice(index, 1);

    setPolygons(newPolygons);
    setAreas(newAreas);
  };

  const getTotalArea = () => areas.reduce((total, area) => total + area, 0);

  return (
    <div className="estimation-container">
      <Navbar isHomePage={false} />

      <h2>Discover the solar potential of your roof</h2>

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
                        ? Math.round(Math.round(getTotalArea()) / 4)
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
                  zoom={zoom} // Use zoom state here
                  mapTypeId="satellite"
                  mapTypeControl={true}
                  className="ggMap-container"
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

                <div className="polygon-management">
                  <h4>Drawn Polygons</h4>
                  {polygons.map(
                    (_, index) =>
                      index < polygons.length / 2 && (
                        <PolygonInfo
                          key={index}
                          index={index}
                          onDelete={() => deletePolygon(index)}
                          area={areas[index]}
                          vertices2D={vertices3D[index]}
                          moveToPolygon={() => {
                            const polygonCenter =
                              polygons[index * 2 + 1].center;
                            if (polygonCenter) {
                              moveToPolygon(polygonCenter);
                            } else {
                              console.error(
                                `Center for polygon ${index} is not defined`
                              );
                            }
                          }}
                        />
                      )
                  )}
                </div>
              </div>
              {/* Polygon Management Section */}
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
