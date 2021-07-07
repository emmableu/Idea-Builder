import {ProjectData} from "../data/ProjectData"

export class ProjectDataParser {
    parse(projectJSON) {
        return Object.assign(ProjectData, projectJSON);
    }
}
