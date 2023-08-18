import ReviewListActionType from "./types/ReviewListActionType";
import client from "../../config/axios";

export const getReviewList = async (tutoringId) => {
  let payload = null;

  try {
    const ret = await client.post("/api/review/list", {
      tutoringId,
    });

    if (ret.status == 200) {
      payload = {
        [tutoringId]: ret.data,
      };
    }
  } catch (err) {
    console.log("get review list error: ", err);
    const status = err?.response?.status;

    if (status == 404) {
      payload = {
        [tutoringId]: [],
      };
    }
  }

  return {
    type: ReviewListActionType.GET_REVIEW_LIST,
    payload,
  };
};

export const clearReviewList = () => {
  return {
    type: ReviewListActionType.CLEAR_REVIEW_LIST,
  };
};
