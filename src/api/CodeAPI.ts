import axios from "../axios/ideaTranslatorAxiosConfig";
import axiosPython from "../axios/ideaServerAxiosConfig";
import {StoryboardData} from "../data/StoryboardData";
import {ActorData} from "../data/ActorData";
import {BackdropData} from "../data/BackdropData";
import axiosExpress from "../axios/axiosExpressConfig";


class CodeAPI {
    static async getProgram (storyboardData : StoryboardData, actorList : Array<ActorData>, backdropList: Array<BackdropData>,
                                   eventList: Array<{ //user inputs are like key pressed, mouse moving, etc
                                       _id: string; //this id is fixed for now because they are given by default
                                       name: string; //this name is also fixed for now because this is given by default
                                   }>,
    ) {
        const response = await axios({
            method: 'post',
            url: `/get_actor_code_list`,
            data: {
                storyboardJson: storyboardData,
                actorListJson: actorList,
                backdropListJson: backdropList,
                eventListJson: eventList,
            }
        })
        const projectJson = response.data;
        const xml =  await CodeAPI.postSnapXML(storyboardData.name, projectJson, "csc110");
        return xml;
    }

    static async postSnapXML (projectName:string, projectJson:any, type:string) {
        // console.log("postSnapXML");
        const response = await axiosExpress({
            method: 'post',
            url: `/post-snap-xml/${projectName}`,
            data: {
                projectJson: projectJson === null? null: JSON.stringify(projectJson),
                type,
            }
        })
        return response.data;
    }

    static async saveCurrentProgram(obj: { userId: any; storyboardId: any; storyboardName: string; projectXml: any; }) {
        const response = await axiosPython({
            method: 'post',
            url: `/save_current_program`,
            data: obj,
        })
        return response.data;
    }
}

export default CodeAPI;
