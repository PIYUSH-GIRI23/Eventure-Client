import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistMiddleware, loadPersistedState } from "./persistMiddleware";

import colorschemeReducer from "./slices/colorschemeSlice";
import userDataReducer from "./slices/userdataSlice";

const appReducer = combineReducers({
  colorscheme: colorschemeReducer,
  userdata: userDataReducer,
});

const preloadedState =
  typeof window !== "undefined"
    ? loadPersistedState()
    : {};

export const store = configureStore({
  reducer: appReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistMiddleware),
});