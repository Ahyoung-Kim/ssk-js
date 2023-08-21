import ReviewListActionType from "../actions/types/ReviewListActionType";

// Default State
const initialState = {};

// Reducer
export default function reviewListReducer(state = initialState, action) {
  switch (action.type) {
    case ReviewListActionType.GET_REVIEW_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case ReviewListActionType.CLEAR_REVIEW_LIST:
      return initialState;
    default:
      return state;
  }
}
