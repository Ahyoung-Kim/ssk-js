import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import classListReducer from "./reducers/classList";
import classListInfoReducer from "./reducers/classListInfo";
import classInfoReducer from "./reducers/classInfo";

const rootReducer = combineReducers({
  classListReducer,
  classListInfoReducer,
  classInfoReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
