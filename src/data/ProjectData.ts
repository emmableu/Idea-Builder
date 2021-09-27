import {ActorData, ActorDataHandler} from "./ActorData";
import * as UUID from "uuid";
import {BackdropData, BackdropDataHandler} from "./BackdropData";
import {SelectedIdData, SelectedIdDataHandler} from "./SelectedIdData";
import fileDownload from "js-file-download";
import {FrameData, FrameDataHandler} from "./FrameData";
import {StoryboardData, StoryboardDataHandler} from "./StoryboardData";
import globalConfig, {globalLog} from "../globalConfig";
import JSZip from  'jszip';
import { saveAs } from 'file-saver';
import axios from "../axiosConfig";
// @ts-ignore
import Cookies from "js-cookie";

// import JSZipUtils from 'jszip-utils'
// export const generateZip = () => {
//     var zip = new JSZip();


export interface ProjectData {
    _id: string;
    authorIdList: Array<string>;
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
        const {_id, authorIdList, name, storyboardList, actorList, backdropList, storyboardMenu, templateList,
            selectedId, speechBubbleList, variableList, eventList,
        } = importedData;
        const projectId = _id? _id:UUID.v4();
        const projectName = name? name:"Untitled";
        const projectStoryboardList = storyboardList? storyboardList:[];
        // const projectStoryboardList = storyboardList? storyboardList:[StoryboardDataHandler.initializeStoryboard()];
        const projectActorList = actorList? actorList:[];
        const projectBackdropList = backdropList? backdropList:[];

