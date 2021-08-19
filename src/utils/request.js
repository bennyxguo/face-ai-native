import axios from 'axios';
import { store } from '../app/store';

// create an axios instance
const service = axios.create({
  // baseURL: 'https://faceai-api.herokuapp.com', // url = base url + request url
  baseURL: 'http://192.168.0.206:3030', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    const token = store.getState().user.token;
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    // Login or other response handle place here.
    return response;
  },
  (error) => {
    console.log('err' + error); // for debug
    console.error(error.message);
    return Promise.reject(error);
  }
);

export default service;
