import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getClassList } from "../redux/actions/classListAction";

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
  }, []);

  if (classList) {
    return classList;
  }
};

export default useClassList;
