import React, { useState, useEffect } from "react";

import client from "../config/axios";
import { useSelector } from "react-redux";

const useTodayClassList = () => {
  const classListInfo = useSelector(
    (state) => state.classListInfoReducer.classListInfo
  );

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [day, setDay] = useState(today.getDate());

  const [result, setResult] = useState(null);

  const getTodayClassList = async () => {
    try {
      const ret = await client.get(`/api/schedule/${year}/${month}/${day}`);

      if (ret.status == 200) {
        setResult(ret.data);
      }
    } catch (err) {
      console.log("get today class list error: ", err);
      const status = err?.response?.status;

      if (status == 404) {
        setResult([]);
      }
    }
  };

  useEffect(() => {
    if (classListInfo) {
      getTodayClassList();
    }
  }, [year, month, day, classListInfo]);

  if (result) {
    return result;
  }
};

export default useTodayClassList;
