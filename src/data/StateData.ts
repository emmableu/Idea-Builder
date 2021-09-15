import * as UUID from "uuid";

export interface StateData {
    _id: string;
    name: string;
    deleted?: boolean;
}


export class StateDataHandler{
    static initializeState(_id?: string, name?:string):StateData  {
        return {
            _id: _id? _id:UUID.v4(),
            name: name? name:"Untitled"
        }
    }
    static deepCopy(stateData: StateData):StateData  {
        const {_id, name} = stateData;
        const newId = _id.split("?")[0] + "?" + UUID.v4();
        return {
            _id: newId,
            name: name,
        }
    }
}

