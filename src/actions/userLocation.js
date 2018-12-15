import * as types from './actionTypes';


export function userLocationRequest(payload) {
  return {
    type: types.GET_USER_LOCATION,
    payload: payload
  }
}

export function userLocationRequestSucceeded(payload) {
  return {
    type: types.GET_USER_LOCATION_SUCCEED,
    payload: payload
  }
}

export function userLocationRequestFailed(payload) {
  return {
    type: types.GET_USER_LOCATION_FAILED,
    payload: payload
  }
}

export function createUserLocationRequest(payload) {
  return {
    type: types.CREATE_USER_LOCATION,
    payload: payload
  }
}

export function createUserLocationRequestSucceeded(payload) {
  return {
    type: types.CREATE_NEW_ORDER_SUCCEED,
    payload: payload
  }
}

export function createUserLocationRequestFailed(payload) {
  return {
    type: types.CREATE_USER_LOCATION_FAILED,
    payload: payload
  }
}


export function updateUserLocationRequest(payload) {
  return {
    type: types.UPDATE_USER_LOCATION,
    payload: payload
  }
}

export function updateUserLocationRequestSucceeded(payload) {
  return {
    type: types.UPDATE_USER_LOCATION_SUCCEED,
    payload: payload
  }
}

export function updateUserLocationRequestFailed(payload) {
  return {
    type: types.UPDATE_USER_LOCATION_FAILED,
    payload: payload
  }
}

export function deleteUserLocationRequest(payload) {
  return {
    type: types.DELETE_USER_LOCATION,
    payload: payload
  }
}

export function deleteUserLocationRequestSucceeded(payload) {
  return {
    type: types.DELETE_USER_LOCATION_SUCCEED,
    payload: payload
  }
}

export function deleteUserLocationRequestFailed(payload) {
  return {
    type: types.DELETE_USER_LOCATION_FAILED,
    payload: payload
  }
}

export function changeUserLocation(payload){
  return {
    type: types.CHANGE_USER_LOCATION,
    payload: payload,
  }
}