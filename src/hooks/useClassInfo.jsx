import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getClassInfo } from "../redux/actions/classInfoAction";

const useClassInfo = (tutoringId, year, month) => {
  const dispatch = useDispatch();
  const classInfo = useSelector(
    (state) => state.classInfoReducer?.[tutoringId]
  );

  const dispatchData = () => {
    getClassInfo(tutoringId, year, month) //
      .then((ret) => {
        dispatch(ret);
      });
  };

  useEffect(() => {
    if (!classInfo) {
      dispatchData();
    }
  }, [classInfo, tutoringId, year, month]);

  if (classInfo) {
    return classInfo;
  }
};

export default useClassInfo;
