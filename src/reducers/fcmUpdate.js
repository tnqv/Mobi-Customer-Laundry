import { REMOVE_ERROR,RESET_APP, API_FCM_UPDATE_REQUEST, API_FCM_UPDATE_SUCCEEDED, API_FCM_UPDATE_FAILED } from '../actions/actionTypes';

const initialState = {
  loading: false,
  error : null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case API_FCM_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case API_FCM_UPDATE_SUCCEEDED:
      return {
        ...state,
        error: null,
        loading: false,
      };
    case API_FCM_UPDATE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case REMOVE_ERROR:
      return {
        ...state,
        error: null,
      }
    default:
      return state;
  }
}