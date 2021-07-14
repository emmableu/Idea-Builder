import CardMedia from "@material-ui/core/CardMedia";
import axios from "../../axiosConfig";
import CardActionArea from "@material-ui/core/CardActionArea";
import React from "react";
import {useSelector} from "react-redux";
import urlExist from "url-exist"

const FrameThumbnail = (props) => {
    const {frameData} = props;
    const imgUpdated = useSelector((state) => state.frameThumbnailState.value.serverActionCounter);
    const isSelected = useSelector(state => state.project.value.selectedId.frameId === frameData._id)
    const [imgSrc, setImgSrc] = React.useState("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAQAAAAe/WZNAAAADklEQVR42mNkgAJGDAYAAFEABCaLYqoAAAAASUVORK5CYII=");
    const [urlExists, setUrlExists] = React.useState(false);


    const updateSrc = () => {
        if (urlExists) {
            setImgSrc(axios.defaults.baseURL + frameData._id+`?fakeRender=${imgUpdated.toString()}`)
            return;
        };
        urlExist(axios.defaults.baseURL + frameData._id).then( exists =>
            {   console.log("exists: ", exists);
                setUrlExists(exists)}
        )
    }

    React.useEffect(()=> {
        updateSrc()
    }, [isSelected, imgUpdated]);


    React.useEffect(()=> {
        if (urlExists === true){
            setImgSrc(axios.defaults.baseURL + frameData._id+`?fakeRender=${imgUpdated.toString()}`)
        }
    }, [urlExists]);


    return (
        <CardMedia
            component='img' src={imgSrc}
        />
    )
}

export default FrameThumbnail;
