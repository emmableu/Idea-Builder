import moment from "moment";
// @ts-ignore
import Cookies from "js-cookie";

export interface AuthorData {
    _id: string; //this is the same as the project id;
    lastModified: string;
    lastModifiedBy: string;
}



export class AuthorDataHandler {
    static initializeAuthor (obj:any) : AuthorData {
        let {_id, lastModified, lastModifiedBy} = obj;
        lastModified = lastModified? lastModified:moment().format();
        lastModifiedBy = lastModifiedBy? lastModifiedBy:Cookies.get("userId");
        return {_id, lastModified, lastModifiedBy}
    }

    static parse (obj:any) {
        let {_id, lastModified, lastModifiedBy} = obj;
        lastModified = moment(lastModified).format();
        // lastLoaded = moment(lastLoaded, 'YYYY-MM-DD[T00:00:00.000Z]');
        return {_id, lastModified, lastModifiedBy,}
    }
}
