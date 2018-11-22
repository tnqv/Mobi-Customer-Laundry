import { API_FCM_UPDATE_REQUEST, API_FCM_UPDATE_SUCCEEDED, API_FCM_UPDATE_FAILED, } from '../actions/actionTypes';
//Saga effects
import { put, takeLatest,takeEvery } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import NavigatorService from '../services/navigator';
import { Api } from './api';

function* updateFcmTokenToApiFlow(action){
  try{
    let tokenFromAction = action.payload.token;
    let accountIdFromAction = action.payload.accountId;
    let fcmTokenFromAction = action.payload.fcmToken;

    const response = yield Api.updateFcmTokenToApi(tokenFromAction,accountIdFromAction,fcmTokenFromAction);

    if (response) {


      // This is a blocking call that would wait for the token to be stored,
      // or for the Promise to be resolved before proceeding to the next line
        yield put({ type: API_FCM_UPDATE_SUCCEEDED, result: response });


    } else {
      // if (result.error) {
        yield put({ type: API_FCM_UPDATE_FAILED, error: "Lỗi xảy ra, không thể cập nhật"  });
      // }
    }
  }catch(e){
      yield put({ type: API_FCM_UPDATE_FAILED, error: e });
      console.log("error", e);
  }
}


export function* watchUpdateFcmToken() {
  yield takeLatest(API_FCM_UPDATE_REQUEST, updateFcmTokenToApiFlow);
}
