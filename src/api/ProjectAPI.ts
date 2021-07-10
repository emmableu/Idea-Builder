import axios from "../axiosConfig";
import {DashboardViewData} from "../data/DashboardData/DashboardViewData";
import {ProjectViewData} from "../data/ProjectData/ProjectViewData";
import {ProjectAPIData} from "../data/ProjectData/ProjectAPIData";

class ProjectAPI {

    static async insertProject (userID:string, projectData:ProjectAPIData) {
        const response = await axios({
            method: 'post',
            url: `/project/add`,
            data: {
                userID: userID,
                projectData: projectData.toJSON()
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
