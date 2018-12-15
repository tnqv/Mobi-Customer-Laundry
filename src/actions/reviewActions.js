import * as types from './actionTypes';


export function reviewOrderRequest(payload) {
  return {
    type: types.REVIEW_ORDER,
    payload: payload
  }
}

export function reviewOrderRequestSucceeded(payload) {
  return {
    type: types.REVIEW_ORDER_SUCCEED,
    payload: payload
  }
}

export function reviewOrderRequestFailed(payload) {
  return {
    type: types.REVIEW_ORDER_FAILED,
    payload: payload
  }
}