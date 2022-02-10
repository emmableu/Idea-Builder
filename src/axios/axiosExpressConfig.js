// First we need to import axios.js
import axios from 'axios';
import 'regenerator-runtime/runtime';
const instance = axios.create({
// .. where we make our configurations
//     baseURL: process.env.REACT_APP_EXPRESS_BASE_URL
    baseURL:"http://localhost:9090"
});

const handleRequest = async (request) => {
    // // Edit request config
    if (request.method === "post") {
    }
    return request;
}

instance.interceptors.request.use(
    handleRequest,
    error => {
        console.log(error);
        return Promise.reject(error);
    });

instance.interceptors.response.use(response => {
    console.log(response);
    // Edit response config
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
});




export default instance;
