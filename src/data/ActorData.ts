import {StateData, StateDataJSON} from "./StateData";
import * as UUID from "uuid";

interface ActorDataJSON {
    uuid: string;
    name: string;
    stateList: Array<StateDataJSON>
}


class ActorData {
    uuid: string;
    name: string;
    stateList: Array<StateData> = [];
    projectDataUUID: string;

    constructor(uuid?: string, name?:string, stateList?: Array<StateData>) {
        this.uuid = uuid? uuid:UUID.v4();
        this.name = name? name:"Untitled";
        this.stateList = stateList? stateList:[];
    }

    toJSON() {
        return {
            uuid: this.uuid,
            name: this.name,
            stateList: this.stateList.map(s => s.toJSON()),
        }
    }

    toString() {
        return JSON.stringify(this.toJSON());
    }

    static parse(actorDataJSON: ActorDataJSON) {
        return new ActorData(
            actorDataJSON.uuid,
            actorDataJSON.name,
            actorDataJSON.stateList.map(s => StateData.parse(s))
        );
    }
}
export {ActorDataJSON, ActorData};
