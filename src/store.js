import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk"; // Import redux-thunk

import solarFormReducer from "./reduxToolkit/slices/solarFormSlice";

export const store = configureStore({
  reducer: {
    solarForm: solarFormReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Apply the middleware
});

export default store;
