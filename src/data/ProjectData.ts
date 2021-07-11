import {ActorData, IActorData} from "./ActorData";
import * as UUID from "uuid";
import {StateData} from "./StateData";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

//Note: delete is a not used attribute, should remove.

export class ProjectData {
    _id: string;
    name: string;
    deleted: boolean;
    actorList: Array<ActorData>;

    constructor(_id?: string, name?:string, deleted?: boolean, actorList?:Array<ActorData>) {
        this._id = _id? _id:UUID.v4();
        this.name = name? name:"Untitled";
        this.deleted = deleted? deleted:false;
        this.actorList = actorList? actorList:[];
    }

    toJSON() {
        return {
            _id: this._id,
            name: this.name,
            deleted: this.deleted,
            actorList: this.actorList.map(a => a.toJSON())
        }
    }

    toString() {
        return JSON.stringify(this.toJSON());
    }

    static parse(projectJSON: any): ProjectData {
        const projectData = new ProjectData(projectJSON._id, projectJSON.name, projectJSON.deleted);
        projectJSON.actorList.forEach((a:any) => {
            projectData.actorList.push(
                 ActorData.parse(a))
        });
        return projectData;
    }

    get actorDataKeys () {
        return this.actorList.map(a => a._id);
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
