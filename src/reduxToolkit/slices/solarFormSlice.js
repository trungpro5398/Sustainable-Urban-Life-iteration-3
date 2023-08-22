import { createSlice } from "@reduxjs/toolkit";

export const solarFormSlice = createSlice({
  name: "solarForm",
  initialState: {
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
      wantBattery: null, // This could be "Yes" or "No"
      batterySize: 5, // Default to 5 kW
    },
    pricing: {
      withoutBattery: null,
      withBattery: null,
    },
  },
  reducers: {
    updateField: (state, action) => {
      const { section, field, value } = action.payload;
      state[section][field] = value;
    },
    updatePostcodeInfo: (state, action) => {
      state.postcodeInfo.data = action.payload;
    },
  },
});

export const { updateField, updatePostcodeInfo } = solarFormSlice.actions;

export const selectSolarForm = (state) => state.solarForm;

export default solarFormSlice.reducer;
