import * as UUID from "uuid";

export interface StateData {
    _id: string;
    name: string;
}


export class StateDataHandler{
    static initializeState(_id?: string, name?:string):StateData  {
        return {
            _id: _id? _id:UUID.v4(),
            name: name? name:"Untitled"
        }
    }
}

