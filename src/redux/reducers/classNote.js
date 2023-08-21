import ClassNoteActionType from "../actions/types/ClassNoteActionType";

// Default State
const initialState = {};

// Reducer
export default function classNoteReducer(state = initialState, action) {
  switch (action.type) {
    case ClassNoteActionType.GET_CLASS_NOTE:
      return {
        ...state,
        ...action.payload,
      };
    case ClassNoteActionType.CLEAR_CLASS_NOTE:
      return {};
    default:
      return state;
  }
}
