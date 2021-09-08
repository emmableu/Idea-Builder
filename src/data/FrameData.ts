import * as UUID from "uuid";
import {StarData, StarDataHandler} from "./StarData";
import globalConfig from "../globalConfig";

export interface FrameData {
    _id: string;
    backdropStar: {
        prototypeId: string | null,
        _id: string | null,
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
            prototypeId: null,
            _id: null,
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
        actorId: string,
        prototypeId:string
    ) {
        frameData.starList.push(StarDataHandler.initializeStar({
            actorId,
            prototypeId
        }))
    }

    static deleteStar(
        frameData:FrameData,
        starId:string)
    {
        const starIndex = frameData.starList.findIndex(s => s._id === starId);
        frameData.starList.splice(starIndex, 1);
    }

    static copyStar(
        frameData:FrameData,
        starData: StarData,
        newStarId: string,)
    {
        const newStar = StarDataHandler.initializeStar({
            prototypeId: starData.prototypeId,
            _id: newStarId,
            x: starData.x+20,
            y: starData.y+20,
            width: starData.width,
            height: starData.height,
            transform: starData.transform,
            actorId: starData.actorId,
        });
        frameData.starList.push(newStar);
    }

    static deepCopy (frameData: FrameData, newId?:string, copyMotion?:false,
    ): FrameData {
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
        if (frameData.backdropStar._id === null ){
            newFrameData.backdropStar = {
                _id: null,
                prototypeId: null,
            }
        }
        else {
            newFrameData.backdropStar = {
                _id: globalConfig.imageServer.student.backdrop + UUID.v4() + ".png",
                prototypeId: frameData.backdropStar.prototypeId,
            }
        }

        newFrameData.starList = frameData.starList.map((ele:any) => StarDataHandler.deepCopy(ele, copyMotion));
        return newFrameData;
    }

    static acquireFrame (selectedFrame:FrameData, templateFrame:FrameData) {
        selectedFrame.backdropStar = {
            _id: globalConfig.imageServer.student.backdrop + UUID.v4() + ".png",
            prototypeId: templateFrame.backdropStar.prototypeId,
        }
        const newStarList = templateFrame.starList.map((ele:any) => StarDataHandler.deepCopy(ele));
        selectedFrame.starList.push(...newStarList);
    }


}

