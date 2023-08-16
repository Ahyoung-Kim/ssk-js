import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import classListReducer from "./reducers/classList";
import classListInfoReducer from "./reducers/classListInfo";

const rootReducer = combineReducers({
  classListReducer,
  classListInfoReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
