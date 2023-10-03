import { configureStore } from "@reduxjs/toolkit";
import solarFormReducer from "./src/reduxToolkit/slices/solarFormSlice"; // Adjust the path accordingly

export const setupStore = () => {
  return configureStore({
    reducer: {
      solarForm: solarFormReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
};
