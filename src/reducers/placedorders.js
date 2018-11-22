import { GET_PLACED_ORDER_API,GET_PLACED_ORDER_SUCCEED,GET_PLACED_ORDER_FAILED, CREATE_NEW_ORDER, CREATE_NEW_ORDER_SUCCEED, CREATE_NEW_ORDER_FAILED } from '../actions/actionTypes';



const initialState = {
  loading: false,
  createdOrder: {},
  data : [],
  error: null,
  createdOrder: {},
  success: false,
};

export default function (state = initialState, action) {

  switch (action.type) {

    case GET_PLACED_ORDER_API:
      console.log(state);
      return {
        ...state,
        loading: true,
        error : null,
        createdOrder: {},
      }
    case GET_PLACED_ORDER_SUCCEED:
      // if(!action.data) action.data = [];
      // if()
      return {
        ...state,
        loading: false,
        data: action.page === 0  ? [...action.data] : [...state.data,...action.data],
        error : null,
        createdOrder: {},
      }
    case GET_PLACED_ORDER_FAILED:
      console.log("failed" + action.error);
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case CREATE_NEW_ORDER:
      console.log(state);
      return {
        ...state,
        error : null,
        loading: true,
      }
    case CREATE_NEW_ORDER_SUCCEED:
      console.log("success");
      console.log(action.data);
      return {
        ...state,
        loading: false,
        error : null,
        createdOrder: action.data,
      }
    case CREATE_NEW_ORDER_FAILED:
      console.log("failed" + action.error);
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    default:
      return state;
  }
}