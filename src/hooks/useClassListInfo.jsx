import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getClassListInfo } from "../redux/actions/classListInfoAction";
import useUser from "./useUser";

const useClassListInfo = (year, month) => {
  const user = useUser();
  const dispatch = useDispatch();
  const classListInfo = useSelector(
    (state) => state.classListInfoReducer.classListInfo
  );

  const dispatchData = () => {
    getClassListInfo(year, month).then((ret) => {
      dispatch(ret);
    });
  };

  useEffect(() => {
    if (!classListInfo) {
      dispatchData();
    }
  }, [classListInfo]);

  useEffect(() => {
    if (user) {
      dispatchData();
    }
  }, [user, year, month]);

  if (classListInfo) {
    return classListInfo;
  }
};

export default useClassListInfo;
