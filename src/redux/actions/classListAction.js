import ClassListActionTypes from "./types/ClassListActionTypes";
import client from "../../config/axios";

const getTotalClassList = async () => {
  let payload = null;

  try {
    const ret = await client.get("/api/tutoring/list");
    if (ret.status == 200) {
      payload = ret.data;
    }
  } catch (err) {
    const status = err?.response?.status;

    if (status) {
      if (status == 404) {
        // Class List doesn't exist
        payload = [];
      }
    }
  }

  return payload;
};

const getTodayClassList = async () => {
  let payload = [];

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  try {
    const ret = await client.get(`/api/schedule/${year}/${month}/${day}`);

    if (ret.status == 200) {
      payload = ret.data;
    }
  } catch (err) {
    console.log("get today class list error: ", err);
  }

  return payload;
};

export const getClassList = async () => {
  const classList = await getTotalClassList();
  const todayClassList = await getTodayClassList();

  return {
    type: ClassListActionTypes.GET_CLASS_LSIT,
    classList,
    todayClassList,
  };
};

export const createClass = () => {
  return {
    type: ClassListActionTypes.CREATE_CLASS,
    payload: null,
  };
};

export const updateClass = () => {
  return {
    type: ClassListActionTypes.UPDATE_CLASS,
    payload: null,
  };
};

export const deleteClass = () => {
  return {
    type: ClassListActionTypes.DELETE_CLASS,
    payload: null,
  };
};

export const clearClassList = () => {
  return {
    type: ClassListActionTypes.CLEAR_CLASS_LIST,
    payload: null,
  };
};
