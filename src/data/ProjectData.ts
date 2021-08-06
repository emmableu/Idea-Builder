import {ActorData, ActorDataHandler} from "./ActorData";
import * as UUID from "uuid";
import {BackdropData} from "./BackdropData";
import {SelectedIdData, SelectedIdDataHandler} from "./SelectedIdData";
import fileDownload from "js-file-download";
import {FrameData, FrameDataHandler} from "./FrameData";
import {StoryboardData, StoryboardDataHandler} from "./StoryboardData";
import globalConfig, {globalLog} from "../globalConfig";

export interface ProjectData {
    _id: string;
    name: string;
    mode: string; //mode is the mode the ACTUAL OWNER last opened with. For non-OWNDERs, the mode in system is always view. mode is either view or edit.
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
    speechBubbleList: Array<{
        _id: string;
        who: string; //if it's actor's message, should include "WHO" says
        direction: string; //direction can be left or right.
        name: string;
    }>;
    variableList: Array<{
        _id: string;
        name: string;
        operator: string; //can be +, -, =
        value: string;
    }>;
    eventList: Array<{ //user inputs are like key pressed, mouse moving, etc
        _id: string; //this id is fixed for now because they are given by default
        name: string; //this name is also fixed for now because this is given by default
    }>;
}

export class ProjectDataHandler {
    static initializeProject( importedData:any ) : ProjectData
    {
        const {_id, name, mode, storyboardList, actorList, backdropList, storyboardMenu, templateList,
            selectedId, speechBubbleList, variableList, eventList,
        } = importedData;
        const projectId = _id? _id:UUID.v4();
        const projectName = name? name:"Untitled";
        const projectStoryboardList = storyboardList? storyboardList:[StoryboardDataHandler.initializeStoryboard()];
        const projectActorList = actorList? actorList:[];
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

        const projectSpeechBubbleList = speechBubbleList?speechBubbleList:[];

        const projectEventList = eventList? eventList:[
            {
                _id: globalConfig.imageServer.sample.event + "space-bar-3661045-3095465.png",
                name: "space key pressed",
            },
            {
                _id: globalConfig.imageServer.sample.event + "left-keyboard-arrow-key-direction-30505.png",
                name: "left arrow key pressed",
            },
            {
                _id: globalConfig.imageServer.sample.event + "right-keyboard-arrow-key-direction-30592.png",
                name: "right arrow key pressed",
            },
            {
                _id: globalConfig.imageServer.sample.event + "cursor-3537292-2960010.png",
                name: "mouse clicked",
            }
        ];

        const projectVariableList = variableList? variableList: [];

        //variable changes to resources (e.g., should have icons, should have big speechBubble and character limit.

        return {
            _id: projectId,
            name: projectName,
            mode: mode?mode:"edit",
            storyboardList: projectStoryboardList,
            actorList: projectActorList,
            backdropList: projectBackdropList,
            storyboardMenu: projectStoryboardMenu,
            templateList: projectTemplateList,
            selectedId: projectSelectedId,
            speechBubbleList: projectSpeechBubbleList,
            eventList: projectEventList,
            variableList: projectVariableList,
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


    static updateStoryboardOrder(projectData: ProjectData, speechBubble:string) {
        const result = JSON.parse(speechBubble);
        globalLog("result: ", result);
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

    static findFrame (projectData: ProjectData, frameId: string) {
        for (const storyboardData of projectData.storyboardList) {
            for (const frameData of storyboardData.frameList) {
                if (frameData._id === frameId){
                    return frameData
                }
            }
        }
        return FrameDataHandler.initializeFrame(frameId)
    }


    static frameList (projectData:ProjectData, storyboardId:string) {
        const storyboardData = ProjectDataHandler.getStoryboard(projectData, storyboardId);
        return storyboardData === undefined? []:storyboardData.frameList;
    }


    /* below are about actors */

    static addActor(projectData:ProjectData, actorData:ActorData) {
        projectData.actorList.unshift(actorData)
    }


    static updateActorOrder(projectData:ProjectData, beginOrder:number, endOrder:number) {
        const [removed] = projectData.actorList.splice(beginOrder, 1);
        projectData.actorList.splice(endOrder, 0, removed);
    }


    /* below are about states */

    static stateList (projectData:ProjectData,  actorId:string) {
        const actorData = projectData.actorList.find(e => e._id===actorId);
        return actorData === undefined ? [] : actorData.stateList
    }

    static deleteState (projectData:ProjectData, actorId:string, stateId: string) {
        const actorData = projectData.actorList.find(e => e._id===actorId);
        const stateList = actorData === undefined? []:actorData.stateList;
        const stateIndex = stateList.findIndex(s => s._id === stateId);
        stateList.splice(stateIndex, 1);
    }

    static findState (actorList: Array<ActorData>, prototypeId:string) {
        actorList.forEach(actorData => {
            actorData.stateList.forEach(
                stateData  => {
                    if (prototypeId === stateData._id) {
                        return actorData;
                    }
                }
            )
        })
    }

    static download (projectData:ProjectData) {
        fileDownload(JSON.stringify(projectData), 'project.json');
    }
}
