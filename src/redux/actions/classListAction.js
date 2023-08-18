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

export const getClassList = async () => {
  const classList = await getTotalClassList();

  return {
    type: ClassListActionTypes.GET_CLASS_LSIT,
    classList,
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
