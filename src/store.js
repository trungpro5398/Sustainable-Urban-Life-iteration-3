// store.js

import { configureStore } from "@reduxjs/toolkit";
import energyReducer from "./reduxToolkit/slices/energySlice";

export const store = configureStore({
  reducer: {
    energy: energyReducer,
  },
});

export default store;
