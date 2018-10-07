import {fork} from 'redux-saga/effects';

import { watchIncrementAsync } from './counter';
import { watchApiRequest } from './apiTester';
import { watchLogin } from './login';
export default function* rootSaga() {
  yield [
    fork(watchIncrementAsync),
    fork(watchApiRequest),
    fork(watchLogin),
  ]
}
