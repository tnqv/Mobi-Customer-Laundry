import { LOCATION_CHANGED, API_LOGIN_REQUEST_SUCCEEDED, API_REQUEST_FAILED, LOCATION_CHANGED_SUCCESS, LOCATION_CHANGED_FAILED } from '../actions/actionTypes';
//Saga effects
import { put, takeLatest,takeEvery } from 'redux-saga/effects';


function* locationChangedFlow(action){

  try{
    let latitudeFromAction = action.payload.latitude;
    let longitudeFromAction = action.payload.longitude;

    yield put({ type: LOCATION_CHANGED_SUCCESS, results: {message: 'ok', latitude : latitudeFromAction, longitude: longitudeFromAction} });

  }catch(e){
      yield put({ type: LOCATION_CHANGED_FAILED, error: e });
      // console.log("error", e);
  }

}

export function* watchLocationChanged() {
  yield takeEvery(LOCATION_CHANGED, locationChangedFlow);
}