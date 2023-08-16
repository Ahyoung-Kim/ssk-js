import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import classListReducer from "./reducers/classList";
import classListInfoReducer from "./reducers/classListInfo";
import classInfoReducer from "./reducers/classInfo";
import reviewTagListReducer from "./reducers/reviewTagList";

const rootReducer = combineReducers({
  classListReducer,
  classListInfoReducer,
  classInfoReducer,
  reviewTagListReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
