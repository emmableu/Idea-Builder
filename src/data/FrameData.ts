import * as UUID from "uuid";

export interface IFrameData {
    _id: string;
    name: string;
}


export class FrameData implements IFrameData{
    _id: string;
    name: string;

    constructor(_id?: string, name?:string) {
        this._id = _id? _id:UUID.v4();
        this.name = name? name:"frame";
    }

    toJSON (): IFrameData {
        return {
            _id: this._id,
            name: this.name
        }
    }
}

