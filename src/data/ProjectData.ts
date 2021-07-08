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

}
