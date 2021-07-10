import {DashboardViewData} from "./DashboardViewData";

export class DashboardAPIData {
    userID: string;
    projectIdList: Array<string>;

    constructor (userID:string, projectIdList?:Array<string>)
    {
        this.userID = userID;
        this.projectIdList = projectIdList? projectIdList:[];
    }

    toJSON () {
        return {
            userID: this.userID,
            projectIdList: this.projectIdList,
        }
    }

    toString () {
        return JSON.stringify(this.toJSON())
    }

    toEmptyDashboardViewData () {
        return new DashboardViewData(
            this.userID
        )
    }

    static parse (dashboardJSON: {userID:string, projectIdList?:Array<string>}):
        DashboardAPIData {
        return new DashboardAPIData(
            dashboardJSON.userID,
            dashboardJSON.projectIdList
        )
    }

}
