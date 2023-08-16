import ReviewTagListActionType from "../actions/types/ReviewTagListActionType";

const initialState = null;

export default function reviewTagListReducer(state = initialState, action) {
  switch (action.type) {
    case ReviewTagListActionType.GET_REVIEW_TAG_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case ReviewTagListActionType.DELETE_REVIEW_TAG:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
