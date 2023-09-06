import { createSlice } from "@reduxjs/toolkit";
import {
  fetchWithBatteryData,
  fetchWithoutBatteryData,
  fetchAngleAndOrientationData,
  fetchZoneRatingData,
  fetchYearlyMarketValuationData,
  fetchLocationData,
  updateFieldAsync,
} from "../Thunks/solarFormThunks"; // Assuming they're in the same directory

/**
 * Initial state for the solarForm slice.
 */
const initialState = {
  personalDetails: {
    name: "",
    gender: null,
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
    wantBattery: null, // Either "Yes" or "No"
    batterySize: 5, // Defaulted to 5 kW
    isCompleted: false,
  },
  pricing: {
    withoutBattery: null,
    withBattery: null,
    isCompleted: false,
  },
  annualBillSavings: {
    solarPowerSystem: null,
    directionFacing: null,
    angle: 0,
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
      .addCase(updateFieldAsync.fulfilled, (state, action) => {
        const { section, field, value } = action.payload;
        state[section][field] = value;
      });
  },
});

export const { updateField, updatePostcodeInfo } = solarFormSlice.actions;
export const selectSolarForm = (state) => state.solarForm;
export default solarFormSlice.reducer;
