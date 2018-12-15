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

function* updateFcmTokenToApi(token,accountId,fcmToken){
    let formData = new FormData();
    formData.append('fcm_token', fcmToken);

    const responseUpdate = yield axios({
      method: 'PUT',
      url: baseUrl + `/account/${accountId}/token/refresh`,
      headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization" : token,
      },
      data: formData,
    });

    const accountInfo = yield responseUpdate.status === 200 ? responseUpdate : null;

    return accountInfo;
  }

function* loginFromApi(emailFromAction,passwordFromAction){
    let formData = new FormData();

    formData.append('email', emailFromAction);
    formData.append('password', passwordFromAction);
    const response = yield axios({
      method: 'post',
      url: baseUrl + '/account/login',
      header: {
          "Content-Type": "application/x-www-form-urlencoded",
      },
      data: formData,
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

function* getPlacedOrdersFromApi(userId,token,page){
  const response = yield axios.get(baseUrl + `/user/${userId}/placedorders?limit=10,page=${page}`,{
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

function* createNewShippingLocation(token,userId,shippingLocation){
    let formData = new FormData();
    for ( let key in shippingLocation ) {
        formData.append(key, shippingLocation[key]);
    }
    const response = yield axios({
        method: 'POST',
        url: baseUrl + `/user/${userId}/location`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization" : token,
        },
        data: formData,
    });
    const createdShippingLocation = yield response.status === 200 ? response.data : null
    return createdShippingLocation
}

function* updateShippingLocation(token,userId,shippingLocation){
    let formData = new FormData();
    for ( let key in shippingLocation ) {
        formData.append(key, shippingLocation[key]);
    }
    const response = yield axios({
        method: 'put',
        url: baseUrl + `/user/${userId}/location/${shippingLocation.ID}`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization" : token,
        },
        data: formData,
    });
    const updatedShippingLocation = yield response.status === 200 ? response : null
    return updatedShippingLocation
}

function* deleteShippingLocation(token,userId,shippingLocationId){

    const response = yield axios({
        method: 'DELETE',
        url: baseUrl + `/user/${userId}/location/${shippingLocationId}`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization" : token,
        },
        // data: formData,
    });
    const deleteShippingLocation = yield response.status === 200 ? response : null
    return deleteShippingLocation
}

function* reviewOrder(token,reviewObj){
    let formData = new FormData();
    for ( let key in reviewObj) {
        formData.append(key, reviewObj[key]);
    }
    console.log(formData);
    const response = yield axios({
        method: 'POST',
        url: baseUrl + `/review/`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization" : token,
        },
        data: formData,
    });
    console.log(response)

    const reviewResponse = yield response.status === 200 ? response : null
    return reviewResponse
}

export const Api = {
  loginFromApi,
  loginFacebookApi,
  getServicesFromApi,
  getPlacedOrdersFromApi,
  getNotificationsFromApi,
  createNewOrder,
  updateFcmTokenToApi,
  createNewShippingLocation,
  updateShippingLocation,
  deleteShippingLocation,
  reviewOrder,
};