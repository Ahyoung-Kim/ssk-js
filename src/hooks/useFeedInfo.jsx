import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getFeedInfo } from "../redux/actions/feedInfoAction";

const useFeedInfo = (assignmentId) => {
  const dispatch = useDispatch();
  const feedInfo = useSelector(
    (state) => state.feedInfoReducer?.[assignmentId]
  );

  const dispatchData = () => {
    getFeedInfo(assignmentId).then((ret) => dispatch(ret));
  };

  useEffect(() => {
    if (!feedInfo) {
      dispatchData();
    }
  }, [assignmentId, feedInfo]);

  if (feedInfo) {
    return feedInfo;
  }
};

export default useFeedInfo;
