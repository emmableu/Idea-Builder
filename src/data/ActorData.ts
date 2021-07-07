import {IStateData, StateData} from "./StateData";
import * as UUID from "uuid";

export interface IActorData {
    name: string;
    stateList: Array<IStateData>
}

export class ActorData implements IActorData {
    name: string = "Untitled";
    stateList: Array<StateData> = [];

    constructor(name?:string, stateList?:Array<StateData>) {
        this.name = name? name:"Untitled";
        this.stateList = stateList? stateList:[]
    }

    addNewState() {
        this.stateList.push(new StateData())
    }

    toJSON ():IActorData {
        return {
            name: this.name,
            stateList: this.stateList.map(s => s.toJSON()),
        }
    }
}


export class ActorDataMap {
    [key: string]: ActorData
}

