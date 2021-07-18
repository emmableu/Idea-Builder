import {StoryboardData} from "./StoryboardData";


export interface SelectedIdData {
    storyboardId: string;
    frameId: string;
    starId: string;
}


export class SelectedIdDataHandler {
    static initializeSelectedId (
        storyboardId?:string,
        frameId?:string,
        starId?:string
    ) : SelectedIdData
    {
        return {
            storyboardId : storyboardId?storyboardId:"UNDEFINED",
            frameId : frameId?frameId:"UNDEFINED",
            starId : starId?starId:"UNDEFINED"
        }
    }

    static setStoryboardId (selectedIdData: SelectedIdData, storyboardData: StoryboardData) {
        selectedIdData.storyboardId = storyboardData._id;
        // selectedIdData is needed to hard refresh the frameList, otherwise the images were kept as the cached ones.
        selectedIdData.frameId = storyboardData.frameList[0]._id;
        selectedIdData.starId = "UNDEFINED"
    }

    static voidStoryboardId (selectedIdData: SelectedIdData) {
        selectedIdData.storyboardId = "UNDEFINED";
        selectedIdData.frameId = "UNDEFINED";
        selectedIdData.starId = "UNDEFINED"
    }

    static setFrameId (selectedIdData: SelectedIdData, frameId:string) {
        selectedIdData.frameId = frameId;
        selectedIdData.starId = "UNDEFINED"
    }


    static voidFrameId (selectedIdData: SelectedIdData) {
        selectedIdData.frameId = "UNDEFINED";
        selectedIdData.starId = "UNDEFINED"
    }


    static setStarId (selectedIdData: SelectedIdData, starId:string) {
        selectedIdData.starId = starId;
    }

}
