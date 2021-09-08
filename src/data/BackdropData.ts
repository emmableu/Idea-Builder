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
        let newId;
        if (!backdropId) {
            newId = UUID.v4();
        }
        else{
            newId = backdropId.split("?")[0]
        }
        return {
            _id: newId + "?" + UUID.v4(),
            name: name? name: "Untitled",
        }
    }


    static deepCopy(backdropData: BackdropData):BackdropData  {
        const {_id, name} = backdropData;
        const newId = _id.split("?")[0] + "?" + UUID.v4();
        return {
            _id: newId,
            name: name,
        }
    }

}

