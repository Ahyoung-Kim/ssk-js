import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getClassInfo } from "../redux/actions/classInfoAction";
import useUser from "./useUser";

const useClassInfo = (tutoringId, year, month) => {
  const user = useUser();
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
  }, [classInfo]);

  useEffect(() => {
    if (user) {
      dispatchData();
    }
  }, [user, tutoringId, year, month]);

  if (classInfo) {
    return classInfo;
  }
};

export default useClassInfo;
