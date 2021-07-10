import axios from "../axiosConfig";
import {DashboardViewData} from "../data/DashboardData/DashboardViewData";
import {ProjectData} from "../data/ProjectData";

class ProjectAPI {

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

    static async replaceActorIdListInDatabase(text:any) {
        const response = await axios({
            method: 'post',
            url: `/actor_list/replace`,
            data: text,
        });
        return response;
    }

    static async addActor(text:any) {
        const response = await axios({
            method: 'post',
            url: `/actor/add`,
            data: text,
        });
        return response;
    }
}

export {ProjectAPI}
