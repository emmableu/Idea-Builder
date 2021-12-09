import axios from "../axios/ideaServerAxiosConfig";
import {DashboardAPIData} from "../data/DashboardData/DashboardData";

class DashboardAPI {

    static async insertDashboard (dashboardAPIData:DashboardAPIData) {
        const response = await axios({
            method: 'post',
            url: `/dashboard/add`,
            data: dashboardAPIData
        })
        return response;
    }

    static async fetchDashboard (authorId:string) {
        const response = await axios({
                                        method: 'get',
                                        url: `/dashboard/${authorId}`,
                                        });
        return response;
    }

    static async replaceProjectIdListInDatabase(text:any) {
        const response = await axios({
            method: 'post',
            url: `/project_list/replace`,
            data: text,
        });
        return response;
    }
}

export {DashboardAPI}
