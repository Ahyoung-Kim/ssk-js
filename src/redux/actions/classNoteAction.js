import ClassNoteActionType from "./types/ClassNoteActionType";
import client from "../../config/axios";

export const getClassNote = async (noteId) => {
  let payload = {};

  try {
    const ret = await client.get(`/api/note/detail/${noteId}`);

    if (ret.status == 200) {
      payload = {
        [noteId]: ret.data,
      };
    }
  } catch (err) {
    console.log("get class note info error: ", err);

    const status = err?.response?.status;
    if (status == 404) {
      payload = {
        [noteId]: {},
      };
    }
  }

  return {
    type: ClassNoteActionType.GET_CLASS_NOTE,
    payload,
  };
};

export const clearClassNote = () => {
  return {
    type: ClassNoteActionType.CLEAR_CLASS_NOTE,
  };
};
