import {StoryboardData} from "./StoryboardData";

export class SelectedIdData {
    storyboardId: string;
    frameId: string;
    starId: string;

    constructor (
        storyboardId?:string,
        frameId?:string,
        starId?:string
    ) {
        this.storyboardId = storyboardId?storyboardId:"UNDEFINED";
        this.frameId = frameId?frameId:"UNDEFINED";
        this.starId = starId?starId:"UNDEFINED"
    }


    toJSON () {
        return {
            storyboardId: this.storyboardId,
            frameId: this.frameId,
            starId: this.starId,
        }
    }

    static parse(selectedJSON:any) {
        return new SelectedIdData(
            selectedJSON.storyboardId,
            selectedJSON.frameId,
            selectedJSON.starId,
        )
    }

    setStoryboardId (storyboardData: StoryboardData) {
        this.storyboardId = storyboardData._id;
        this.frameId = storyboardData.frameList[0]._id;
        this.starId = "UNDEFINED"
    }

    voidStoryboardId () {
        this.storyboardId = "UNDEFINED";
        this.frameId = "UNDEFINED";
        this.starId = "UNDEFINED"
    }

    setFrameId (frameId:string) {
        this.frameId = frameId;
        this.starId = "UNDEFINED"
    }

    setStarId (starId:string) {
        this.starId = starId;
    }

}
