import axios from "../axiosConfig";
import {DashboardViewData} from "../data/DashboardData/DashboardViewData";
import {ProjectViewData} from "../data/ProjectData/ProjectViewData";

class ProjectAPI {

    static async insertProject (userID:string, projectData:ProjectViewData) {
        const response = await axios({
            method: 'post',
            url: `/project/add`,
            data: {
                userID: userID,
                projectData: projectData.toString()
            }
        })
        return response;
    }

    static async fetchProject (uuid:string) {
        const response = await axios({
            method: 'get',
            url: `/project/${uuid}`,
        });
        return response;
    }

}

export {ProjectAPI}
