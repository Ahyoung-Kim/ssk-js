import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import useUser from "./useUser";
import { getReviewTagList } from "../redux/actions/reviewTagListAction";

const useReviewTagList = (tutoringId) => {
  const reviewTagList = useSelector(
    (state) => state.reviewTagListReducer?.[tutoringId]
  );
  const dispatch = useDispatch();
  const user = useUser();

  const dispatchData = () => {
    getReviewTagList(tutoringId).then((ret) => dispatch(ret));
  };

  useEffect(() => {
    if (!reviewTagList) {
      dispatchData();
    }
  }, [reviewTagList]);

  useEffect(() => {
    if (user) {
      dispatchData();
    }
  }, [user, tutoringId]);

  if (reviewTagList) {
    return reviewTagList;
  }
};

export default useReviewTagList;
