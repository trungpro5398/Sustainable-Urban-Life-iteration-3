// store.js

// Import necessary libraries for Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";

// Import your solarForm reducer from the slices directory
import solarFormReducer from "./reduxToolkit/slices/solarFormSlice";

// Create the Redux store
// The Redux store holds the whole state tree of the application.
// The state of the application evolves by dispatching actions to the store
// and these actions are processed by reducer functions inside the store.
export const store = configureStore({
  // The reducer field specifies which reducer function is responsible for handling which part of the Redux state.
  // In this case, the solarForm part of the state is managed by the solarFormReducer.
  reducer: {
    solarForm: solarFormReducer,
  },
});

// Export the store as the default export
export default store;
