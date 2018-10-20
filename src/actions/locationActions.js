import * as types from './actionTypes';


export function locationChanged(payload) {
  return {
    type: types.LOCATION_CHANGED,
    payload: payload
  }
}