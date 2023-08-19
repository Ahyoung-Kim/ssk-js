import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getClassList, clearClassList } from "../redux/actions/classListAction";

const useClassList = () => {
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

  if (classList) {
    return classList;
  }
};

export default useClassList;
