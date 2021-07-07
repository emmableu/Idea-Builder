import * as UUID from "uuid";

export interface IStateData {
    uuid: string;
    name: string;
}


export class StateData implements IStateData{
    uuid: string;
    name: string;

    constructor(uuid?: string, name?:string) {
        this.uuid = uuid? uuid:UUID.v4();
        this.name = name? name:"state";
    }

    toJSON (): IStateData {
        return {
            uuid: this.uuid,
            name: this.name
        }
    }
}

