import {fork,all} from 'redux-saga/effects';

import { watchIncrementAsync } from './counter';
import { watchApiRequest } from './apiTester';
import { watchLogin,watchLoadingInfoFromStorage,watchFacebookLogin } from './login';
import { watchLocationChanged } from './location';
import { watchServiceReq } from './service';


export default function* rootSaga() {
  yield all([
    fork(watchIncrementAsync),
    fork(watchApiRequest),
    fork(watchLogin),
    fork(watchFacebookLogin),
    fork(watchLocationChanged),
    fork(watchLoadingInfoFromStorage),
    fork(watchServiceReq)
  ])
}
