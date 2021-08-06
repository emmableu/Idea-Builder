import { StateData, StateDataHandler} from "./StateData";
import * as UUID from "uuid";

export interface ActorData {
    _id: string;
    name: string;
    stateList: Array<StateData>;
    deleted:boolean;
}

export class ActorDataHandler {
    //actorId?: string, name?:string, order?:number, stateList?:Array<StateData>
    static initializeActor(
        actorData:any
    )
        : ActorData
    {
        const {_id, name, order, stateList, deleted,} = actorData;
        return {
            _id: _id? _id:UUID.v4(),
            name: name? name: "Untitled",
            stateList: stateList?stateList:[],
            deleted: deleted?deleted:false,
        };
    }

    static addState(actorData:ActorData, stateId:string) {
        actorData.stateList.push(StateDataHandler.initializeState(stateId))
    }

}
