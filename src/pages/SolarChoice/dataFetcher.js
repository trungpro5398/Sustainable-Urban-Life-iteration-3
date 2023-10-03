// dataFetcher.js

import {
  fetchWithBatteryData,
  fetchWithoutBatteryData,
  fetchAngleAndOrientationData,
  fetchZoneRatingData,
  fetchYearlyMarketValuationData,
  fetchLocationData,
  fetchBatteryCost,
} from "../../reduxToolkit/Thunks/solarFormThunks";

/**
 * Fetch initial data necessary for the SolarChoice component.
 * Dispatches fetched data to the Redux store.
 *
 * @param {Function} dispatch - Redux dispatch function.
 * @throws Will throw an error if any of the fetching promises fail.
 */
const fetchInitialData = async (dispatch) => {
  const promises = [
    dispatch(fetchWithBatteryData()).unwrap(),
    dispatch(fetchWithoutBatteryData()).unwrap(),
    dispatch(fetchAngleAndOrientationData()).unwrap(),
    dispatch(fetchZoneRatingData()).unwrap(),
    dispatch(fetchYearlyMarketValuationData()).unwrap(),
    dispatch(fetchLocationData()).unwrap(),
    dispatch(fetchBatteryCost()).unwrap(),
  ];

  await Promise.all(promises);
};

export { fetchInitialData };
