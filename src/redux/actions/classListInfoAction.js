import ClassListInfoActionType from "./types/ClassListInfoActionType";
import client from "../../config/axios";

export const getClassListInfo = async (year, month) => {
  let payload = [];

  try {
    const ret = await client.get(
      `/api/schedule/list/tutorings/${year}/${month}`
    );

    if (ret.status == 200) {
      payload = [...ret.data];
    }
  } catch (err) {
    console.log("get tutoring schedules error", err);
    if (err?.response?.status) {
      const status = err?.response?.status;
      if (status == 404) {
        console.log("Tutoring list doesn't exist");
      }
    }
  }

  return {
    type: ClassListInfoActionType.GET_CLASS_LIST_INFO,
    payload,
  };
};

export const clearClassListInfo = () => {
  return {
    type: ClassListInfoActionType.CLEAR_CLASS_LIST_INFO,
    payload: null,
  };
};
