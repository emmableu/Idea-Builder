import {ActorData, IActorData} from "./ActorData";
import {IStateData, StateData} from "./StateData";
import {ProjectData} from "./ProjectData";


abstract class Parser {
    abstract parse(inputJSON: any):any;
}


export class ProjectDataParser implements Parser {
    parse(projectJSON: any): ProjectData {
        const projectData = new ProjectData(projectJSON.uuid, projectJSON.name);
        Object.keys(projectJSON.actorDataMap).forEach(a => {
            projectData.actorDataMap[a] =
                new ActorDataParser().parse(projectJSON.actorDataMap[a])
        });
        return projectData;
    }
}

class ActorDataParser implements Parser{
    parse(actorJSON: any): ActorData {
        const actorData = new ActorData(actorJSON.name);
        actorJSON.stateList.forEach(
            (s: { uuid: string | undefined; name: string | undefined; }) => {
            actorData.stateList.push(new StateData(
                s.uuid, s.name
            ));
        })
        return actorData;
    }
}
