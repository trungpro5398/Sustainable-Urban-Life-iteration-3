import { createSlice } from "@reduxjs/toolkit";

export const energySlice = createSlice({
  name: "energy",
  initialState: {
    electricity: "",
    gas: "",
    activeTab: false,
  },
  reducers: {
    updateEnergy: (state, action) => {
      state.electricity = action.payload.electricity;
      state.gas = action.payload.gas;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateEnergy, setActiveTab } = energySlice.actions;

export default energySlice.reducer;
