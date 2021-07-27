import * as UUID from "uuid";
import {StarData, StarDataHandler} from "./StarData";
import globalConfig from "../globalConfig";

export interface FrameData {
    _id: string;
    backdropStar: {
        prototypeId: string,
        _id: string,
    };
    starList: Array<StarData>;
}

export class FrameDataHandler{

    static initializeFrame(_id?: string,
                backdropStar?: {
                    prototypeId: string,
                    _id: string,
                },
                starList?: Array<StarData>,
    ) : FrameData
    {
        const frameId = _id? _id:globalConfig.imageServer.student.frame + UUID.v4() + ".png";
        const frameBackdropStar = backdropStar? backdropStar:{
            prototypeId: "UNDEFINED",
            _id: "UNDEFINED",
        };
        const frameStarList = starList? starList:[];
        return {
            _id: frameId,
            backdropStar: frameBackdropStar,
            starList: frameStarList,
        }
    }


    static addStar(
        frameData:FrameData,
        prototypeId:string
    ) {
        frameData.starList.push(StarDataHandler.initializeStar(prototypeId))
    }

    static deleteStar(
        frameData:FrameData,
        starId:string)
    {
        const starIndex = frameData.starList.findIndex(s => s._id === starId);
        frameData.starList.splice(starIndex, 1);
    }

    static shallowCopy (frameData: FrameData, newId?:string): FrameData {
        let newFrameData;
        if (newId) {
            newFrameData =  FrameDataHandler.initializeFrame(
                    newId,
            );
        }
        else {
            newFrameData = FrameDataHandler.initializeFrame(
                globalConfig.imageServer.student.frame + UUID.v4() + ".png"
            );
        }
        if (frameData.backdropStar._id === "UNDEFINED" || frameData.backdropStar.prototypeId === "UNDEFINED" ){
            newFrameData.backdropStar = {
                _id: "UNDEFINED",
                prototypeId: "UNDEFINED",
            }
        }
        else {
            newFrameData.backdropStar = {
                _id: globalConfig.imageServer.student.backdrop + UUID.v4() + ".png",
                prototypeId: frameData.backdropStar.prototypeId,
            }
        }

        newFrameData.starList = frameData.starList.map((ele:any) => StarDataHandler.shallowCopy(ele));
        return newFrameData;
    }

    static acquireFrame (selectedFrame:FrameData, templateFrame:FrameData) {
        selectedFrame.backdropStar = {
            _id: globalConfig.imageServer.student.backdrop + UUID.v4() + ".png",
            prototypeId: templateFrame.backdropStar.prototypeId,
        }
        const newStarList = templateFrame.starList.map((ele:any) => StarDataHandler.shallowCopy(ele));
        selectedFrame.starList.push(...newStarList);
    }


}

