import ClassListInfoActionType from "../actions/types/ClassListInfoActionType";

const initialState = {
  classListInfo: null,
};

export default function classListInfoReducer(state = initialState, action) {
  switch (action.type) {
    case ClassListInfoActionType.GET_CLASS_LIST_INFO:
      return {
        ...state,
        classListInfo: action.payload,
      };
    case ClassListInfoActionType.CLEAR_CLASS_LIST_INFO:
      return {
        classListInfo: null,
      };
    default:
      return state;
  }
}
