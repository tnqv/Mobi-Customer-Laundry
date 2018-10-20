import * as types from './actionTypes';


export function loginRequest(payload) {
  return {
    type: types.API_LOGIN_REQUEST,
    payload: payload
  }
}

export function loginRequestSucceeded(payload) {
  return {
    type: types.API_LOGIN_REQUEST_SUCCEEDED,
    payload: payload
  }
}

export function loginRequestFailed(payload) {
  return {
    type: types.API_LOGIN_REQUEST_FAILED,
    payload: payload
  }
}

export function loginFacebookRequestFailed(payload) {
  return {
    type: types.FACEBOOK_LOGIN_FAILED,
    payload: payload
  }
}

export function loginFacebookRequest(payload) {
  return {
    type: types.FACEBOOK_LOGIN,
    payload: payload
  }
}

export function loginFacebookSucceed(payload) {
  return {
    type: types.FACEBOOK_LOGIN_SUCCEED,
    payload: payload
  }
}

export function loadUserFromAsyncStorageRequestFailed(payload) {
  return {
    type: types.LOAD_TOKEN_FROM_STORAGE_FAILED,
    payload: payload
  }
}

export function loadUserFromAsyncStorageRequest(payload) {
  return {
    type: types.LOAD_TOKEN_FROM_STORAGE,
    payload: payload
  }
}

export function loadUserFromAsyncStorageRequestSucceed(payload) {
  return {
    type: types.LOAD_TOKEN_FROM_STORAGE_SUCCEEDED,
    payload: payload
  }
}