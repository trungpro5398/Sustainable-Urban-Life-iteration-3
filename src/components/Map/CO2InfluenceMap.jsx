import React from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";

const CO2InfluenceMap = ({ suburbs }) => {
  const getRadius = (emissions) => {
    // Adjusting the formula to give a better visual representation.
    return Math.sqrt(emissions) * 0.5;
  };
  const getCentroid = (polygon) => {
    if (!polygon || !polygon.length || !polygon[0].length) return [0, 0];

    let totalX = 0;
    let totalY = 0;
    const coords = polygon[0]; // Extracting the first part of the polygon
    for (let i = 0; i < coords.length; i++) {
      totalX += coords[i][0];
      totalY += coords[i][1];
    }
    return [totalY / coords.length, totalX / coords.length]; // returns [lat, lng]
  };

  const defaultPosition = [51.505, -0.09]; // Default map center, adjust as needed

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <MapContainer center={defaultPosition} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {suburbs.map((suburb) => {
          console.log(suburb);
          const center = getCentroid(suburb.coordinates);

          return (
            <CircleMarker
              center={center}
              radius={getRadius(
                suburb.average_emissions_per_customer_kg_co2e_monthly
              )}
              fillOpacity={0.5}
              color="#f44336" // CO2 influence color, change if necessary
              fillColor="#f44336"
            >
              <Tooltip>
                {suburb.suburb}:{" "}
                {suburb.average_emissions_per_customer_kg_co2e_monthly} kg
                CO2e/month
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default CO2InfluenceMap;
