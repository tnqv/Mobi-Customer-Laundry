import * as types from './actionTypes';


export function notificationsRequest(payload) {
  return {
    type: types.GET_NOTIFICATIONS_API,
    payload: payload
  }
}

export function notificationsRequestSucceeded(payload) {
  return {
    type: types.GET_NOTIFICATIONS_SUCCEED,
    payload: payload
  }
}

export function notificationsRequestFailed(payload) {
  return {
    type: types.GET_NOTIFICATIONS_FAILED,
    payload: payload
  }
}