import axios from "../axiosConfig";
import {DashboardViewData} from "../data/DashboardData/DashboardViewData";
import {ProjectData} from "../data/ProjectData";

class ProjectAPI {

    /* this section is on project */
    static async insertProject (userId:string, projectData:ProjectData) {
        const response = await axios({
            method: 'post',
            url: `/project/add`,
            data: {
                userId: userId,
                projectData: projectData.toJSON()
            }
        })
        return response;
    }

    static async loadProject (_id:string) {
        const response = await axios({
            method: 'get',
            url: `/project/${_id}`,
        });
        return response;
    }

    static async updateName(text:any) {
        const response = await axios({
            method: 'post',
            url: `/project_name/replace`,
            data: text,
        });
        return response;
    }

    /* this section is on storyboard */
    static async addStoryboard(text:any) {
        const response = await axios({
            method: 'post',
            url: `/storyboard/add`,
            data: text,
        });
        return response;
    }

    static async updateStoryboardName(text:any) {
        const response = await axios({
            method: 'post',
            url: `/storyboard_name/replace`,
            data: text,
        });
        return response;
    }

    static async replaceStoryboardIdListInDatabase(text:any) {
        const response = await axios({
            method: 'post',
            url: `/storyboard_list/replace`,
            data: text,
        });
        return response;
    }

    /* this section is on actor */
    static async addActor(text:any) {
        const response = await axios({
            method: 'post',
            url: `/actor/add`,
            data: text,
        });
        return response;
    }

    static async updateActorName(text:any) {
        const response = await axios({
            method: 'post',
            url: `/actor_name/replace`,
            data: text,
        });
        return response;
    }

    static async replaceActorIdListInDatabase(text:any) {
        const response = await axios({
            method: 'post',
            url: `/actor_list/replace`,
            data: text,
        });
        return response;
    }

    /* this section is on state */
    static async replaceStateListInDatabase(text:any) {
        const response = await axios({
            method: 'post',
            url: `/state_list/replace`,
            data: text,
        });
        return response;
    }





}

export {ProjectAPI}
