import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchWithBatteryData = createAsyncThunk(
  "solarForm/fetchWithBatteryData",
  async () => {
    const response = await fetch(
      "https://sustainable-urban-life-backend.onrender.com/api/solar_energy/solar_package_wb"
    );
    return response.json();
  }
);

export const fetchWithoutBatteryData = createAsyncThunk(
  "solarForm/fetchWithoutBatteryData",
  async () => {
    const response = await fetch(
      "https://sustainable-urban-life-backend.onrender.com/api/solar_energy/solar_package_wob"
    );
    return response.json();
  }
);

export const fetchAngleAndOrientationData = createAsyncThunk(
  "solarForm/fetchAngleAndOrientationData",
  async () => {
    const response = await fetch(
      "https://sustainable-urban-life-backend.onrender.com/api/solar_energy/angel_and_oeratation"
    );
    return response.json();
  }
);

export const fetchZoneRatingData = createAsyncThunk(
  "solarForm/fetchZoneRatingData",
  async () => {
    const response = await fetch(
      "https://sustainable-urban-life-backend.onrender.com/api/solar_energy/Zone_rating"
    );
    return response.json();
  }
);

export const fetchYearlyMarketValuationData = createAsyncThunk(
  "solarForm/fetchYearlyMarketValuationData",
  async () => {
    const response = await fetch(
      "https://sustainable-urban-life-backend.onrender.com/api/solar_energy/yaerly_market_valuation"
    );
    return response.json();
  }
);

export const fetchLocationData = createAsyncThunk(
  "solarForm/fetchLocationData",
  async () => {
    const response = await fetch(
      "https://sustainable-urban-life-backend.onrender.com/api/solar_energy/sub_info"
    );
    return response.json();
  }
);

export const fetchBatteryCost = createAsyncThunk(
  "solarForm/fetchBatteryCost",
  async () => {
    const response = await fetch(
      "https://sustainable-urban-life-backend.onrender.com/api/solar_energy/battery_cost"
    );
    return response.json();
  }
);

export const fetchDewellings = createAsyncThunk(
  "solarForm/fetchDewellings",
  async () => {
    const response = await fetch(
      "https://sustainable-urban-life-backend.onrender.com/api/solar_energy/dewellings"
    );
    return response.json();
  }
);
export const fetchTarffic = createAsyncThunk(
  "solarForm/fetchTarffic",
  async () => {
    const response = await fetch(
      "https://sustainable-urban-life-backend.onrender.com/api/solar_energy/Tarffic"
    );
    return response.json();
  }
);
export const fetchTop10 = createAsyncThunk("solarForm/fetchTop10", async () => {
  const response = await fetch(
    "https://sustainable-urban-life-backend.onrender.com/api/solar_energy/Top_10"
  );
  return response.json();
});

export const updateFieldAsync = createAsyncThunk(
  "solarForm/updateFieldAsync",
  async (payload) => {
    // If you have any async operations, perform them here
    return payload; // This will be passed to the fulfilled reducer
  }
);
