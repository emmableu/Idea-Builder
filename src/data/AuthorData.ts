import moment from "moment";
// @ts-ignore
import Cookies from "js-cookie";

export interface AuthorData {
    _id: string; //this is the same as the project id;
    lastModified: string;
    lastModifiedBy: string;
    lastLoaded: string;
    lastLoadedBy: string;
}



export class AuthorDataHandler {
    static initializeAuthor (obj:any) : AuthorData {
        let {_id, lastModified, lastModifiedBy, lastLoaded, lastLoadedBy} = obj;
        lastModified = lastModified? lastModified:moment();
        lastModifiedBy = lastModifiedBy? lastModifiedBy:Cookies.get("userId");
        lastLoaded = lastLoaded? lastLoaded:moment();
        lastLoadedBy = lastLoadedBy? lastLoadedBy:Cookies.get("userId");
        return {_id, lastModified, lastModifiedBy, lastLoaded, lastLoadedBy}
    }

    static parse (obj:any) {
        let {_id, lastModified, lastModifiedBy} = obj;
        lastModified = moment(lastModified, 'YYYY-MM-DD[T00:00:00.000Z]');
        // lastLoaded = moment(lastLoaded, 'YYYY-MM-DD[T00:00:00.000Z]');
        return {_id, lastModified, lastModifiedBy,}
    }


    static format (obj:any) {
        let {_id, lastModified, lastModifiedBy} = obj;
        lastModified = lastModified.format('YYYY-MM-DD[T00:00:00.000Z]');
        // lastLoaded = lastLoaded.format('YYYY-MM-DD[T00:00:00.000Z]');
        return {_id, lastModified, lastModifiedBy};
    }
}
