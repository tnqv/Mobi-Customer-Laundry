import { GET_NOTIFICATIONS_API,GET_NOTIFICATIONS_SUCCEED,GET_NOTIFICATIONS_FAILED } from '../actions/actionTypes';
//Saga effects
import { put, takeLatest,takeEvery,call } from 'redux-saga/effects';
import { Api } from './api';



function* fetchNotifications(action){
    console.log("fetching in notifications");
    console.log(action);
    if(!action.payload.userId || !action.payload.token || action.payload.token === ''){
        yield put({ type: GET_NOTIFICATIONS_FAILED, error: "fetch failed" });
        return;
    }
    try {
        console.log("dek vo ?");
        const notifications = yield Api.getNotificationsFromApi(action.payload.userId,action.payload.token);
        yield put({ type: GET_NOTIFICATIONS_SUCCEED, data: notifications });
        console.log("fetch success");
    }catch(e){
        yield put({ type: GET_NOTIFICATIONS_FAILED, error: e });
        console.log("fetch faile");
    }
}

export function* watchNotificationsReq() {
  yield takeLatest(GET_NOTIFICATIONS_API, fetchNotifications);
}