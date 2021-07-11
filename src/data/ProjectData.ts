import {ActorData, IActorData} from "./ActorData";
import * as UUID from "uuid";
import {StateData} from "./StateData";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import {StoryboardData} from "./StoryboardData";
import {BackdropData} from "./BackdropData";


export class ProjectData {
    _id: string;
    name: string;
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
    storyboardList: Array<StoryboardData>;
    actorList: Array<ActorData>;
    backdropList: Array<BackdropData>;

    constructor(
        _id?: string,
        name?:string,
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
        storyboardList?:Array<StoryboardData>,
        actorList?:Array<ActorData>,
        backdropList?:Array<BackdropData>,
    ) {
        this._id = _id? _id:UUID.v4();
        this.name = name? name:"Untitled";
        this.storyboardMenu = storyboardMenu? storyboardMenu: {
            "final": {
                "name": "My storyboards",
                "items": []
            },
            "draft":  {
                "name": "Drafts",
                "items": []
            }
        };
        this.storyboardList = storyboardList? storyboardList:[];
        this.actorList = actorList? actorList:[];
        this.backdropList = backdropList? backdropList:[];
    }

    toJSON() {
        return {
            _id: this._id,
            name: this.name,
            storyboardMenu: this.storyboardMenu,
            storyboardList: this.storyboardList.map(a => a.toJSON()),
            actorList: this.actorList.map(a => a.toJSON()),
            backdropList: this.backdropList.map(a => a.toJSON()),
        }
    }

    toString() {
        return JSON.stringify(this.toJSON());
    }

    static parse(projectJSON: any): ProjectData {

        const projectData = new ProjectData(projectJSON._id, projectJSON.name, projectJSON.storyboardMenu);

        projectData.storyboardList = projectJSON.storyboardList.map((ele:any) => StoryboardData.parse(ele));
        projectData.actorList = projectJSON.actorList.map((ele:any) => ActorData.parse(ele));
        projectData.backdropList = projectJSON.backdropList.map((ele:any) => BackdropData.parse(ele));

        return projectData;
    }

    get actorDataKeys () {
        return this.actorList.map(a => a._id);
    }

    addStoryboard (type:"draft"|"final", storyboardDataJSON:any) {
       this.storyboardMenu[type].items.unshift(
           {"_id": storyboardDataJSON._id, "name": storyboardDataJSON.name}
       );
        this.storyboardList.unshift(
            StoryboardData.parse(storyboardDataJSON)
        )
        console.log("storyboardMenu: ====================: ", this.storyboardMenu);
        console.log("storyboardList: ====================: ", this.storyboardList);
    }

    getStoryboard (storyboardId:string) {
        return this.storyboardList.find(s => s._id === storyboardId);
    }

    updateStoryboardName (storyboardId:string, name:string) {
        const storyboard = this.getStoryboard(storyboardId);
        if (storyboard===undefined) return;
        storyboard.name = name;
        let candidateStoryboard;
        for (const type of ["final", "draft"]) {
            // @ts-ignore
            candidateStoryboard = this.storyboardMenu[type].items.find((el:any) => el._id === storyboardId)
            if (candidateStoryboard !== undefined) {
                candidateStoryboard.name = name;
                return;
            }
        }
    }


    updateStoryboardOrder(text:string) {
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
            this.storyboardMenu = ({
                ...this.storyboardMenu,
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
            const column = this.storyboardMenu[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            this.storyboardMenu = ({
                ...this.storyboardMenu,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            });
        }
    }

    addActor(actorDataJSON:IActorData) {
        this.actorList.unshift(
            ActorData.parse(actorDataJSON)
        )
        console.log("actorList: ", this.actorList)
    }


    updateActorOrder(beginOrder:number, endOrder:number) {
        const [removed] = this.actorList.splice(beginOrder, 1);
        this.actorList.splice(endOrder, 0, removed);
    }

    stateListJSON (actorId:string) {
        const actorData = this.actorList.find(e => e._id===actorId);
        const stateList = actorData === undefined? []:actorData.stateList;
        return stateList.map(s => (
            s.toJSON()
        ))
    }

    deleteState (actorId:string, stateId: string) {
        const actorData = this.actorList.find(e => e._id===actorId);
        const stateList = actorData === undefined? []:actorData.stateList;
        const stateIndex = stateList.findIndex(s => s._id === stateId);
        stateList.splice(stateIndex, 1);
    }

    download () {
        let filename = 'project';
        const urls = [
            'https://assets.thehindustep.in/user_tasks/01bd55804ecb6f90408f87d5710df126.docx',
            'https://assets.thehindustep.in/user_tasks/0304e0e4913e9a37a5ee6c38a8a2b1a8.pdf',
            'https://assets.thehindustep.in/user_tasks/02e8131da84606bf8457c38455b19ead.mp3'
        ];
        const zip = new JSZip();
        const folder = zip.folder('project');
        if (folder === null) return;
        folder.file('Hello.json', this.toString());
        urls.forEach(url => {
            const blobPromise = fetch(url).then(function(response) {
                console.log({ response });
                if (response.status === 200 || response.status === 0) {
                    return Promise.resolve(response.blob());
                } else {
                    return Promise.reject(new Error(response.statusText));
                }
            });
            const name = url.substring(url.lastIndexOf('/'));
            folder.file(name, blobPromise);
        });

        zip
            .generateAsync({ type: 'blob' })
            .then(blob => saveAs(blob, filename))
            .catch(e => console.log(e));
    }

}
