import React, { useEffect, useState } from "react";
import client from "../config/axios";

const useClassList = () => {
  const [classList, setClassList] = useState(null);

  const getClassList = async () => {
    try {
      const ret = await client.get("/api/tutoring/list");

      if (ret.status == 200) {
        setClassList(ret.data);
      }
    } catch (err) {
      console.log("get class list error: ", err);
      if (err.response && err.response.status) {
        const status = err.response.status;
        if (status == 404) {
          console.log("Class list doesn't exist");
          setClassList([]);
        }
      }
    }
  };

  useEffect(() => {
    getClassList();
  }, []);

  return classList;
};

export default useClassList;
