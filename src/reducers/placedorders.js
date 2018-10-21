import { GET_PLACED_ORDER_API,GET_PLACED_ORDER_SUCCEED,GET_PLACED_ORDER_FAILED } from '../actions/actionTypes';



const initialState = {
  loading: false,
  data : {},
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PLACED_ORDER_API:
      console.log(state);
      return {
        ...state,
      }
    case GET_PLACED_ORDER_SUCCEED:
      console.log("success");
      console.log(action.data);
      return {
        ...state,
        data: action.data
      }
    case GET_PLACED_ORDER_FAILED:
      console.log("failed" + action.error);
      return {
        ...state,
        error: action.error,
      }
    default:
      return state;
  }
}