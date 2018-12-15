import { API_LOGIN_REQUEST, API_LOGIN_REQUEST_SUCCEEDED, API_LOGIN_REQUEST_FAILED, FACEBOOK_LOGIN_FAILED, FACEBOOK_LOGIN_SUCCEED, FACEBOOK_LOGIN,LOAD_TOKEN_FROM_STORAGE_SUCCEEDED,LOAD_TOKEN_FROM_STORAGE_FAILED,LOAD_TOKEN_FROM_STORAGE, API_FCM_UPDATE_REQUEST, GET_USER_LOCATION_SUCCEED } from '../actions/actionTypes';
//Saga effects
import { put, takeLatest,takeEvery } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import NavigatorService from '../services/navigator';
import { Api } from './api';
import deviceStorage from '../services/deviceStorage';
import firebase from 'react-native-firebase';
import * as appActions from '../actions';

function* loginFacebookFlow(action){
    console.log("facebook flow");
    console.log(action);
    try {

      let fbToken = action.payload.fbToken.accessToken;
      if(fbToken){
            const response = yield Api.loginFacebookApi(fbToken);
            let token = response.data.account.token;
            if(token){
              // yield call(AsyncStorage.setItem, "token", token);
                yield put({ type: FACEBOOK_LOGIN_SUCCEED, results: {message: 'ok', info : response} });

                let fcmToken = yield firebase.messaging().getToken();

                yield put(appActions.actions.updateFcmTokenRequest({ accountId: response.data.account.id,token: token, fcmToken: fcmToken }));

                yield put({type: GET_USER_LOCATION_SUCCEED, result : response.data.user.shipping_locations});

                if(action.payload.from === 'orderInfo'){
                  yield put({ type: 'Navigate', na: NavigatorService.navigate('PlaceOrderView')});
                }else {
                  yield put({ type: 'Navigate', na: NavigatorService.goBackToMainTabBar('OrderInfoStack')});
                }
            }else{
                yield put({ type: FACEBOOK_LOGIN_FAILED, error: response.error });
            }

      }
    }catch(e){
      console.log(e);
      yield put({ type: FACEBOOK_LOGIN_FAILED, error: e });

    }
}

function* loginFlow(action){

  try{
    let emailFromAction = action.payload.username;
    let passwordFromAction = action.payload.password;

    const response = yield Api.loginFromApi(emailFromAction,passwordFromAction);
    let token = response.data.account.token;
    if(token){
      // yield call(AsyncStorage.setItem, "token", token);
        yield put({ type: API_LOGIN_REQUEST_SUCCEEDED, results: {message: 'ok', info : response} });

        let fcmToken = yield firebase.messaging().getToken();

        yield put(appActions.actions.updateFcmTokenRequest({ accountId: response.data.account.id,token: token, fcmToken: fcmToken }));

        yield put({type: GET_USER_LOCATION_SUCCEED, result : response.data.user.shipping_locations});

        if(action.payload.from === 'orderInfo'){
          yield put({ type: 'Navigate', na: NavigatorService.navigate('PlaceOrderView')});
        }else {
          yield put({ type: 'Navigate', na: NavigatorService.goBackToMainTabBar('OrderInfoStack')});
        }
    }else{
        yield put({ type: API_LOGIN_REQUEST_FAILED, error: response.error });
    }
    // if (token) {
    //   console.log("success: ", token);

    //   // This is a blocking call that would wait for the token to be stored,
    //   // or for the Promise to be resolved before proceeding to the next line
    //     // yield call(AsyncStorage.setItem, "token", token);



    //     yield put(appActions.actions.updateFcmTokenRequest({ accountId: response.data.account.id,token: token, fcmToken: fcmToken }));
    //     yield put({ type: API_LOGIN_REQUEST_SUCCEEDED, result: response });
    // } else {
    //   if (result.error) {
    //     yield put({ type: API_REQUEST_FAILED, error: response.error });
    //   }
    // }
  }catch(e){
      yield put({ type: API_LOGIN_REQUEST_FAILED, error: e });
      // console.log("error", e);
  }

}

function* loadUserInfoFromStorage(action){

  try {

    let jwtToken = action.payload;

    console.log("loading in saga");
    console.log(jwtToken);
    if(jwtToken){
          console.log(jwtToken);

          yield put({ type: LOAD_TOKEN_FROM_STORAGE_SUCCEEDED, results: {message: 'ok', info : jwtToken,} });
    }else{

          yield put({ type: LOAD_TOKEN_FROM_STORAGE_FAILED, error: "No token found",});
    }
  }catch(e){
    console.log(e)
    yield put({ type: LOAD_TOKEN_FROM_STORAGE_FAILED, error: e,});

  }
}

export function* watchLoadingInfoFromStorage() {
  yield takeEvery(LOAD_TOKEN_FROM_STORAGE, loadUserInfoFromStorage);
}

export function* watchLogin() {
  yield takeLatest(API_LOGIN_REQUEST, loginFlow);
}

export function* watchFacebookLogin() {
  yield takeLatest(FACEBOOK_LOGIN, loginFacebookFlow);
}