import CardMedia from "@material-ui/core/CardMedia";
import axios from "../../axiosConfig";
import CardActionArea from "@material-ui/core/CardActionArea";
import React from "react";
import {useSelector} from "react-redux";
import urlExist from "url-exist"

const FrameThumbnail = (props) => {
    const {frameData} = props;
    const imgUpdated = useSelector((state) => state.selectedFrame.value.imgUpdated);
    const [imgSrc, setImgSrc] = React.useState("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAQAAAAe/WZNAAAADklEQVR42mNkgAJGDAYAAFEABCaLYqoAAAAASUVORK5CYII=");
    const [urlExists, setUrlExists] = React.useState(false);
    const loadedUrl = axios.defaults.baseURL+frameData._id

    React.useEffect(()=> {
        if (urlExists) {
            setImgSrc(loadedUrl+`?fakeRender=${imgUpdated.toString()}`)
            return;
        };
        urlExist(loadedUrl).then( exists =>
            {   console.log("loadedUrl: ", loadedUrl, "exists: ", exists);
                setUrlExists(exists)}
        )
    }, [imgUpdated]);

    React.useEffect(()=> {
        if (urlExists === true){
            setImgSrc(loadedUrl+`?fakeRender=${imgUpdated.toString()}`)
        }
    }, [urlExists]);


    return (
        <CardMedia
            component='img' src={imgSrc}
        />
    )
}

export default FrameThumbnail;
