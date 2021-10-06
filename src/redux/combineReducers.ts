import { combineReducers } from "@reduxjs/toolkit";

import mapReducer from "./map/map-slice";

const combinedReducer = combineReducers({
  map: mapReducer,
});

export default combinedReducer;
