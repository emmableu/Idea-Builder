import {FrameData, FrameDataHandler} from "./FrameData";
import * as UUID from "uuid";

export interface StoryboardData {
    _id: string;
    name: string;
    frameList: Array<FrameData>
    note:string;
    recommendName: string;
}





export class StoryboardDataHandler {

    static initializeStoryboard
    (storyboardData:StoryboardData)
    {
        // {_id?: string, name?:string, order?:number, frameList?:Array<FrameData>,
        //     note?:string, isRecommand?:boolean,}
        const {_id, name, frameList, note, recommendName} = storyboardData;

        const storyboardId = _id? _id:UUID.v4();
        const storyboardName = name? name:"Untitled";
        const storyboardFrameList = frameList? frameList:[FrameDataHandler.initializeFrame()]
        const storyboardNote = note? note:"Key changes between the begin and end frame:";
        const storyboardRecommendName = recommendName? recommendName:"Non-Recommend";

        return {
            _id: storyboardId,
            name: storyboardName,
            frameList: storyboardFrameList,
            note: storyboardNote,
            recommendName: storyboardRecommendName,
        }
    }


    static deepCopy(storyboardData: StoryboardData) {
        const {name, frameList, note, recommendName} = storyboardData;
        const storyboardId = UUID.v4();
        const storyboardName = name;
        const storyboardNote = note;
        const storyboardFrameList = [];
        for (const frame of frameList) {
            storyboardFrameList.push(FrameDataHandler.deepCopy(frame))
        }
        return {
            _id: storyboardId,
            name: storyboardName,
            frameList: storyboardFrameList,
            note: storyboardNote,
            recommendName: recommendName? recommendName:"Non-Recommend",
        }
    }

    static addFrame(storyboardData:StoryboardData, newId:string, prevIndex:number) {
        if (prevIndex === -1) {
            storyboardData.frameList.splice(
                0, 0, FrameDataHandler.initializeFrame(newId)
            )
            return;
        }
        const prevFrame = storyboardData.frameList[prevIndex];
        storyboardData.frameList.splice(prevIndex+1,
            0,
            FrameDataHandler.deepCopy(prevFrame, newId, false),
        )
    }

    static getFrame (storyboardData:StoryboardData, frameId:string) {
        return storyboardData.frameList.find(f => f._id === frameId);
    }


}
