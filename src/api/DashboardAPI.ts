import axios from "../axiosConfig";
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

    static async fetchDashboard (userId:string) {
        const response = await axios({
                                        method: 'get',
                                        url: `/dashboard/${userId}`,
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
