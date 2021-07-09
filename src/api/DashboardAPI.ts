import axios from "../axiosConfig";
import {DashboardData} from "../data/DashboardData";

class DashboardAPI {

    static async insertDashboard (dashboardData:DashboardData) {
        const response = await axios({
            method: 'post',
            url: `/add_dashboard`,
            data: dashboardData.toJSON()
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
