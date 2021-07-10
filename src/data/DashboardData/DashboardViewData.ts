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
            projectList: this.projectList
        };
    }

    toString() {
        return JSON.stringify(this.toJSON());
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
