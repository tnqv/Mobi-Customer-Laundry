import {fork,all} from 'redux-saga/effects';

import { watchIncrementAsync } from './counter';
import { watchApiRequest } from './apiTester';
import { watchLogin,watchLoadingInfoFromStorage,watchFacebookLogin } from './login';
import { watchLocationChanged } from './location';
import { watchServiceReq } from './service';
import { watchPlacedOrderReq,watchCreatePlacedOrderReq } from './placedorder';
import { watchNotificationsReq } from './notifications';
import { watchUpdateFcmToken } from './updateFcm';
import { watchCreateShippingLocation,watchUpdateShippingLocation } from './shippingLocation';


export default function* rootSaga() {
  yield all([
    watchIncrementAsync,
    watchApiRequest,
    watchLogin,
    watchFacebookLogin,
    watchLocationChanged,
    watchLoadingInfoFromStorage,
    watchServiceReq,
    watchPlacedOrderReq,
    watchNotificationsReq,
    watchCreatePlacedOrderReq,
    watchUpdateFcmToken,
    watchCreateShippingLocation,
    watchUpdateShippingLocation,
  ].map(fork))
}
