import * as UUID from "uuid";

export interface IBackdropData {
    _id: string;
    name: string;
}

export class BackdropData implements IBackdropData {
    _id: string;
    name: string = "";

    constructor(BackdropId?: string, name?:string, order?:number) {
        this._id = BackdropId? BackdropId:UUID.v4();
        this.name = name? name:"";
    }


    toJSON ():IBackdropData {
        return {
            _id: this._id,
            name: this.name,
        }
    }

    static  parse(BackdropJSON: any): BackdropData {
        console.log("BackdropData: ", BackdropJSON);
        return new BackdropData(BackdropJSON._id, BackdropJSON.name);
    }
}

