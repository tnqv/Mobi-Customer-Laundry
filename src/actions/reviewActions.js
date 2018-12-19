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

export function getReviewRequest(payload){
  return {
    type: types.GET_REVIEW,
    payload: payload
  }
}

export function getReviewRequestSucceed(payload){
  return {
    type: types.GET_REVIEW_SUCCEED,
    payload: payload
  }
}

export function getReviewRequestFailed(payload){
  return {
    type: types.GET_REVIEW_FAILED,
    payload: payload
  }
}