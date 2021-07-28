import { StateData, StateDataHandler} from "./StateData";
import * as UUID from "uuid";

export interface ActorData {
    _id: string;
    name: string;
    stateList: Array<StateData>
}

export class ActorDataHandler {
    //actorId?: string, name?:string, order?:number, stateList?:Array<StateData>
    static initializeActor(
        actorData:any
    )
        : ActorData
    {
        const {_id, name, order, stateList} = actorData;
        return {
            _id: _id? _id:UUID.v4(),
            name: name? name: "Untitled",
            stateList: stateList?stateList:[]
        };
    }

    static addState(actorData:ActorData, stateId:string) {
        actorData.stateList.push(StateDataHandler.initializeState(stateId))
    }

}
