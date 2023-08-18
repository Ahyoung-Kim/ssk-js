import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getReviewList } from "../redux/actions/reviewListAction";

const useReviewList = (tutoringId) => {
  const dispatch = useDispatch();
  const reviewList = useSelector(
    (state) => state.reviewListReducer?.[tutoringId]
  );

  const dispatchData = () => {
    getReviewList(tutoringId).then((ret) => dispatch(ret));
  };

  useEffect(() => {
    if (!reviewList) {
      dispatchData();
    }
  }, [tutoringId, reviewList]);

  if (reviewList) {
    return reviewList;
  }
};

export default useReviewList;
