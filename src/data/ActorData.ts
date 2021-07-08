import {IStateData, StateData} from "./StateData";
import * as UUID from "uuid";

export interface IActorData {
    name: string;
    stateList: Array<IStateData>
}

export class ActorData implements IActorData {
    name: string = "";
    order:number = 0;
    stateList: Array<StateData> = [];

    constructor(name?:string, order?:number, stateList?:Array<StateData>) {
        this.name = name? name:"";
        this.order = order? order:0;
        this.stateList = stateList? stateList:[]
    }

    addNewState(stateUUID:string) {
        this.stateList.push(new StateData(stateUUID))
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

