import AssignmentListActionType from "./types/AssignmentListActionType";
import client from "../../config/axios";

export const getAssignmentList = async (tutoringId) => {
  let payload = null;

  try {
    const ret = await client.post("/api/assignment/list", {
      tutoringId,
    });

    if (ret.status == 200) {
      //   console.log("data: ", ret.data);
      payload = {
        [tutoringId]: ret.data,
      };
    }
  } catch (err) {
    console.log("get assignment list error: ", err);
    const status = err?.response?.status;

    if (status == 404) {
      payload = {
        [tutoringId]: [],
      };
    }
  }

  return {
    type: AssignmentListActionType.GET_ASSIGNMENT_LIST,
    payload,
  };
};

export const clearAssignmentList = () => {
  return {
    type: AssignmentListActionType.CLEAR_ASSIGNMENT_LIST,
    payload: null,
  };
};
