// First we need to import axios.js
import axios from 'axios';
// import store from "./redux/store"
import {globalLog} from "./globalConfig"
import {AuthorAPI} from "./api/AuthorAPI";
import {loadAuthorData} from "./redux/features/authorSlice";
import Cookies from "js-cookie";
import {AuthorDataHandler} from "./data/AuthorData";
// Next we make an 'instance' of it
const instance = axios.create({
// .. where we make our configurations
    baseURL: process.env.REACT_APP_BACKEND_BASE_URL
});

const handleRequest = async (request) => {
    globalLog(request);
    // // Edit request config
    if (request.method === "post") {
        // const state = store.getState();
        // const projectId = state.project.value._id;
        // const lastLoaded = state.author.value.lastLoaded;
        // const authorRes = await AuthorAPI.loadAuthorData(projectId);
        // const {lastModified, lastModifiedBy} = AuthorDataHandler.parse(authorRes.data)
        // console.log("authordata", lastModified, lastModifiedBy, lastLoaded)
        // if (lastModifiedBy !== Cookies.get("userId")
        //     && lastModified > lastLoaded
        // ) {
        //     console.log("ILLEGAL UPDATE: ", lastModified, lastModifiedBy, lastLoaded)
        //     return Promise.reject();
        // }
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
