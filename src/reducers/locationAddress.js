import { GET_USER_LOCATION,GET_USER_LOCATION_SUCCEED,GET_USER_LOCATION_FAILED, CHANGE_USER_LOCATION, CREATE_USER_LOCATION, CREATE_USER_LOCATION_SUCCEED, CREATE_USER_LOCATION_FAILED } from '../actions/actionTypes';

const initialState = {
  userLocation: [],
  chosenLocation: null,
  loading: false,
  error : null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER_LOCATION:
      return {
        ...state,
      }
    case GET_USER_LOCATION_SUCCEED:
      console.log("yield success",state);
      return {
        ...state,
        userLocation: action.result,
        chosenLocation: action.result[0],
      };
    case GET_USER_LOCATION_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case CHANGE_USER_LOCATION:
      return {
        ...state,
        chosenLocation: action.payload.newLocation,
      };
      case CREATE_USER_LOCATION:
        return{
          ...state,
          loading: true,
        };
      case CREATE_USER_LOCATION_SUCCEED:
        console.log("success");
        console.log(state.userLocation);
        return{
          ...state,
          userLocation: [...state.userLocation,action.result],
          loading: false,
          // test: console.log(userLocation),
        };
      case CREATE_USER_LOCATION_FAILED:
        return {
          ...state,
          loading:false ,
          error: action.error,
        }
    default:
      return state;
  }
}