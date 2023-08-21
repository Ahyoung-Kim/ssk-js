import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAssignmentList } from "../redux/actions/assignmentListAction";

const useAssignmentList = (tutoringId) => {
  const dispatch = useDispatch();
  const assignmentList = useSelector(
    (state) => state.assignmentListReducer?.[tutoringId]
  );

  const dispatchData = () => {
    getAssignmentList(tutoringId).then((ret) => {
      dispatch(ret);
    });
  };

  useEffect(() => {
    if (!assignmentList) {
      dispatchData();
    }
  }, [tutoringId, assignmentList]);

  if (assignmentList) {
    return assignmentList;
  }
};

export default useAssignmentList;
