import { GET_NOTIFICATIONS_API,GET_NOTIFICATIONS_SUCCEED,GET_NOTIFICATIONS_FAILED } from '../actions/actionTypes';



const initialState = {
  loading: false,
  data : {},
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_NOTIFICATIONS_API:
      console.log(state);
      return {
        ...state,
      }
    case GET_NOTIFICATIONS_SUCCEED:
      console.log(" notif success");
      console.log(action.data);
      return {
        ...state,
        data: action.data
      }
    case GET_NOTIFICATIONS_FAILED:
      console.log("failed" + action.error);
      return {
        ...state,
        error: action.error,
      }
    default:
      return state;
  }
}