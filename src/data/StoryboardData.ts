import {IFrameData, FrameData} from "./FrameData";
import * as UUID from "uuid";

export interface IStoryboardData {
    _id: string;
    name: string;
    frameList: Array<IFrameData>
    note:string;
}

export class StoryboardData implements IStoryboardData {
    _id: string;
    name: string = "";
    frameList: Array<FrameData> = [];
    note:string;


    constructor(storyboardId?: string, name?:string, order?:number, frameList?:Array<FrameData>,
                note?:string,
    ) {
        this._id = storyboardId? storyboardId:UUID.v4();
        this.name = name? name:"Untitled";
        this.frameList = frameList? frameList:[new FrameData()]
        this.note = note? note:"**Enter your notes here:**";
    }

    addFrame(newId:string, prevIndex:number) {
        if (prevIndex === -1) {
            this.frameList.splice(
                0, 0, new FrameData(newId)
            )
            return;
        }
        const prevFrame = this.frameList[prevIndex];
        this.frameList.splice(prevIndex+1,
            0,
            FrameData.shallowCopy(prevFrame, newId),
        )
    }

    getFrame (frameId:string) {
        return this.frameList.find(f => f._id === frameId);
    }

    toJSON ():IStoryboardData {
        return {
            _id: this._id,
            name: this.name,
            frameList: this.frameList.map(s => s.toJSON()),
            note:this.note,
        }
    }

    static  parse(storyboardJSON: any): StoryboardData {
        console.log("storyboardJSON: ", storyboardJSON);
        const storyboardData = new StoryboardData(storyboardJSON._id, storyboardJSON.name);
        storyboardData.frameList = storyboardJSON.frameList.map((ele:any) => FrameData.parse(ele));
        storyboardData.note = storyboardJSON.note;
        return storyboardData;
    }

}
