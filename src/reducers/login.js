import { API_LOGIN_REQUEST,API_LOGIN_REQUEST_FAILED,API_LOGIN_REQUEST_SUCCEEDED, FACEBOOK_LOGIN, FACEBOOK_LOGIN_SUCCEED, FACEBOOK_LOGIN_FAILED,LOAD_TOKEN_FROM_STORAGE,LOAD_TOKEN_FROM_STORAGE_SUCCEEDED,LOAD_TOKEN_FROM_STORAGE_FAILED } from '../actions/actionTypes';



const initialState = {
  loading: false,
  username: '',
  password: '',
  token: '',
  isAuthenticated: false,
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_TOKEN_FROM_STORAGE:
      console.log(state);
      return {
        ...state,
      }
    case LOAD_TOKEN_FROM_STORAGE_SUCCEEDED:
      console.log("success");
      return {
        ...state,
        token: action.token,
        user: action.user,

      }
    case LOAD_TOKEN_FROM_STORAGE_FAILED:
      console.log("failed");
      return {
        ...state,
        error: action.error,
      }
    case API_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case API_LOGIN_REQUEST_SUCCEEDED:
      return {
        ...state,
        loading: false,
        results: action.results,
        token: action.results.info.data.account.token,
        user: action.results.info.data.user,
      };
    case API_LOGIN_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case FACEBOOK_LOGIN:
      return {
        ...state,
        loading: true,
        error: action.error,
      };

    case FACEBOOK_LOGIN_SUCCEED:
      return {
        ...state,
        loading: false,
        results: action.results,
        token: action.results.info.data.account.token,
        user: action.results.info.data.user,
      };

    case FACEBOOK_LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}