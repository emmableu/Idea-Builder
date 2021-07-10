import * as UUID from "uuid";

class ProjectAPIData {
    uuid: string;
    name: string;
    deleted: boolean;
    actorUUIDList: Array<string>;

    constructor(uuid?: string, name?:string, deleted?: boolean, actorUUIDList?:  Array<string>) {
        this.uuid = uuid? uuid:UUID.v4();
        this.name = name? name:"Untitled";
        this.deleted = deleted? deleted:false;
        this.actorUUIDList = actorUUIDList? actorUUIDList:[];
    }

    toJSON() {
        return {
            uuid: this.uuid,
            name: this.name,
            deleted: this.deleted,
            actorUUIDList: this.actorUUIDList
        }
    }

    toString() {
        return JSON.stringify(this.toJSON());
    }


}

export {ProjectAPIData}
