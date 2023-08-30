import { createSlice } from "@reduxjs/toolkit";

/**
 * Initial state for the solarForm slice.
 */
const initialState = {
  personalDetails: {
    name: "",
    gender: null,
  },
  billingCycle: {
    cycle: null,
  },
  electricityUsage: {
    usageValue: 50,
    usageDaily: null,
  },
  location: {
    suburb: null,
  },
  postcodeInfo: {
    data: null,
  },
  batteryChoice: {
    wantBattery: null, // Either "Yes" or "No"
    batterySize: 5, // Defaulted to 5 kW
  },
  pricing: {
    withoutBattery: null,
    withBattery: null,
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
});

// Action creators are generated for each case reducer function
export const { updateField, updatePostcodeInfo } = solarFormSlice.actions;

/**
 * A selector to retrieve the solar form state from the global state.
 *
 * @param {Object} state - The global state.
 * @returns {Object} The solarForm state.
 */
export const selectSolarForm = (state) => state.solarForm;

// Default export for the reducer
export default solarFormSlice.reducer;
