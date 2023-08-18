import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getClassNote } from "../redux/actions/classNoteAction";

const useClassNote = (noteId) => {
  const dispatch = useDispatch();
  const noteInfo = useSelector((state) => state.classNoteReducer?.[noteId]);

  const dispatchData = () => {
    getClassNote(noteId).then((ret) => {
      dispatch(ret);
    });
  };

  useEffect(() => {
    if (!noteInfo) {
      dispatchData();
    }
  }, [noteId, noteInfo]);

  if (noteInfo) {
    return noteInfo;
  }
};

export default useClassNote;
