import {IStateData, StateData} from "./StateData";
import * as UUID from "uuid";

export interface IActorData {
    _id: string;
    name: string;
    stateList: Array<IStateData>
}

export class ActorData implements IActorData {
    _id: string;
    name: string = "";
    stateList: Array<StateData> = [];

    constructor(actorId?: string, name?:string, order?:number, stateList?:Array<StateData>) {
        this._id = actorId? actorId:UUID.v4();
        this.name = name? name:"";
        this.stateList = stateList? stateList:[]
    }

    addState(stateId:string) {
        this.stateList.push(new StateData(stateId))
    }

    toJSON ():IActorData {
        return {
            _id: this._id,
            name: this.name,
            stateList: this.stateList.map(s => s.toJSON()),
        }
    }

    static  parse(actorJSON: any): ActorData {
        console.log("actorData: ", actorJSON);
        const actorData = new ActorData(actorJSON._id, actorJSON.name);
        actorJSON.stateList.forEach(
            (s: { _id: string | undefined; name: string | undefined; }) => {
                actorData.stateList.push(new StateData(
                    s._id, s.name
                ));
            })
        return actorData;
    }
}


// export class ActorDataMap {
//     [key: string]: ActorData
// }

