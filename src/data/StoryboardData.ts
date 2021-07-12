import {IFrameData, FrameData} from "./FrameData";
import * as UUID from "uuid";

export interface IStoryboardData {
    _id: string;
    name: string;
    frameList: Array<IFrameData>
}

export class StoryboardData implements IStoryboardData {
    _id: string;
    name: string = "";
    frameList: Array<FrameData> = [];

    constructor(storyboardId?: string, name?:string, order?:number, frameList?:Array<FrameData>) {
        this._id = storyboardId? storyboardId:UUID.v4();
        this.name = name? name:"Untitled";
        this.frameList = frameList? frameList:[new FrameData()]
    }

    addFrame(frameId:string) {
        this.frameList.push(new FrameData(frameId))
    }

    getFrame (frameId:string) {
        return this.frameList.find(f => f._id === frameId);
    }

    toJSON ():IStoryboardData {
        return {
            _id: this._id,
            name: this.name,
            frameList: this.frameList.map(s => s.toJSON()),
        }
    }

    static  parse(storyboardJSON: any): StoryboardData {
        console.log("storyboardJSON: ", storyboardJSON);
        const storyboardData = new StoryboardData(storyboardJSON._id, storyboardJSON.name);
        storyboardData.frameList = storyboardJSON.frameList.map((ele:any) => FrameData.parse(ele));
        return storyboardData;
    }
}
