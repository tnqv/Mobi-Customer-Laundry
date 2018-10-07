import { API_LOGIN_REQUEST,API_LOGIN_REQUEST_FAILED,API_LOGIN_REQUEST_SUCCEEDED } from '../actions/actionTypes';

const initialState = {
  loading: false,
  username: '',
  password: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case API_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case API_LOGIN_REQUEST_SUCCEEDED:
      console.log("yield success",state);
      return {
        ...state,
        loading: false,
        results: action.results,
      };
    case API_LOGIN_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}