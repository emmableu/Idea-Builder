export interface DashboardAPIData {
    authorId: string;
    projectIdList: Array<string>;
}

export interface DashboardData {
    authorId: string;
    projectList: Array<{ _id: string; name: string }>;
}



export class DashboardDataHandler {
    static initializeDashboard (obj:{
                            authorId:string,
                            projectList?: Array<{ _id: string; name: string }>
                                }) {
        return {authorId: obj.authorId,
         projectList: obj.projectList ? obj.projectList : []}
    }

    static initializeDashboardAPI (obj:{
        authorId:string,
        projectIdList?: Array< string >
    }) {
        return {
            authorId: obj.authorId,
            projectIdList: obj.projectIdList ? obj.projectIdList:[]
        }
    }
}
