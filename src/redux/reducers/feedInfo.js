import FeedInfoActionType from "../actions/types/FeedInfoActionType";

// Default State
const initialState = {};

// Reducer
export default function feedInfoReducer(state = initialState, action) {
  switch (action.type) {
    case FeedInfoActionType.GET_FEED_INFO:
      return {
        ...state,
        ...action.payload,
      };
    case FeedInfoActionType.CLEAR_FEED_INFO:
      return initialState;
    default:
      return state;
  }
}
