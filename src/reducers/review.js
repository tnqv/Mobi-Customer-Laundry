import { REVIEW_ORDER,REVIEW_ORDER_FAILED,REVIEW_ORDER_SUCCEED } from '../actions/actionTypes';



const initialState = {
  loading: false,
  data : {},
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REVIEW_ORDER:
      // console.log(state);
      return {
        ...state,
        loading: true,
      }
    case REVIEW_ORDER_SUCCEED:
      console.log("success");
      return {
        ...state,
        data: action.data
      }
    case REVIEW_ORDER_FAILED:
      console.log("failed" + action.error);
      return {
        ...state,
        error: action.error,
      }
    default:
      return state;
  }
}