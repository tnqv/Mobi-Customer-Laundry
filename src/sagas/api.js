const baseUrl = 'http://localhost:8080/api/v1';

import axios from 'axios';

function* loginFromApi(emailFromAction,passwordFromAction){

    const response = yield axios({
      method: 'post',
      url: baseUrl + '/accounts/login',
      header: {
          "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {
        email: emailFromAction,
        password: passwordFromAction,
      }
    });

    const accountInfo = yield response.status === 200 ? JSON.parse(response._bodyInit): []
    return accountInfo;
}

export const Api = {
  loginFromApi,
};