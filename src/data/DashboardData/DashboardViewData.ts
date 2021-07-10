export class DashboardViewData {
    userID: string;
    projectList: Array<{ uuid: string; name: string }>;

    constructor(
        userID: string,
        projectList?: Array<{ uuid: string; name: string }>
    ) {
        this.userID = userID;
        this.projectList = projectList ? projectList : [];
    }

    toJSON() {
        return {
            userID: this.userID,
            projectList: this.projectList.map(s => (
                {
                    "uuid": s.uuid,
                    "name": s.name,
                }))
        }
    }

    toString() {
        return JSON.stringify(this.toJSON());
    }

    projectListJSON () {
        return this.projectList.map(s => (
            {
                "uuid": s.uuid,
                "name": s.name,
            }
        ))
    }

    static parse(dashboardJSON: {
        userID: string;
        projectList?: Array<{ uuid: string; name: string }>;
    }): DashboardViewData {
        return new DashboardViewData(
            dashboardJSON.userID,
            dashboardJSON.projectList
        );
    }
}
