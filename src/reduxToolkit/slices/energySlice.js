import { createSlice } from "@reduxjs/toolkit";

export const energySlice = createSlice({
  name: "energy",
  initialState: {
    electricity: "",
    gas: "",
    activeTab: false,
    settings: {
      electricityPrice: 1,
      gasPrice: 1,
    },
  },
  reducers: {
    updateEnergy: (state, action) => {
      state.electricity = action.payload.electricity;
      state.gas = action.payload.gas;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    updateSettings: (state, action) => {
      state.settings.electricityPrice = action.payload.electricityPrice;
      state.settings.gasPrice = action.payload.gasPrice;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateEnergy, setActiveTab, updateSettings } =
  energySlice.actions;

export default energySlice.reducer;
