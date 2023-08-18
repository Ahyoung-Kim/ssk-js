import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { clearAssignmentList } from "../redux/actions/assignmentListAction";
import { clearClassInfo } from "../redux/actions/classInfoAction";
import { clearClassList } from "../redux/actions/classListAction";
import { clearClassListInfo } from "../redux/actions/classListInfoAction";
import { clearClassNote } from "../redux/actions/classNoteAction";
import { clearReviewList } from "../redux/actions/reviewListAction";
import { clearReviewTagList } from "../redux/actions/reviewTagListAction";
import { clearFeedInfo } from "../redux/actions/feedInfoAction";

const useClearRedux = () => {
  const dispatch = useDispatch();

  const clearReduxData = async (clear) => {
    if (clear) {
      dispatch(clearAssignmentList());
      dispatch(clearClassInfo());
      dispatch(clearClassList());
      dispatch(clearClassListInfo());
      dispatch(clearClassNote());
      dispatch(clearReviewList());
      dispatch(clearReviewTagList());
      dispatch(clearFeedInfo());
    }
  };

  return clearReduxData;
};

export default useClearRedux;
