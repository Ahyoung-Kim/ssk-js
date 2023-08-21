import AssignmentListActionType from "../actions/types/AssignmentListActionType";

// Default State
const initialState = {};

// Reducer
export default function assignmentListReducer(state = initialState, action) {
  switch (action.type) {
    case AssignmentListActionType.GET_ASSIGNMENT_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case AssignmentListActionType.CLEAR_ASSIGNMENT_LIST:
      return {};
    default:
      return state;
  }
}
