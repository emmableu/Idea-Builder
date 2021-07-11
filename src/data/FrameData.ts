import * as UUID from "uuid";
import {IStarData, StarData} from "./StarData";

export interface IFrameData {
    _id: string;
    backdropId: string;
    starList: Array<IStarData>;
}

export class FrameData implements IFrameData{
    _id: string;
    backdropId: string;
    starList: Array<IStarData>;

    constructor(_id?: string,
                backdropId?:string,
                starList?: Array<IStarData>,
) {
        this._id = _id? _id:UUID.v4();
        this.backdropId = backdropId? backdropId:"EMPTY";
        this.starList = starList? starList:[];
    }

    toJSON (): IFrameData {
        return {
            _id: this._id,
            backdropId: this.backdropId,
            starList: this.starList.map(s => StarData.parse(s)),
        }
    }

    static  parse(frameJSON: any): FrameData {
        console.log("frameJSON: ", frameJSON);
        const frameData = new FrameData(frameJSON._id, frameJSON.backdropId);
        frameData.starList = frameJSON.starList.map((ele:any) => StarData.parse(ele));
        return frameData;
    }
}

