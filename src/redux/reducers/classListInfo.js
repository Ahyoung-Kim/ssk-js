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
    default:
      return state;
  }
}
