import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import classListReducer from "./reducers/classList";
import classListInfoReducer from "./reducers/classListInfo";
import classInfoReducer from "./reducers/classInfo";
import reviewTagListReducer from "./reducers/reviewTagList";
import assignmentListReducer from "./reducers/assignmentList";
import classNoteReducer from "./reducers/classNote";
import feedInfoReducer from "./reducers/feedInfo";
import reviewListReducer from "./reducers/reviewList";

const rootReducer = combineReducers({
  classListReducer,
  classListInfoReducer,
  classInfoReducer,
  reviewTagListReducer,
  assignmentListReducer,
  classNoteReducer,
  feedInfoReducer,
  reviewListReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
