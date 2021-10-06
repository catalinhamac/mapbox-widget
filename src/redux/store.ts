import { configureStore, AnyAction, Reducer } from "@reduxjs/toolkit";

import combinedReducer from "./combineReducers";

type AppState = ReturnType<typeof combinedReducer>;

const rootReducer: Reducer<AppState, AnyAction> = (state, action) => {
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
