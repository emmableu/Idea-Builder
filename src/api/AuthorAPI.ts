// @ts-ignore
import axios from "../axiosConfig";
import {AuthorData} from "../data/AuthorData";

class AuthorAPI {

    static async insertAuthorData (authorData:AuthorData) {
        const response = await axios({
            method: 'post',
            url: `/author_data/add`,
            data: authorData
        })
        return response;
    }

    static async updateLastModified (authorData:AuthorData) {
        const response = await axios({
            method: 'post',
            url: `/author_data/update_last_modified`,
            data: authorData
        })
        return response;
    }


    static async loadAuthorData (projectId:string) {
        const response = await axios({
            method: 'get',
            url: `/author_data/${projectId}`,
        });
        return response;
    }
}

export {AuthorAPI};
