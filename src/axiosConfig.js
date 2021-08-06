// First we need to import axios.js
import axios from 'axios';
import {globalLog} from "./globalConfig"
// Next we make an 'instance' of it
const instance = axios.create({
// .. where we make our configurations
    baseURL: process.env.REACT_APP_BACKEND_BASE_URL
});


instance.interceptors.request.use(request => {
    globalLog(request);
    // Edit request config
    return request;
}, error => {
    globalLog(error);
    return Promise.reject(error);
});

instance.interceptors.response.use(response => {
    globalLog(response);
    // Edit response config
    return response;
}, error => {
    globalLog(error);
    return Promise.reject(error);
});




export default instance;
