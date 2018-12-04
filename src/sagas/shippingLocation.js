import { GET_USER_LOCATION,GET_USER_LOCATION_FAILED,GET_USER_LOCATION_SUCCEED,UPDATE_USER_LOCATION,UPDATE_USER_LOCATION_FAILED,UPDATE_USER_LOCATION_SUCCEED, CREATE_USER_LOCATION_SUCCEED, CREATE_USER_LOCATION_FAILED,CREATE_USER_LOCATION } from '../actions/actionTypes';
//Saga effects
import { put, takeLatest,takeEvery } from 'redux-saga/effects';
import NavigatorService from '../services/navigator';
import { Api } from './api';


function* createShippingLocationChangedFlow(action){

  try{

    let shippingLocationFromAction = action.payload.shippingLocation;
    let userId = action.payload.userId;
    let token = action.payload.token;
    console.log(shippingLocationFromAction);

    const response = yield Api.createNewShippingLocation(token,userId,shippingLocationFromAction);
    if(response) {
      yield put({ type: CREATE_USER_LOCATION_SUCCEED, result : response });
      yield put({ type: 'Navigate', na: NavigatorService.back()});
    }else {
      yield put({ type: CREATE_USER_LOCATION_FAILED, error : 'Lỗi xảy ra' });
    }


  }catch(e){
      yield put({ type: CREATE_USER_LOCATION_FAILED, error: e });
      console.log("error", e);
  }

}

function* updateShippingLocationFlow(action){

  try{
    let shippingLocationFromAction = action.payload.shippingLocation;
    let userId = action.payload.userId;
    let token = action.payload.token;

    const response = yield Api.updateShippingLocation(token,userId,shippingLocationFromAction)
    yield put({ type: UPDATE_USER_LOCATION_SUCCEED, result : response.data.user.shipping_locations });

  }catch(e){
      yield put({ type: UPDATE_USER_LOCATION_FAILED, error: e });
      console.log("error", e);
  }
}

export function* watchCreateShippingLocation() {
  yield takeEvery(CREATE_USER_LOCATION, createShippingLocationChangedFlow);
}

export function* watchUpdateShippingLocation() {
  yield takeEvery(UPDATE_USER_LOCATION, updateShippingLocationFlow);
}