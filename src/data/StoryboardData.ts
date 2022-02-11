import {FrameData, FrameDataHandler} from "./FrameData";
import * as UUID from "uuid";

export interface StoryboardData {
    _id: string;
    name: string;
    frameList: Array<FrameData>
    note:string;
    recommendName: string;
    originalCostumes: Array<any>;
    currentCostumes: Array<any>;
}





export class StoryboardDataHandler {

    static initializeStoryboard
    (storyboardData:StoryboardData)
    {
        // {_id?: string, name?:string, order?:number, frameList?:Array<FrameData>,
        //     note?:string, isRecommand?:boolean,}
        const {_id, name, frameList, note, recommendName, originalCostumes, currentCostumes} = storyboardData;

        const storyboardId = _id? _id:UUID.v4();
        const storyboardName = name? name:"Untitled";
        const storyboardFrameList = frameList? frameList:[FrameDataHandler.initializeFrame()]
        const storyboardNote = note? note:"Key changes between the begin and end frame:";
        const storyboardRecommendName = recommendName? recommendName:"Non-Recommend";
        const storyboardOriginalCostumes = originalCostumes? originalCostumes:[];
        const storyboardCurrentCostumes = currentCostumes? currentCostumes:[];

        return {
            _id: storyboardId,
            name: storyboardName,
            frameList: storyboardFrameList,
            note: storyboardNote,
            recommendName: storyboardRecommendName,
            originalCostumes: storyboardOriginalCostumes,
            currentCostumes: storyboardCurrentCostumes,
        }
    }


    static deepCopy(storyboardData: StoryboardData) {
        const {name, frameList, note, recommendName, originalCostumes, currentCostumes} = storyboardData;
        const storyboardId = UUID.v4();
        const storyboardName = name;
        const storyboardNote = note;
        const storyboardFrameList = [];
        const storyboardOriginalCostumes = originalCostumes? originalCostumes:[];
        const storyboardCurrentCostumes = currentCostumes? currentCostumes:[];
        for (const frame of frameList) {
            storyboardFrameList.push(FrameDataHandler.deepCopy(frame))
        }
        return {
            _id: storyboardId,
            name: storyboardName,
            frameList: storyboardFrameList,
            note: storyboardNote,
            recommendName: recommendName? recommendName:"Non-Recommend",
            originalCostumes: storyboardOriginalCostumes,
            currentCostumes: storyboardCurrentCostumes,
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
