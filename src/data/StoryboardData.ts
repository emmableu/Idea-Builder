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
        this.name = name? name:"";
        this.frameList = frameList? frameList:[]
    }

    addFrame(frameId:string) {
        this.frameList.push(new FrameData(frameId))
    }

    toJSON ():IStoryboardData {
        return {
            _id: this._id,
            name: this.name,
            frameList: this.frameList.map(s => s.toJSON()),
        }
    }

    static  parse(storyboardJSON: any): StoryboardData {
        console.log("storyboardData: ", storyboardJSON);
        const storyboardData = new StoryboardData(storyboardJSON._id, storyboardJSON.name);
        storyboardJSON.frameList.forEach(
            (s: { _id: string | undefined; name: string | undefined; }) => {
                storyboardData.frameList.push(new FrameData(
                    s._id, s.name
                ));
            })
        return storyboardData;
    }
}
