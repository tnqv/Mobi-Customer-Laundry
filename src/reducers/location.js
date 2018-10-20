import { LOCATION_CHANGED,LOCATION_CHANGED_SUCCESS,LOCATION_CHANGED_FAILED } from '../actions/actionTypes';

const initialState = {
  latitude: 10.852014,
  longitude: 106.629380,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGED:
      return {
        ...state,
      }
    case LOCATION_CHANGED_SUCCESS:
      console.log("yield success",state);
      return {
        ...state,
        latitude :  action.results.latitude,
        longitude : action.results.longitude,
        results: action.results,
      };
    case LOCATION_CHANGED_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}