import { createSlice } from "@reduxjs/toolkit";
import {
  fetchWithBatteryData,
  fetchWithoutBatteryData,
  fetchAngleAndOrientationData,
  fetchZoneRatingData,
  fetchYearlyMarketValuationData,
  fetchLocationData,
  fetchBatteryCost,
  updateFieldAsync,
  fetchDewellings,
  fetchTarffic,
  fetchTop10,
} from "../Thunks/solarFormThunks"; // Assuming they're in the same directory

/**
 * Initial state for the solarForm slice.
 */
const initialState = {
  data_trend: {
    dewellings: null,
    tarffic: null,
    top10: null,
  },
  angle_and_orientation: {
    data: null,
  },
  billingCycle: {
    cycle: null,
    isCompleted: false,
  },
  electricityUsage: {
    usageValue: 0,
    usageDaily: null,
    isCompleted: false,
  },
  location: {
    data: null,
    postcode: null,
    suburb: null,
    isCompleted: false,
  },
  postcodeInfo: {
    data: null,
    isCompleted: false,
  },
  batteryChoice: {
    data: null,
    wantBattery: null, // Either "Yes" or "No"
    batterySize: 1.2, // Defaulted to 5 kW
    batteryCost: 2100,
    isCompleted: false,
  },
  pricing: {
    withoutBattery: null,
    withBattery: null,
    isCompleted: false,
  },
  annualBillSavings: {
    solarPowerSystem: null,
    directionFacing: [
      {
        direction: null,
        active: null,
        clicked: null,
        tooltip: "",
      },
    ],
    solarPanelPercentages: [100],
    yearlySaving: null,
    angle: [0],
    electricityCost: null,
    annualSpend: null,
    supplyCharge: null,
    isCompleted: false,
  },
  rebate: {
    price_installation: null,
    zone_rating: null,
    yearly_market_valuation: null,
    isCompleted: false,
  },
};

/**
 * Slice for managing data related to the solar form.
 */
const solarFormSlice = createSlice({
  name: "solarForm",
  initialState: initialState,
  reducers: {
    /**
     * A general purpose update function that can be used to update
     * any field in any section of the solarForm state.
     *
     * @param {Object} state - The current state.
     * @param {Object} action - The action payload containing section, field, and value.
     */
    updateField: (state, action) => {
      const { section, field, value } = action.payload;
      state[section][field] = value;
    },

    /**
     * Updates the postcode information data.
     *
     * @param {Object} state - The current state.
     * @param {Object} action - The action payload containing postcode information.
     */
    updatePostcodeInfo: (state, action) => {
      state.postcodeInfo.data = action.payload;
    },
    addSolarArray: (state, action) => {
      const { angle, directionFacing, percentage } = action.payload;
      // Append new values from the form data to the arrays
      state.annualBillSavings.angle.push(angle);
      state.annualBillSavings.directionFacing.push(directionFacing);
      state.annualBillSavings.solarPanelPercentages.push(percentage);
    },

    // Remove a specific entry from directionFacing, angle arrays, and solarPanelPercentages
    removeSolarArray: (state, action) => {
      const index = action.payload.index;
      if (index !== undefined && index >= 0) {
        state.annualBillSavings.directionFacing.splice(index, 1);
        state.annualBillSavings.angle.splice(index, 1);
        state.annualBillSavings.solarPanelPercentages.splice(index, 1);
      }
    },

    // Update a specific entry in directionFacing or angle arrays
    updateArrayField: (state, action) => {
      const { section, field, value, index } = action.payload;
      if (state[section][field][index] !== undefined) {
        state[section][field][index] = value;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWithBatteryData.fulfilled, (state, action) => {
        state.pricing.withBattery = action.payload;
      })
      .addCase(fetchWithoutBatteryData.fulfilled, (state, action) => {
        state.pricing.withoutBattery = action.payload;
      })
      .addCase(fetchAngleAndOrientationData.fulfilled, (state, action) => {
        state.angle_and_orientation.data = action.payload;
      })
      .addCase(fetchZoneRatingData.fulfilled, (state, action) => {
        state.rebate.zone_rating = action.payload;
      })
      .addCase(fetchYearlyMarketValuationData.fulfilled, (state, action) => {
        state.rebate.yearly_market_valuation = action.payload;
      })
      .addCase(fetchLocationData.fulfilled, (state, action) => {
        state.location.data = action.payload;
      })
      .addCase(fetchBatteryCost.fulfilled, (state, action) => {
        state.batteryChoice.data = action.payload;
      })
      .addCase(fetchDewellings.fulfilled, (state, action) => {
        state.data_trend.dewellings = action.payload;
      })
      .addCase(fetchTarffic.fulfilled, (state, action) => {
        state.data_trend.tarffic = action.payload;
      })
      .addCase(fetchTop10.fulfilled, (state, action) => {
        state.data_trend.top10 = action.payload;
      })
      .addCase(updateFieldAsync.fulfilled, (state, action) => {
        const { section, field, value } = action.payload;
        state[section][field] = value;
      });
  },
});

export const {
  updateField,
  updatePostcodeInfo,
  updateArrayField,
  removeSolarArray,
  addSolarArray,
} = solarFormSlice.actions;
export const selectSolarForm = (state) => state.solarForm;
export default solarFormSlice.reducer;
