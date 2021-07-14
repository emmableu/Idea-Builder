import * as UUID from "uuid";
import {IStarData, StarData} from "./StarData";
import {Star} from "konva/lib/shapes/Star";
import globalConfig from "../globalConfig";

export interface IFrameData {
    _id: string;
    backdropId: string;
    starList: Array<IStarData>;
}

export class FrameData implements IFrameData{
    _id: string;
    backdropId: string;
    starList: Array<StarData>;

    constructor(_id?: string,
                backdropId?:string,
                starList?: Array<StarData>,
) {
        this._id = _id? _id:globalConfig.imageServer.student.frame + UUID.v4() + ".png";
        this.backdropId = backdropId? backdropId:"EMPTY";
        this.starList = starList? starList:[];
    }

    toJSON (): IFrameData {
        return {
            _id: this._id,
            backdropId: this.backdropId,
            starList: this.starList.map(s => s.toJSON()),
        }
    }

    starListJSON() {
        if (this.starList.length > 0) {
            return this.starList.map(s => s.toJSON());
        }
        else {
            return [];
        }
    }

    addStar(prototypeId:string) {
        this.starList.push(new StarData(prototypeId))
        console.log("frame after pushing: ", this.starList);
    }

    deleteStar(starId:string) {
        const starIndex = this.starList.findIndex(s => s._id === starId);
        this.starList.splice(starIndex, 1);
    }

    static  parse(frameJSON: any): FrameData {
        console.log("frameJSON: ", frameJSON);
        const frameData = new FrameData(frameJSON._id, frameJSON.backdropId);
        frameData.starList = frameJSON.starList.map((ele:any) => StarData.parse(ele));
        return frameData;
    }

    static shallowCopy (frameData: FrameData, newId?:string): FrameData {
        let newFrameData;
        if (newId) {
            newFrameData = new FrameData(
                    newId,
            );
        }
        else {
            newFrameData = new FrameData(
                globalConfig.imageServer.student.frame + UUID.v4() + ".png"
            );
        }
        newFrameData.backdropId = globalConfig.imageServer.student.backdrop + UUID.v4() + ".png";

        newFrameData.starList = frameData.starList.map((ele:any) => StarData.shallowCopy(ele));
        return newFrameData;
    }
}

