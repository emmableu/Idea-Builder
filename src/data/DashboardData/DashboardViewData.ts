export class DashboardViewData {
    userId: string;
    projectList: Array<{ _id: string; name: string }>;

    constructor(
        userId: string,
        projectList?: Array<{ _id: string; name: string }>
    ) {
        this.userId = userId;
        this.projectList = projectList ? projectList : [];
    }

    toJSON() {
        return {
            userId: this.userId,
            projectList: this.projectList.map(s => (
                {
                    "_id": s._id,
                    "name": s.name,
                }))
        }
    }

    toString() {
        return JSON.stringify(this);
    }


    static parse(dashboardJSON: {
        userId: string;
        projectList?: Array<{ _id: string; name: string }>;
    }): DashboardViewData {
        return new DashboardViewData(
            dashboardJSON.userId,
            dashboardJSON.projectList
        );
    }
}
