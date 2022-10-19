import { StateData, StateDataHandler} from "./StateData";
import * as UUID from "uuid";

export interface ActorData {
    _id: string;
    name: string;
    stateList: Array<StateData>;
    deleted:boolean;
    description: string;
}

export class ActorDataHandler {
    //actorId?: string, name?:string, order?:number, stateList?:Array<StateData>
    static initializeActor(
        actorData:any
    )
        : ActorData
    {
        const {_id, name, order, stateList, deleted, description} = actorData;
        return {
            _id: _id? _id:UUID.v4(),
            name: name? name: "Untitled",
            stateList: stateList?stateList:[],
            deleted: deleted?deleted:false,
            description: description?description:""
        };
    }

    static deepCopy(actorData:ActorData) {
        const { name, stateList, deleted} = actorData;
        const newStateList = []
        for (const state of stateList) {
            newStateList.push(StateDataHandler.deepCopy(state))
        }
        const description = actorData.description?actorData.description:"";
        return {
            _id: UUID.v4(),
            name,
            stateList: newStateList,
            deleted,
            description,
        };
    }

    static useModified(actorData:ActorData) {
        if (actorData.deleted) {
            return null
        }
        const { name, stateList, deleted, description} = actorData;
        const newStateList = []
        for (const state of stateList) {
            if (state.deleted === true) {
                continue;
            }
            newStateList.push(state)
        }
        return {
            _id: UUID.v4(),
            name,
            stateList: newStateList,
            deleted,
            description: description?description:"",
        };
    }

    static addState(actorData:ActorData, stateId:string) {
        actorData.stateList.push(StateDataHandler.initializeState(stateId))
    }
}
