import {fork,all} from 'redux-saga/effects';

import { watchIncrementAsync } from './counter';
import { watchApiRequest } from './apiTester';
import { watchLogin,watchLoadingInfoFromStorage,watchFacebookLogin } from './login';
import { watchLocationChanged } from './location';
import { watchServiceReq } from './service';
import { watchPlacedOrderReq,watchCreatePlacedOrderReq } from './placedorder';
import { watchNotificationsReq } from './notifications';


export default function* rootSaga() {
  yield all([
    fork(watchIncrementAsync),
    fork(watchApiRequest),
    fork(watchLogin),
    fork(watchFacebookLogin),
    fork(watchLocationChanged),
    fork(watchLoadingInfoFromStorage),
    fork(watchServiceReq),
    fork(watchPlacedOrderReq),
    fork(watchNotificationsReq),
    fork(watchCreatePlacedOrderReq),
  ])
}
