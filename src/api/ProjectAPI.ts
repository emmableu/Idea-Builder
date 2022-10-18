import axios from "../axios/ideaServerAxiosConfig";
import {DashboardData} from "../data/DashboardData/DashboardData";
import {ProjectData} from "../data/ProjectData";

class ProjectAPI {

    /* this section is on project */
    static async insertProject (authorId:string, projectData:ProjectData) {
        const response = await axios({
            method: 'post',
            url: `/project/add`,
            data: {
                authorId,
                projectData,
            }
        })
        return response;
    }
    static async addEntryToDashboard (obj:any) {
            const response = await axios({
                method: 'post',
                url: `/dashboard/add_entry`,
                data: obj,
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

    static async updateAuthorIdList(text:any) {
        const response = await axios({
            method: 'post',
            url: `/project/update_author_id_list`,
            data: text
        })
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

    static async updateHasCodeList(obj: any) {
        const response = await axios({
            method: 'post',
            url: `/has_code_list/set`,
            data: obj,
        });
        return response;
    }

    static async updateStoryboardHasCode(obj: any) {
        const response = await axios({
            method: 'post',
            url: `/storyboard_has_code/set`,
            data: obj,
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

    static async saveRating(obj:any) {
        const response = await axios(
            {
                method: 'post',
                url: `/storyboard_save_rating`,
                data: obj,
            }
        )
    }

    static async saveHasCode(obj:any) {
        const response = await axios(
            {
                method: 'post',
                url: `/storyboard_save_has_code`,
                data: obj,
            }
        )
    }

    /* this section is on frame */
    static async replaceFrameIdListInDatabase(text:any) {
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

    // template
    static async replaceTemplateListInDatabase(obj:any) {
        const response = await axios(
            {
                method: 'post',
                url: `/template_list/replace`,
                data: obj,
            }
        )
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

    /* This is on frame text bubble */

    static async sendFrameTextImg(text:any) {
        // globalLog("_id: ", text._id)
        // globalLog("img: ", text.img)
        const response = await axios({
            method: 'post',
            url: `/text/upload`,
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
