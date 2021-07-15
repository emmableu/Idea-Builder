import * as UUID from "uuid";

export interface IStarData {
    _id: string;
    prototypeId: string;
    x: number;
    y: number;
    width: number;
    height: number;
    transform: any;
}


export class StarData implements IStarData{
    _id: string;
    prototypeId:string;
    x: number;
    y: number;
    width: number;
    height: number;
    transform: any;

    constructor(prototypeId:string,
                _id?: string,
                x?:number,
                y?:number,
                width?:number,
                height?:number,
                transform?:any,
    ) {
        this.prototypeId = prototypeId;
        this._id = _id? _id:UUID.v4();
        this.x = x? x:0;
        this.y = y? y:0;
        this.width = width? width:100;
        this.height = height? height:100;
        this.transform=transform?this.transform:null;
    }

    toJSON (): IStarData {
        return {
            _id: this._id,
            prototypeId: this.prototypeId,
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            transform:this.transform,
        }
    }

    static parse (starJSON:IStarData): StarData {
        return new StarData(
            starJSON.prototypeId,
            starJSON._id,
            starJSON.x,
            starJSON.y,
            starJSON.width,
            starJSON.height,
            starJSON.transform
        );
    }

    static shallowCopy (starData:StarData): StarData {
        return new StarData(
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
