import ClassInfoActionType from "../actions/types/ClassInfoActionType";

// Default State
// { [tutoringId]: classInfo }
const initialState = null;

// Reducer
export default function classInfoReducer(state = initialState, action) {
  switch (action.type) {
    case ClassInfoActionType.GET_CLASS_INFO:
      return {
        ...state,
        ...action.payload,
      };
    case ClassInfoActionType.CLEAR_CLASS_INFO:
      return null;
    case ClassInfoActionType.DELETE_CLASS_INFO:
      return {
        ...state,
      };
    case ClassInfoActionType.WITHDRAW_CLASS_INFO:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
