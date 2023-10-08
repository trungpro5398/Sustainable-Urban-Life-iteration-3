// dataFetcher.js

import {
  fetchDewellings,
  fetchTarffic,
  fetchTop10,
} from "../../reduxToolkit/Thunks/solarFormThunks";

const fetchSolarTrend = async (dispatch) => {
  const promises = [
    dispatch(fetchDewellings()).unwrap(),
    dispatch(fetchTarffic()).unwrap(),
    dispatch(fetchTop10()).unwrap(),
  ];

  await Promise.all(promises);
};

export { fetchSolarTrend };
