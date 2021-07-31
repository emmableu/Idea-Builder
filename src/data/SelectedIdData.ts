import {StoryboardData} from "./StoryboardData";


export interface SelectedIdData {
    storyboardId: string | null;
    frameId: string | null;
    starId: string | null;
}


export class SelectedIdDataHandler {
    static initializeSelectedId (
        storyboardId?:string,
        frameId?:string,
        starId?:string
    ) : SelectedIdData
    {
        return {
            storyboardId : storyboardId?storyboardId:null,
            frameId : frameId?frameId:null,
            starId : starId?starId:null
        }
    }

    static setStoryboardId (selectedIdData: SelectedIdData, storyboardData: StoryboardData) {
        selectedIdData.storyboardId = storyboardData._id;
        // selectedIdData is needed to hard refresh the frameList, otherwise the images were kept as the cached ones.
        selectedIdData.frameId = storyboardData.frameList[0]._id;
        selectedIdData.starId = null
    }

    static voidStoryboardId (selectedIdData: SelectedIdData) {
        selectedIdData.storyboardId = null;
        selectedIdData.frameId = null;
        selectedIdData.starId = null
    }

    static setFrameId (selectedIdData: SelectedIdData, frameId:string) {
        console.log("selected Frame ID: ", frameId);
        selectedIdData.frameId = frameId;
        selectedIdData.starId = null
    }


    static voidFrameId (selectedIdData: SelectedIdData) {
        selectedIdData.frameId = null;
        selectedIdData.starId = null
    }


    static setStarId (selectedIdData: SelectedIdData, starId:string) {
        selectedIdData.starId = starId;
    }

}
