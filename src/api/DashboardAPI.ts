import axios from "../axiosConfig";
import {DashboardViewData} from "../data/DashboardData/DashboardViewData";

class DashboardAPI {

    static async insertDashboard (dashboardData:DashboardViewData) {
        const response = await axios({
            method: 'post',
            url: `/dashboard/add`,
            data: dashboardData.toString()
        })
        return response;
    }

    static async fetchDashboard (userID:string) {
        const response = await axios({
                                        method: 'get',
                                        url: `/dashboard/${userID}`,
                                        });
        return response;
    }

}

export {DashboardAPI}
