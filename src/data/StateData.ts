import * as UUID from "uuid";

interface StateDataJSON {
    uuid: string;
    name: string;
}


class StateData {
    uuid: string;
    name: string;
    actorDataUUID: string;

    constructor(uuid?: string, name?:string) {
        this.uuid = uuid? uuid:UUID.v4();
        this.name = name? name:"Untitled";
    }

    toJSON() {
        return {
            uuid: this.uuid,
            name: this.name,
        }
    }

    static parse(stateDataJSON : StateDataJSON) {
        return new StateData(
            stateDataJSON.uuid,
            stateDataJSON.name
        )
    }
}

export {StateData, StateDataJSON};
