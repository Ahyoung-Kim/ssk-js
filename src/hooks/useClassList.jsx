import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getClassList, clearClassList } from "../redux/actions/classListAction";
import useUser from "./useUser";

const useClassList = () => {
  const user = useUser();
  const dispatch = useDispatch();
  const classList = useSelector((state) => state.classListReducer.classList);

  const dispatchClassList = () => {
    getClassList().then((ret) => {
      dispatch(ret);
    });
  };

  useEffect(() => {
    if (!classList) {
      dispatchClassList();
    }
  }, [classList]);

  useEffect(() => {
    dispatch(clearClassList);
  }, [user]);

  if (classList) {
    return classList;
  }
};

export default useClassList;
