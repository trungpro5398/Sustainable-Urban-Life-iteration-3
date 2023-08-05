// solarFormSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const solarFormSlice = createSlice({
  name: "solarForm",
  initialState: {
    householdDetails: {
      postcode: "3168",
      avgBill: "10000",
      retailer: "ABC",
      billFrequency: "Monthly",
    },
    solarSystemDetails: {
      systemSize: "",
      systemCost: "",
      electricityUsage: 0,
    },
    batteryStorageOptions: {
      wantBattery: false,
      batteryCost: 0,
    },
    propertyDetails: {
      shadingHours: 0,
      roofPitch: 0,
      roofOrientation: "",
    },
    financeOptions: {
      financingMethod: "cash",
    },
  },
  reducers: {
    updateField: (state, action) => {
      const { section, field, value } = action.payload;
      state[section][field] = value;
    },
  },
});

export const { updateField } = solarFormSlice.actions;

export default solarFormSlice.reducer;
