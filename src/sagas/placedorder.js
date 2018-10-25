import { GET_PLACED_ORDER_API,GET_PLACED_ORDER_SUCCEED,GET_PLACED_ORDER_FAILED, CREATE_NEW_ORDER, CREATE_NEW_ORDER_FAILED, CREATE_NEW_ORDER_SUCCEED } from '../actions/actionTypes';
//Saga effects
import { put, takeLatest,takeEvery,call } from 'redux-saga/effects';
import { Api } from './api';



function* fetchPlacedOrders(action){
    if(!action.payload.userId || !action.payload.token || action.payload.token === ''){
        yield put({ type: GET_PLACED_ORDER_FAILED, error: "fetch failed" });
        return;
    }
    try {
        const orders = yield Api.getPlacedOrdersFromApi(action.payload.userId,action.payload.token);
        yield put({ type: GET_PLACED_ORDER_SUCCEED, data: orders });
    }catch(e){
        yield put({ type: GET_PLACED_ORDER_FAILED, error: e });
    }
}

function* createNewOrderFlow(action){
    try{
        console.log(action.payload);
        let token = action.payload.token;
        let data = action.payload.params;
        const response = yield Api.createNewOrder(token,data);
        yield put({ type: CREATE_NEW_ORDER_SUCCEED, data: response });
    }catch(e){
        yield put({type: CREATE_NEW_ORDER_FAILED,error: e});
    }

}

export function* watchCreatePlacedOrderReq(){
    yield takeLatest(CREATE_NEW_ORDER, createNewOrderFlow);
}

export function* watchPlacedOrderReq() {
  yield takeLatest(GET_PLACED_ORDER_API, fetchPlacedOrders);
}