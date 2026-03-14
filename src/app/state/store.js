import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistMiddleware, loadPersistedState } from "./persistMiddleware";

import colorschemeReducer from "./slices/colorschemeSlice";
import userDataReducer from "./slices/userdataSlice";
import eventsReducer from "./slices/eventsSlice";

const appReducer = combineReducers({
  colorscheme: colorschemeReducer,
  userdata: userDataReducer,
  events: eventsReducer,
});

const preloadedState =
  typeof window !== "undefined"
    ? loadPersistedState()
    : {};

export const store = configureStore({
  reducer: appReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['events/setEventsSuccess', 'events/setEventsLoading'],
        ignoredPaths: ['events']
      }
    }).concat(persistMiddleware),
});