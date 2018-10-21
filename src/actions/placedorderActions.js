import * as types from './actionTypes';


export function placedOrdersRequest(payload) {
  return {
    type: types.GET_PLACED_ORDER_API,
    payload: payload
  }
}

export function placedOrdersRequestSucceeded(payload) {
  return {
    type: types.GET_PLACED_ORDER_SUCCEED,
    payload: payload
  }
}

export function placedOrdersRequestFailed(payload) {
  return {
    type: types.GET_PLACED_ORDER_FAILED,
    payload: payload
  }
}