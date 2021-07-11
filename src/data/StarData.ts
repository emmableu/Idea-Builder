import * as UUID from "uuid";

export interface IStarData {
    _id: string;
    x: number;
    y: number;
    width: number;
    height: number;
}


export class StarData implements IStarData{
    _id: string;
    x: number;
    y: number;
    width: number;
    height: number;

    constructor(_id?: string,
                x?:number,
                y?:number,
                width?:number,
                height?:number,
    ) {
        this._id = _id? _id:UUID.v4();
        this.x = x? x:0;
        this.y = y? y:0;
        this.width = width? width:100;
        this.height = height? height:100;
    }

    toJSON (): IStarData {
        return {
            _id: this._id,
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
        }
    }

    static parse (starJSON:IStarData): StarData {
        return new StarData(
            starJSON._id,
            starJSON.x,
            starJSON.y,
            starJSON.width,
            starJSON.height,
        )
    }
}
