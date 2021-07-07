// import {ActorData, ActorDataJSON} from "./ActorData";
// import * as UUID from "uuid";
// import stream = require("node:stream");
//
// interface ProjectDataJSON {
//     uuid: string;
//     name: string;
//     actorList: Array<ActorDataJSON>;
// }
//
// class ProjectData {
//     uuid: string;
//     name: string;
//     actorList: Array<ActorDataJSON>;
//
//     constructor(uuid?: string, name?:string, actorList?:  Array<ActorDataJSON>) {
//         this.uuid = uuid? uuid:UUID.v4();
//         this.name = name? name:"Untitled";
//         this.actorList = actorList? actorList:[];
//     }
//
//     toJSON() {
//         return {
//             uuid: this.uuid,
//             name: this.name,
//             actorData: this.actorData.toJSON(),
//         }
//     }
//
//     toString() {
//         return JSON.stringify(this.toJSON());
//     }
//
//     static parse(projectDataJSON: ProjectDataJSON) {
//         return new ProjectData(
//             projectDataJSON.uuid,
//             projectDataJSON.name,
//             projectDataJSON.actorList.map(a => (ActorData.parse(a))),
//         )
//     }
// }
// export default ActorData;
