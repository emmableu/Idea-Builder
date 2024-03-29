// First we need to import axios.js
import axios from 'axios';
// import store from "./redux/store"
import {globalLog} from "../globalConfig"
// Next we make an 'instance' of it
const instance = axios.create({
// .. where we make our configurations
    baseURL: process.env.REACT_APP_IDEA_SERVER_BASE_URL
});

const handleRequest = async (request) => {
    globalLog(request);
    if (request.method === "post") {
    }
    return request;
}

instance.interceptors.request.use(
        handleRequest,
        error => {
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
