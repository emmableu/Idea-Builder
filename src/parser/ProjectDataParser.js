import {ProjectData} from "../data/ProjectData"

export class ProjectDataParser {
    parse(projectJSON) {
        const projectData = new ProjectData();
        return Object.assign(projectData, projectJSON);
    }
}
