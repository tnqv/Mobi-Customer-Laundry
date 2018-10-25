const baseUrl = 'http://ec2-54-169-35-216.ap-southeast-1.compute.amazonaws.com:8080/api/v1';

import axios from 'axios';
import configureStore from '../store/configureStore'

function* loginFacebookApi(fbToken){

  const response = yield axios({
    method: 'post',
    url: baseUrl + '/account/facebook/auth',
    header: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    params: {
        "fb_access_token": fbToken,
    }
  });

  // const response = yield axios.post(baseUrl + '/account/facebook/auth',JSON.stringify(requestBody),config);

  console.log(response);
  const accountInfo = yield response.status === 200 || response.status === 201 ? response : []

  return accountInfo;
}

function* loginFromApi(emailFromAction,passwordFromAction){
    console.log("call in api");
    const response = yield axios({
      method: 'post',
      url: baseUrl + '/account/login',
      header: {
          "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {
        'email': emailFromAction,
        'password': passwordFromAction,
      }
    });

    const accountInfo = yield response.status === 200 ? JSON.parse(response._bodyInit): []
    console.log(response);
    return accountInfo;
}

function* getServicesFromApi(){
    const response = yield axios(baseUrl + '/category');

    const services = yield response.status === 200 ? response.data.records : [];
    return services;
}

function* getPlacedOrdersFromApi(userId,token){
  const response = yield axios.get(baseUrl + `/user/${userId}/placedorders`,{
      headers: {
          "Authorization": token
      }
  });
  // axios(baseUrl + `/user/${userId}/placedorders`);

  const placedOrders = yield response.status === 200 ? response.data.records : [];
  return placedOrders;
}

function* getNotificationsFromApi(userId,token){
  const response = yield axios.get(baseUrl + `/user/${userId}/notifications`,{
      headers: {
          "Authorization": token
      }
  });
  // axios(baseUrl + `/user/${userId}/placedorders`);

  const notifications = yield response.status === 200 ? response.data.records : [];
  return notifications;
}

function* createNewOrder(token,paramsReq){
    let formData = new FormData();
    for ( let key in paramsReq ) {
        formData.append(key, paramsReq[key]);
    }
    const response = yield axios({
      method: 'post',
      url: baseUrl + '/placedorder/',
      headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization" : token,
      },
      data: formData,
    });

    const createdOrderInfo = yield response.status === 200 ? response : {}
    console.log(createdOrderInfo);
    return createdOrderInfo;
}

export const Api = {
  loginFromApi,
  loginFacebookApi,
  getServicesFromApi,
  getPlacedOrdersFromApi,
  getNotificationsFromApi,
  createNewOrder,
};