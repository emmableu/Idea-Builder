import * as UUID from "uuid";

export interface BackdropData {
    _id: string;
    name: string;
}

export class BackdropDataHandler {

    static initializeBackdrop
    (backdropId?: string, name?:string, order?:number)
    : BackdropData
    {
        return {
            _id: backdropId? backdropId: UUID.v4(),
            name: name? name: "Untitled",
        }
    }

}

