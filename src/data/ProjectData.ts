import {ActorData, IActorData, ActorDataMap} from "./ActorData";
import * as UUID from "uuid";
import {StateData} from "./StateData";
// import stream = require("node:stream");

interface IProjectDataItem {
    name: string;
    actorDataMap: {
        [key: string]: IActorData
    };
}

export interface IProjectData {
    [key:string]: IProjectDataItem;
}


export class ProjectData {
    uuid: string;
    name: string;
    actorDataMap: ActorDataMap;

    constructor(uuid?: string, name?:string, actorDataMap?:  ActorDataMap) {
        this.uuid = uuid? uuid:UUID.v4();
        this.name = name? name:"Untitled";
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
            actorDataMap
        }
    }

    toString() {
        return JSON.stringify(this.toJSON());
    }

    addNewActor() {
        const uuid = UUID.v4();
        this.actorDataMap[uuid] = new ActorData();
    }

}
