import axios from "axios";
import { getToken, logout } from "./auth";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true'
  }
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use((response) => { // intercept the global error
  return response
}, function (error) {
  console.log(error.response.status);
  //let originalRequest = error.config
  if (error.response.status === 401) {//} && !originalRequest._retry) { // if the error is 401 and hasent already been retried
    // originalRequest._retry = true // now it can be retried 
    // return Vue.axios.post('/users/token', null).then((data) => {
    //   store.dispatch('authfalse') 
    //   store.dispatch('authtruth', data.data)
    //   originalRequest.headers['Authorization'] = 'Bearer ' + store.state.token // new header new token
    //   return Vue.axios(originalRequest) // retry the request that errored out
    // }).catch((error) => {
    //   for (let i = 0; i < error.response.data.errors.length; i++) {
    //     if (error.response.data.errors[i] === 'TOKEN-EXPIRED') {
    //       auth.logout()
    //       return
    //     }
    //   }
    // })
    logout();    
    window.location.href = '/';
    return
  }
  if (error.response.status === 404) {//} && !originalRequest._retry) {
    //originalRequest._retry = true
    //window.location.href = '/';
    return
  }
  // Do something with response error
  return Promise.reject(error)
})

export default api;