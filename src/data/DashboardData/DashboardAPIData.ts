import {DashboardViewData} from "./DashboardViewData";

export class DashboardAPIData {
    userId: string;
    projectIdList: Array<string>;

    constructor (userId:string, projectIdList?:Array<string>)
    {
        this.userId = userId;
        this.projectIdList = projectIdList? projectIdList:[];
    }

    toJSON () {
        return {
            userId: this.userId,
            projectIdList: this.projectIdList,
        }
    }

    toString () {
        return JSON.stringify(this.toJSON())
    }

    toEmptyDashboardViewData () {
        return new DashboardViewData(
            this.userId
        )
    }

    static parse (dashboardJSON: {userId:string, projectIdList?:Array<string>}):
        DashboardAPIData {
        return new DashboardAPIData(
            dashboardJSON.userId,
            dashboardJSON.projectIdList
        )
    }

}
