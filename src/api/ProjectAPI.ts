import axios from "../axiosConfig";
import {DashboardData} from "../data/DashboardData/DashboardData";
import {ProjectData} from "../data/ProjectData";

class ProjectAPI {

    /* this section is on project */
    static async insertProject (userId:string, projectData:ProjectData) {
        const response = await axios({
            method: 'post',
            url: `/project/add`,
            data: {
                userId: userId,
                projectData: projectData
            }
        })
        return response;
    }

    static async loadProject (_id:string) {
        const response = await axios({
            method: 'get',
            url: `/project/${_id}`,
        });
        return response;
    }

    static async updateName(text:any) {
        const response = await axios({
            method: 'post',
            url: `/project_name/replace`,
            data: text,
        });
        return response;
    }


    /* below are about selectedIds */
    static async updateSelectedIdData(text:any) {
        const response = await axios ({
            method: 'post',
            url: `/selected_id/update`,
            data: text
        })
        return response;
    }

    /* this section is on storyboard */
    static async addStoryboard(text:any) {
        const response = await axios({
            method: 'post',
            url: `/storyboard/add`,
            data: text,
        });
        return response;
    }

    static async updateStoryboardName(text:any) {
        const response = await axios({
            method: 'post',
            url: `/storyboard_name/replace`,
            data: text,
        });
        return response;
    }

    static async replaceStoryboardIdMenuInDatabase(text:any) {
        const response = await axios({
            method: 'post',
            url: `/storyboard_id_menu/replace`,
            data: text,
        });
        return response;
    }

    /* this section is on frame */
    static async replaceFrameIdListInDatabase(text:any) {
        console.log("text: ", text);
        const response = await axios({
            method: 'post',
            url: `/frame_list/replace`,
            data: text,
        });
        return response;
    }
    // selectedFrame,
    // img: img,


    static async insertFrameAndReplaceFrameListInDatabase(text: any) {
        const response = await axios({
            method: 'post',
            url: `/insert_and_replace_frame`,
            data: text,
        });
        return response;
    }

    /* this section is on star */

    static async replaceStarListInDatabase(text: any) {
        const response = await axios({
            method: 'post',
            url: `/star_list/replace`,
            data: text,
        });
        return response;
    }

    /* this section is on backdropStar */

    static async replaceBackdropStarInDatabase(text: any) {
        const response = await axios({
            method: 'post',
            url: `/backdrop_star/replace`,
            data: text,
        });
        return response;
    }

    /* This is on speech bubble */

    static async sendSpeechBubbleImg(text:any) {
        // globalLog("_id: ", text._id)
        // globalLog("img: ", text.img)
        const response = await axios({
            method: 'post',
            url: `/speech/upload`,
            data: {
                _id: text._id,
                img: text.img
            },
        });
        return response;
    }


    /* this section is on actor */
    static async addActor(text:any) {
        const response = await axios({
            method: 'post',
            url: `/actor/add`,
            data: text,
        });
        return response;
    }

    static async updateActorName(text:any) {
        const response = await axios({
            method: 'post',
            url: `/actor_name/replace`,
            data: text,
        });
        return response;
    }

    static async replaceActorIdListInDatabase(text:any) {
        const response = await axios({
            method: 'post',
            url: `/actor_list/replace`,
            data: text,
        });
        return response;
    }

    /* this section is on state */
    static async replaceStateListInDatabase(text:any) {
        const response = await axios({
            method: 'post',
            url: `/state_list/replace`,
            data: text,
        });
        return response;
    }

    /* this section is on backdrop */
    static async replaceBackdropListInDatabase(text:any) {
        const response = await axios({
            method: 'post',
            url: `/backdrop_list/replace`,
            data: text,
        });
        return response;
    }



    /* this section is on note */

    static async saveNote(text:any) {
        const response = await axios({
            method: 'post',
            url: `/save_note`,
            data: text,
        });
        return response;
    }

}

export {ProjectAPI}
