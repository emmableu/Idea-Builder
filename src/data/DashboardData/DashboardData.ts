export interface DashboardAPIData {
    userId: string;
    projectIdList: Array<string>;
}

export interface DashboardData {
    userId: string;
    projectList: Array<{ _id: string; name: string }>;
}



export class DashboardDataHandler {
    static initializeDashboard (obj:{
                            userId:string,
                            projectList?: Array<{ _id: string; name: string }>
                                }) {
        return {
         userId: obj.userId,
         projectList: obj.projectList ? obj.projectList : []}
    }

    static initializeDashboardAPI (obj:{
        userId:string,
        projectIdList?: Array< string >
    }) {
        return {
            userId: obj.userId,
            projectIdList: obj.projectIdList ? obj.projectIdList:[]
        }
    }
}
