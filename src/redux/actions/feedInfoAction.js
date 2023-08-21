import FeedInfoActionType from "./types/FeedInfoActionType";
import client from "../../config/axios";

export const getFeedInfo = async (assignmentId) => {
  let payload = null;

  try {
    const ret = await client.get(`/api/assignment/${assignmentId}/submit/list`);

    if (ret.status == 200) {
      // console.log(ret.data);
      payload = {
        [assignmentId]: ret.data,
      };
    }
  } catch (err) {
    console.log("get assignment submits error: ", err);

    const status = err?.response?.status;
    if (status == 404) {
      payload = {
        [assignmentId]: [],
      };
    }
  }

  return {
    type: FeedInfoActionType.GET_FEED_INFO,
    payload,
  };
};

export const clearFeedInfo = () => {
  return {
    type: FeedInfoActionType.CLEAR_FEED_INFO,
  };
};
