import ClassInfoActionType from "./types/ClassInfoActionType";
import client from "../../config/axios";

export const getClassInfo = async (tutoringId, year, month) => {
  let payload = null;

  try {
    const ret = await client.get(
      `/api/tutoring/detail/${tutoringId}/${year}/${month}`
    );

    if (ret.status == 200) {
      // console.log("class info: ", ret.data);
      payload = {
        [tutoringId]: ret.data,
      };
    }
  } catch (err) {
    console.log("get class detail info error: ", err);
  }

  return {
    type: ClassInfoActionType.GET_CLASS_INFO,
    payload,
  };
};

export const clearClassInfo = () => {
  return {
    type: ClassInfoActionType.CLEAR_CLASS_INFO,
    payload: null,
  };
};

export const deleteClassInfo = async (tutoringId) => {};

export const withdrawClassInfo = async (tutoringId) => {
  try {
    const ret = await client.delete(`/api/tutoring/${tutoringId}/withdraw`);
  } catch (err) {
    console.log("withdraw class error: ", err);
  }

  const payload = {
    [tutoringId]: null,
  };

  return {
    type: ClassInfoActionType.WITHDRAW_CLASS_INFO,
    payload,
  };
};
