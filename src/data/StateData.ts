import * as UUID from "uuid";

export interface IStateData {
    _id: string;
    name: string;
}


export class StateData implements IStateData{
    _id: string;
    name: string;

    constructor(_id?: string, name?:string) {
        this._id = _id? _id:UUID.v4();
        this.name = name? name:"Untitled";
    }

    toJSON (): IStateData {
        return {
            _id: this._id,
            name: this.name
        }
    }
}