        let projectTemplateList;
        if (templateList === undefined) {
            projectTemplateList = []
            // projectTemplateList = [projectStoryboardList[0].frameList[0]._id]
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

        const projectSelectedId = SelectedIdDataHandler.initializeSelectedId(
            // projectStoryboardList[0]._id,
            // projectStoryboardList[0].frameList[0]._id,
        )
        if (projectStoryboardList.length > 0) {
            projectSelectedId.storyboardId = projectStoryboardList[0]._id
            if (storyboardList[0].frameList.length > 0) {
                projectSelectedId.frameId = projectStoryboardList[0].frameList[0]._id
            }
        }

        const projectSpeechBubbleList = speechBubbleList?speechBubbleList:[];

        const projectEventList = eventList? eventList:[
            {
                _id: globalConfig.imageServer.sample.event + "time.png",
                name: "time goes by",
            },
            {
                _id: globalConfig.imageServer.sample.event + "green-flag.png",
                name: "green flag clicked",
            },
            {
                _id: globalConfig.imageServer.sample.event + "key-press.png",
                name: "key pressed",
            },
            {
                _id: globalConfig.imageServer.sample.event + "mouse-click.png",
                name: "mouse clicked",
            },
            {
                _id: globalConfig.imageServer.sample.event + "mouse-hover.png",
                name: "mouse hovered",
            },
            {
                _id: globalConfig.imageServer.sample.event + "mouse-released.png",
                name: "mouse released",
            }
        ];

        const projectVariableList = variableList? variableList: [];

        //variable changes to resources (e.g., should have icons, should have big speechBubble and character limit.

        return {
            _id: projectId,
            authorIdList,
            name: projectName,
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

    static deepCopy(projectData: ProjectData) : ProjectData {
        const {_id, authorIdList, name, storyboardList, actorList, backdropList, storyboardMenu, templateList,
            selectedId, speechBubbleList, variableList, eventList
        } = projectData;
        const projectId = UUID.v4();
        const projectName = name;
        const projectStoryboardList = [];
        const idOldNewMap = {};
        for (const storyboard of storyboardList) {
            const newS = StoryboardDataHandler.deepCopy(storyboard);
            // @ts-ignore
            idOldNewMap[storyboard._id] = newS._id
            projectStoryboardList.push(newS);
        }
        const projectActorList = [];
        for (const actor of actorList) {
            projectActorList.push(ActorDataHandler.deepCopy(actor));
        }

        const projectBackdropList = [];
        for (const backdrop of backdropList) {
            projectBackdropList.push(BackdropDataHandler.deepCopy(backdrop));
        }

        const projectTemplateList = templateList? templateList:[];


        let projectStoryboardMenu = {
            "final": {
                "name": "My storyboards",
                "items": []
            },
            "draft":  {
                "name": "Drafts",
                "items": []
            }};
        if (storyboardMenu) {
            if (storyboardMenu.final === undefined || storyboardMenu.draft === undefined) {
            }
            else {
                if (storyboardMenu.final.items === undefined || storyboardMenu.draft.items === undefined) {}
                else {
                    for (const id of storyboardMenu.final.items) {
                        // @ts-ignore
                        projectStoryboardMenu.final.items.push(idOldNewMap[id])
                    }
                    for (const id of storyboardMenu.draft.items) {
                        // @ts-ignore
                        projectStoryboardMenu.draft.items.push(idOldNewMap[id])
                    }
                }
            }
        }


        const projectSelectedId = SelectedIdDataHandler.initializeSelectedId(
        )

        const projectSpeechBubbleList = speechBubbleList?speechBubbleList:[];

        const projectEventList = eventList;

        const projectVariableList = variableList? variableList: [];

        //variable changes to resources (e.g., should have icons, should have big speechBubble and character limit.

        return {
            _id: projectId,
            authorIdList,
            name: projectName,
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

            const sourceColumn = projectData.storyboardMenu[source.droppableId];
            //@ts-ignore
            const destColumn = projectData.storyboardMenu[destination.droppableId];
            const sourceItems = [...sourceColumn.items];

            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            // destItems.splice(removed, 0);
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


    static updateFrameOrder(projectData:ProjectData, storyboardId:string, beginOrder:number, endOrder:number) {
        const frameList = ProjectDataHandler.frameList(projectData, storyboardId);
        const [removed] = frameList.splice(beginOrder, 1);
        frameList.splice(endOrder, 0, removed);
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

    static swapCostume (projectData:ProjectData, actorId:string, stateId: string, newActorId:string, newStateId:string) {
        if (actorId !== undefined) {
            const actorIndex = projectData.actorList.findIndex(a => a._id === actorId)
            if (actorIndex !== -1) {
                const actorData = projectData.actorList[actorIndex];
                if (actorData.stateList.length === 1) {
                    // projectData.actorList.splice(actorIndex, 1);
                    projectData.actorList[actorIndex].deleted = true;
                }
                else {
                    const stateIndex = actorData.stateList.findIndex(s => s._id === stateId);
                    // actorData.stateList.splice(stateIndex, 1);
                    actorData.stateList[stateIndex].deleted = true;
                }
            }
        }
        console.log("swapping costumes");

        for (const storyboardData of projectData.storyboardList) {
            for (const frameData of storyboardData.frameList) {
                for (const starData of frameData.starList) {
                    console.log("starData.prototypeId: ", starData.prototypeId);
                    console.log("stateId: ", stateId);
                    if (starData.prototypeId.split("?")[0] === stateId.split("?")[0]) {
                        starData.actorId = newActorId;
                        starData.prototypeId = newStateId;
                        if (starData.childStar.motionStarList.length > 0) {
                            for (const motionStar of starData.childStar.motionStarList) {
                                motionStar.prototypeId = newStateId;
                            }
                        }
                    }
                }
            }
        }
        // console.log("projectDATA: ", JSON.stringify(projectData))
    }

    static swapBackdrop (projectData:ProjectData, stateId: string, newStateId:string) {
        const backdropIndex = projectData.backdropList.findIndex(s => s._id === stateId);
        projectData.backdropList.splice(backdropIndex, 1);
        for (const storyboardData of projectData.storyboardList) {
            for (const frameData of storyboardData.frameList) {
                // console.log(JSON.stringify(frameData.backdropStar._id))
                // console.log(JSON.stringify(frameData.backdropStar.prototypeId))
                // console.log(JSON.stringify(stateId))
                if (frameData.backdropStar.prototypeId === stateId) {
                        // console.log("frameDATA backdropstar - before: ", JSON.stringify(frameData.backdropStar))
                        frameData.backdropStar.prototypeId = newStateId;
                        // console.log("frameDATA backdropstar - after: ", JSON.stringify(frameData.backdropStar))
                    }
            }
        }
        // console.log("projectDATA: ", JSON.stringify(projectData))
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
        return null;
    }

    static download (projectData:ProjectData) {
        // const deployMode = false;
        if (Cookies.get('userId')==="mbobbad" || Cookies.get('userId')==="wwang33" ) {
            const zip = new JSZip()
            const folder = zip.folder(projectData.name);
            // projectData. = true;
            if (projectData.storyboardList.length > 0) {
                projectData.storyboardList[0].recommendName = projectData.name;
            }
            let filename = projectData.name;
            // @ts-ignore
            folder.file("recommend.json", JSON.stringify(projectData));
            zip.generateAsync({type:"blob"})
                .then(blob => saveAs(blob, filename))
                .catch(e => console.log(e));
            return;
        }
        let filename = projectData.name;
        const zip = new JSZip()
        const folder = zip.folder(projectData.name)
        const {actorList, backdropList} = projectData;
        const imgData: { actorName: string; _id: string; name: string; order: number; }[] = []
        actorList.forEach(actorData => {
            actorData.stateList.forEach(
                (stateData, i)  => {
                    imgData.push({
                        actorName: actorData.name,
                        _id: stateData._id,
                        name: stateData.name,
                        order: i,
                    })
                }
            )
        })
        backdropList.forEach(
            (backdropData, i)  => {
                imgData.push({
                    actorName: "stage",
                    _id: backdropData._id,
                    name: backdropData.name,
                    order: i,
                })}
        )

        imgData.forEach((img)=> {
            const blobPromise =  fetch(axios.defaults.baseURL + img._id)
                .then(function (response) {
                    console.log({response})
                    if (response.status === 200 || response.status === 0) {
                        return Promise.resolve(response.blob());
                    } else {
                        return Promise.reject(new Error(response.statusText));
                    }
                })

            let name;
            // if (!deployMode) {
            //     const idSplit = img._id.split("?")[0].split(".")
            //     const postfix = idSplit[idSplit.length-1]
            //     name = idSplit[0].split("/")[idSplit[0].split("/").length-1] + "." + postfix
            // }
            const idSplit = img._id.split("?")[0].split(".")
            const postfix = idSplit[idSplit.length-1]
            name = `${img.actorName}-${img.name}-${img.order}.${postfix}`
            // @ts-ignore
            folder.file(name, blobPromise)
        })

        // @ts-ignore
        folder.file("project.json", JSON.stringify(projectData));

        zip.generateAsync({type:"blob"})
            .then(blob => saveAs(blob, filename))
            .catch(e => console.log(e));
    }
}
