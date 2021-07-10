import axios from "../axiosConfig";
import {DashboardViewData} from "../data/DashboardData/DashboardViewData";
import {ProjectData} from "../data/ProjectData";

class ProjectAPI {

    static async insertProject (userID:string, projectData:ProjectData) {
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

    static async loadProject (uuid:string) {
        const response = await axios({
            method: 'get',
            url: `/project/${uuid}`,
        });
        return response;
    }

}

export {ProjectAPI}
