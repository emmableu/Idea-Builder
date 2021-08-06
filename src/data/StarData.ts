import * as UUID from "uuid";

export interface StarData {
    _id: string;
    prototypeId: string;
    type:string;
    actorId: string;
    x: number;
    y: number;
    width: number;
    height: number;
    transform: any;
    childStar: ChildStarData;
}

export interface ChildStarData {
    speechStar: SpeechChildStarData | null;
    lineStar: LineChildStarData | null;
    motionStarList: Array<MotionChildStarData>;
}

export interface SpeechChildStarData {
    _id: string;
    prototypeId: string;
    type:string; //speech
    x: number;
    y: number;
    width: number;
    height: number;
    transform: any;
}

export interface LineChildStarData {
    _id: string;
    points: Array<number>;
}


export interface MotionChildStarData {
    //motion child star has another property called opacity
    _id: string;
    prototypeId: string;
    type:"motion";
    x: number;
    y: number;
    width: number;
    height: number;
    transform: any;
    opacity:number;
}


export class StarDataHandler {

    static initializeStar (obj:any
    ) : StarData
    {
        const {prototypeId, _id, x, y, width, height, transform, actorId, type, childStar} = obj;
        return {
            prototypeId: prototypeId,
            actorId:actorId,
            _id: _id? _id:UUID.v4(),
            type: type?type:"actor",
            x : x? x:0,
            y : y? y:0,
            width : width? width:100,
            height : height? height:100,
            transform:transform?transform:null,
            childStar: childStar? childStar: {
                speechStar: null,
                lineStar: null,
                motionStarList: [],
            },
        }
    }

    static isChildStarEmpty (starData:StarData):boolean {
        const {speechStar, lineStar, motionStarList} = starData.childStar;
        if (speechStar !== null){
            return false;
        }
        if (lineStar !== null) {
            return false;
        }
        if (motionStarList.length !== 0) {
            return false;
        }
        return true;
    }


    static initializeSpeechChildStar (obj:any
    ) : SpeechChildStarData
    {
        const {prototypeId, _id, x, y, width, height, transform, type} = obj;
        return {
            prototypeId: prototypeId,
            _id: _id? _id:UUID.v4(),
            type: type?type:"speech",
            x : x? x:0,
            y : y? y:0,
            width : width? width:100,
            height : height? height:100,
            transform:transform?transform:null,
        }
    }

    static initializeMotionChildStar (obj:any
    ) : MotionChildStarData
    {
        const {prototypeId, _id, x, y, width, height, transform, type, opacity} = obj;
        return {
            prototypeId: prototypeId,
            _id: _id? _id:UUID.v4(),
            type: type?type:"actor",
            x : x? x:0,
            y : y? y:0,
            width : width? width:100,
            height : height? height:100,
            transform:transform?transform:null,
            opacity: opacity?opacity:0,
        }
    }

    static shallowCopyChildStar (childStarData:ChildStarData): ChildStarData {
        const newChildStar = {speechStar: null,
            lineStar: null,
            motionStarList: []}
        if (childStarData.speechStar !== null){
            // @ts-ignore
            newChildStar.speechStar = {
                ...childStarData.speechStar,
                _id: UUID.v4(),
            }
        }
        if (childStarData.lineStar !== null){
            // @ts-ignore
            newChildStar.lineStar = {
                ...childStarData.lineStar,
                _id: UUID.v4(),
            }
        }
        if (childStarData.motionStarList.length > 0) {
            // @ts-ignore
            newChildStar.motionStarList = childStarData.motionStarList.map(
                m => (
                    {
                        ...m,
                        _id: UUID.v4(),
                    }
                )
            )
        }
        return newChildStar;

    }
    static shallowCopy (starData:StarData): StarData {
        return StarDataHandler.initializeStar(
            {
                prototypeId: starData.prototypeId,
                _id: UUID.v4(),
                type: starData.type,
                actorId: starData.actorId,
                x: starData.x,
                y: starData.y,
                width: starData.width,
                height: starData.height,
                transform: starData.transform,
                childStar: StarDataHandler.shallowCopyChildStar(starData.childStar),
            }
        );
    }
}
