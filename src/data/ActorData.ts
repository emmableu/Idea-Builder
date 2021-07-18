import { StateData, StateDataHandler} from "./StateData";
import * as UUID from "uuid";

export interface ActorData {
    _id: string;
    name: string;
    stateList: Array<StateData>
}

export class ActorDataHandler {

    static initializeActor(actorId?: string, name?:string, order?:number, stateList?:Array<StateData>)
        : ActorData
    {
        return {
            _id: actorId? actorId:UUID.v4(),
            name: name? name: "",
            stateList: stateList?stateList:[]
        };
    }

    static addState(actorData:ActorData, stateId:string) {
        actorData.stateList.push(StateDataHandler.initializeState(stateId))
    }

}
