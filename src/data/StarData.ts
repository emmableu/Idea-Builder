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
    childStarList: Array<ChildStarData>;
}

export interface ChildStarData {
    _id: string;
    prototypeId: string;
    type:string; //speech or resource
    x: number;
    y: number;
    width: number;
    height: number;
    transform: any;
    parentStarId: string;
}

//because speechbubble does not have a prototype, for speechbubbles, their child id is the same as their prototype id.
//childstardata's actor id inherits from its parents.


export class StarDataHandler {

    static initializeStar (obj:any
    ) : StarData
    {
        const {prototypeId, _id, x, y, width, height, transform, actorId, type, childStarList} = obj;
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
            childStarList: childStarList?childStarList:[],
        }
    }


    static initializeChildStar (obj:any
    ) : ChildStarData
    {
        const {prototypeId, _id, x, y, width, height, transform, type, parentStarId} = obj;
        return {
            prototypeId: prototypeId,
            parentStarId:parentStarId,
            _id: _id? _id:UUID.v4(),
            type: type?type:"actor",
            x : x? x:0,
            y : y? y:0,
            width : width? width:100,
            height : height? height:100,
            transform:transform?transform:null,
        }
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
                childStarList: starData.childStarList,
            }
        );
    }
}
