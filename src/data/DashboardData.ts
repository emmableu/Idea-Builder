export class DashboardData {
    _id: string;
    projectMap: {
        [key:string]: {
            name: string
        }
    };

    constructor (_id:string, projectMap?:{
                    [key:string]: {
                        name: string } })
    {
        this._id = _id;
        this.projectMap = projectMap? projectMap:{};
    }

    toJSON () {
        return {
            _id: this._id,
            projectMap: this.projectMap,
        }
    }

    toString () {
        return JSON.stringify(this.toJSON())
    }

}
