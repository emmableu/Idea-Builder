import * as UUID from "uuid";

export interface StarData {
    _id: string;
    prototypeId: string;
    x: number;
    y: number;
    width: number;
    height: number;
    transform: any;
}


export class StarDataHandler {

    static initializeStar (prototypeId:string,
                _id?: string,
                x?:number,
                y?:number,
                width?:number,
                height?:number,
                transform?:any,
    ) : StarData
    {
        return {
            prototypeId: prototypeId,
            _id: _id? _id:UUID.v4(),
            x : x? x:0,
            y : y? y:0,
            width : width? width:100,
            height : height? height:100,
            transform:transform?transform:null,
        }
    }


    static shallowCopy (starData:StarData): StarData {
        return StarDataHandler.initializeStar(
            starData.prototypeId,
            UUID.v4(),
            starData.x,
            starData.y,
            starData.width,
            starData.height,
            starData.transform
        );
    }
}
