// store.js

import { configureStore } from "@reduxjs/toolkit";
import energyReducer from "./reduxToolkit/slices/energySlice";
import solarFormReducer from "./reduxToolkit/slices/solarFormSlice";
export const store = configureStore({
  reducer: {
    energy: energyReducer,
    solarForm: solarFormReducer,
  },
});

export default store;
