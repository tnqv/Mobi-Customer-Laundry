import { REVIEW_ORDER,REVIEW_ORDER_FAILED,REVIEW_ORDER_SUCCEED, GET_REVIEW, GET_REVIEW_FAILED, GET_REVIEW_SUCCEED } from '../actions/actionTypes';



const initialState = {
  loading: false,
  data : [],
  error: {},
  listReview: {},
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
    case GET_REVIEW:
      return {
        ...state,
        loading: true,
      }
    case GET_REVIEW_SUCCEED:
      return {
        ...state,
        loading: false,
        listReview: action.result.data.records,
      }
    case GET_REVIEW_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    default:
      return state;
  }
}