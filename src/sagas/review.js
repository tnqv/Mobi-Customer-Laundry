import { REVIEW_ORDER,REVIEW_ORDER_SUCCEED,REVIEW_ORDER_FAILED, GET_REVIEW_SUCCEED, GET_REVIEW_FAILED, GET_REVIEW } from '../actions/actionTypes';
//Saga effects
import { put, takeLatest,takeEvery } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import NavigatorService from '../services/navigator';
import { Api } from './api';

function* getListReviewFlow(action){
   try{
      const response = yield Api.getListReview();
      console.log(response);
      if(response) {
        yield put({ type: GET_REVIEW_SUCCEED, result: response });
      }else{
        yield put({ type: GET_REVIEW_FAILED, error: "Lỗi xảy ra"  });
      }
   }catch(e){
      yield put({ type: GET_REVIEW_FAILED, error: e });
      console.log("error", e);
   }


}

function* createReviewFlow(action){
  try{
    let tokenFromAction = action.payload.token;
    let review = action.payload.reviewObj;

    const response = yield Api.reviewOrder(tokenFromAction,review);

    if (response) {
      // This is a blocking call that would wait for the token to be stored,
      // or for the Promise to be resolved before proceeding to the next line
      console.log(response)
        yield put({ type: REVIEW_ORDER_SUCCEED, result: response });

    } else {
      // if (result.error) {
        yield put({ type: REVIEW_ORDER_FAILED, error: "Lỗi xảy ra, không thể cập nhật"  });
      // }
    }
  }catch(e){
      yield put({ type: REVIEW_ORDER_FAILED, error: e });
      console.log("error", e);
  }
}


export function* watchReviewReq() {
  yield takeLatest(GET_REVIEW, getListReviewFlow);
}

export function* watchReview() {
  yield takeLatest(REVIEW_ORDER, createReviewFlow);
}
