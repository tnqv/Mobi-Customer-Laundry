import { GET_PLACED_ORDER_API,GET_PLACED_ORDER_SUCCEED,GET_PLACED_ORDER_FAILED } from '../actions/actionTypes';
//Saga effects
import { put, takeLatest,takeEvery,call } from 'redux-saga/effects';
import { Api } from './api';



function* fetchPlacedOrders(action){
    console.log("fetching in orders");
    console.log(action);
    if(!action.payload.userId || !action.payload.token || action.payload.token === ''){
        yield put({ type: GET_PLACED_ORDER_FAILED, error: "fetch failed" });
        return;
    }
    try {
        console.log("dek vo ?");
        const orders = yield Api.getPlacedOrdersFromApi(action.payload.userId,action.payload.token);
        yield put({ type: GET_PLACED_ORDER_SUCCEED, data: orders });
        console.log("fetch success");
    }catch(e){
        yield put({ type: GET_PLACED_ORDER_FAILED, error: e });
        console.log("fetch faile");
    }
}

export function* watchPlacedOrderReq() {
  yield takeLatest(GET_PLACED_ORDER_API, fetchPlacedOrders);
}