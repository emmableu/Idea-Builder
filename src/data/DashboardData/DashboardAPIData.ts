export class DashboardAPIData {
    userID: string;
    projectUUIDList: Array<string>;

    constructor (userID:string, projectUUIDList?:Array<string>)
    {
        this.userID = userID;
        this.projectUUIDList = projectUUIDList? projectUUIDList:[];
    }

    toJSON () {
        return {
            userID: this.userID,
            projectUUIDList: this.projectUUIDList,
        }
    }

    toString () {
        return JSON.stringify(this.toJSON())
    }

    static parse (dashboardJSON: {userID:string, projectUUIDList?:Array<string>}):
        DashboardAPIData {
        return new DashboardAPIData(
            dashboardJSON.userID,
            dashboardJSON.projectUUIDList
        )
    }

}
