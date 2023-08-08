import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import classListReducer from "./reducers/classList";

const rootReducer = combineReducers({
  classListReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
