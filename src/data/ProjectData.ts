import {ActorData, IActorData, ActorDataMap} from "./ActorData";
import * as UUID from "uuid";
import {StateData} from "./StateData";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';


export class ProjectData {
    uuid: string;
    name: string;
    deleted: boolean;
    actorDataMap: ActorDataMap;

    constructor(uuid?: string, name?:string, deleted?: boolean, actorDataMap?:  ActorDataMap) {
        this.uuid = uuid? uuid:UUID.v4();
        this.name = name? name:"Untitled";
        this.deleted = deleted? deleted:false;
        this.actorDataMap = actorDataMap? actorDataMap:{};
    }

    toJSON() {
        const actorDataMap:{[key:string]:IActorData} = {};
        Object.keys(this.actorDataMap).forEach((e) =>
             actorDataMap[e] = this.actorDataMap[e].toJSON()
        );
        return {
            uuid: this.uuid,
            name: this.name,
            deleted: this.deleted,
            actorDataMap
        }
    }

    toString() {
        return JSON.stringify(this.toJSON());
    }

    static parse(projectJSON: any): ProjectData {
        const projectData = new ProjectData(projectJSON.uuid, projectJSON.name, projectJSON.deleted);
        Object.keys(projectJSON.actorDataMap).forEach(a => {
            projectData.actorDataMap[a] =
                 ActorData.parse(projectJSON.actorDataMap[a])
        });
        return projectData;
    }

    get actorDataKeys () {
        return Object.keys(this.actorDataMap);
    }


    addNewActor() {
        const uuid = UUID.v4();
        this.actorDataMap[uuid] = new ActorData();
        this.actorDataKeys.forEach(key => {
            this.actorDataMap[key].order += 1;
        })
    }

    get actorDataList () {
        const actorDataList: {  uuid: string; name: string; order: number; stateList: StateData[];}[] = [];
        this.actorDataKeys.forEach((key) => {
            actorDataList.push({
                uuid: key,
                ...this.actorDataMap[key],
            })
        })
        actorDataList.sort((a, b) => a.order - b.order);
        console.log("actorDataList: ", actorDataList);
        return actorDataList;
    }

    updateActorOrder(beginOrder:number, endOrder:number) {
        const actorDataList = this.actorDataList;
        const [removed] = actorDataList.splice(beginOrder, 1);
        actorDataList.splice(endOrder, 0, removed);
        actorDataList.forEach((a, index) => {
            this.actorDataMap[a.uuid].order = index;
        })
    }

    stateListJSON (actorUUID:string) {
        const stateList = this.actorDataMap[actorUUID].stateList;
        return stateList.map(s => (
            s.toJSON()
        ))
    }

    deleteActorState (actorUUID:string, stateUUID: string) {
        const stateList = this.actorDataMap[actorUUID].stateList;
        const stateIndex = stateList.findIndex(stateData => stateData.uuid === stateUUID);
        this.actorDataMap[actorUUID].stateList.splice(stateIndex, 1);
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
