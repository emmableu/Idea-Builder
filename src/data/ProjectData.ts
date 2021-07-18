import {ActorData, ActorDataHandler} from "./ActorData";
import * as UUID from "uuid";
import {BackdropData} from "./BackdropData";
import {SelectedIdData, SelectedIdDataHandler} from "./SelectedIdData";
import fileDownload from "js-file-download";
import {FrameData, FrameDataHandler} from "./FrameData";
import {StoryboardData, StoryboardDataHandler} from "./StoryboardData";

export interface ProjectData {
    _id: string;
    name: string;
    storyboardList: Array<StoryboardData>;
    actorList: Array<ActorData>;
    backdropList: Array<BackdropData>;
    storyboardMenu: {
        "final": {
            "name": string,
            "items": Array<{ "_id": string, "name": string}>
        }
        "draft":  {
            "name": string,
            "items": Array<{ "_id": string, "name": string}>
        }
    };
    templateList: Array<string>;
    selectedId: SelectedIdData;
}

export class ProjectDataHandler {
    static initializeProject(
        _id?: string,
        name?:string,
        storyboardList?:Array<StoryboardData>,
        actorList?:Array<ActorData>,
        backdropList?:Array<BackdropData>,
        storyboardMenu?:{
            "final": {
                "name": string,
                "items": Array<{ "_id": string, "name": string}>
            }
            "draft":  {
                "name": string,
                "items": Array<{ "_id": string, "name": string}>
            }
        },
        templateList?: Array<string>,
        selectedId?: SelectedIdData

    ) : ProjectData
    {
        const projectId = _id? _id:UUID.v4();
        const projectName = name? name:"Untitled";
        const projectStoryboardList = storyboardList? storyboardList:[StoryboardDataHandler.initializeStoryboard()];
        const projectActorList = actorList? actorList:[ActorDataHandler.initializeActor()];
        const projectBackdropList = backdropList? backdropList:[];

        let projectTemplateList;
        if (templateList === undefined) {
            projectTemplateList = [projectStoryboardList[0].frameList[0]._id]
        }
        else {
            projectTemplateList = templateList;
        }
        let projectStoryboardMenu;
        if (storyboardMenu === undefined) {
             projectStoryboardMenu =  {
                "final": {
                    "name": "My storyboards",
                    "items": [
                        {"_id": projectStoryboardList[0]._id,
                            "name": projectStoryboardList[0].name,}
                    ]
                },
                "draft":  {
                    "name": "Drafts",
                    "items": []
                }
            };
        }
        else {
            projectStoryboardMenu = storyboardMenu;
        }

        const projectSelectedId = selectedId?selectedId: SelectedIdDataHandler.initializeSelectedId(
            projectStoryboardList[0]._id,
            projectStoryboardList[0].frameList[0]._id,
        )

        return {
            _id: projectId,
            name: projectName,
            storyboardList: projectStoryboardList,
            actorList: projectActorList,
            backdropList: projectBackdropList,
            storyboardMenu: projectStoryboardMenu,
            templateList: projectTemplateList,
            selectedId: projectSelectedId,
        }
    }


    /* below are about storyboards */

    static addStoryboard (projectData: ProjectData, type:"draft"|"final", newStoryboardData:any) {


        projectData.storyboardMenu[type].items.unshift(
            {"_id": newStoryboardData._id, "name": newStoryboardData.name}
        );
        projectData.storyboardList.unshift(
            newStoryboardData
        )

        projectData.templateList.unshift(newStoryboardData.frameList[0]._id);

    }

    static getStoryboard (projectData: ProjectData, storyboardId:string) {
        return projectData.storyboardList.find(s => s._id === storyboardId);
    }


    static updateStoryboardName (projectData: ProjectData, storyboardId:string, name:string) {
        const storyboard = ProjectDataHandler.getStoryboard(projectData, storyboardId);
        if (storyboard===undefined) return;
        storyboard.name = name;
        let candidateStoryboard;
        for (const type of ["final", "draft"]) {
            // @ts-ignore
            candidateStoryboard = projectData.storyboardMenu[type].items.find((el:any) => el._id === storyboardId)
            if (candidateStoryboard !== undefined) {
                candidateStoryboard.name = name;
                return;
            }
        }
    }


    updateStoryboardOrder(projectData: ProjectData, text:string) {
        const result = JSON.parse(text);
        console.log("result: ", result);
        if (!result.destination) return;
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            //@ts-ignore
            const sourceColumn = this.storyboardMenu[source.droppableId];
            //@ts-ignore
            const destColumn = this.storyboardMenu[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            projectData.storyboardMenu = ({
                ...projectData.storyboardMenu,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            });
        } else {
            //@ts-ignore
            const column = projectData.storyboardMenu[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            projectData.storyboardMenu = ({
                ...projectData.storyboardMenu,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            });
        }
    }


    /* below are about frames */

    findFrame (projectData: ProjectData, frameId: string) {
        for (const storyboardData of projectData.storyboardList) {
            for (const frameData of storyboardData.frameList) {
                if (frameData._id === frameId){
                    return frameData
                }
            }
        }
        return FrameDataHandler.initializeFrame(frameId)
    }


    frameList (projectData:ProjectData, storyboardId:string) {
        const storyboardData = ProjectDataHandler.getStoryboard(projectData, storyboardId);
        return storyboardData === undefined? []:storyboardData.frameList;
    }


    /* below are about actors */

    addActor(projectData:ProjectData, actorData:ActorData) {
        projectData.actorList.unshift(actorData)
    }


    updateActorOrder(projectData:ProjectData, beginOrder:number, endOrder:number) {
        const [removed] = projectData.actorList.splice(beginOrder, 1);
        projectData.actorList.splice(endOrder, 0, removed);
    }


    /* below are about states */

    stateList (projectData:ProjectData,  actorId:string) {
        const actorData = projectData.actorList.find(e => e._id===actorId);
        return actorData === undefined ? [] : actorData.stateList
    }

    deleteState (projectData:ProjectData, actorId:string, stateId: string) {
        const actorData = projectData.actorList.find(e => e._id===actorId);
        const stateList = actorData === undefined? []:actorData.stateList;
        const stateIndex = stateList.findIndex(s => s._id === stateId);
        stateList.splice(stateIndex, 1);
    }

    download () {
        fileDownload(this.toString(), 'project.json');
    }
}
