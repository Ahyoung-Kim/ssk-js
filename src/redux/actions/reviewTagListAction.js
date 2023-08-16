import ReviewTagListActionType from "./types/ReviewTagListActionType";
import client from "../../config/axios";

export const getReviewTagList = async (tutoringId) => {
  let payload = null;

  try {
    const ret = await client.post("/api/tag/list", {
      tutoringId,
    });

    if (ret.status == 200) {
      // console.log(ret.data);
      payload = {
        [tutoringId]: ret.data.tagList,
      };
    }
  } catch (err) {
    console.log("get tag list error: ", err);
    const status = err?.response?.status;

    if (status == 404) {
      payload = {
        [tutoringId]: [],
      };
    }
  }

  return {
    type: ReviewTagListActionType.GET_REVIEW_TAG_LIST,
    payload,
  };
};

export const deleteReviewTag = async (tutoringId) => {
  return {
    type: ReviewTagListActionType.DELETE_REVIEW_TAG,
    [tutoringId]: null,
  };
};
