import CardMedia from "@material-ui/core/CardMedia";
import axios from "../../axiosConfig";
import CardActionArea from "@material-ui/core/CardActionArea";
import React from "react";
import { Menu, Dropdown } from 'antd';
import {useDispatch, useSelector} from "react-redux";
import urlExist from "url-exist"
import {deleteFrame, deleteState} from "../../redux/features/projectSlice";
import Card from "@material-ui/core/Card/Card";
import {updateUserActionCounter} from "../../redux/features/frameThumbnailStateSlice";
import {LazyLoadImage} from "react-lazy-load-image-component";

const FrameThumbnail = (props) => {
    const {frameId, frameIndex, handleDelete} = props;
    const imgUpdated = useSelector((state) => state.frameThumbnailState.value.serverActionCounter);
    const isSelected = useSelector(state => state.project.value.selectedId.frameId === frameId);
    const [imgSrc, setImgSrc] = React.useState("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAQAAAAe/WZNAAAADklEQVR42mNkgAJGDAYAAFEABCaLYqoAAAAASUVORK5CYII=");
    const [urlExists, setUrlExists] = React.useState(false);
    const dispatch = useDispatch();



    const menu = (
        <Menu>
            <Menu.Item
                onClick={(e) => {handleDelete(e, frameIndex)}}
            >
                    Delete
            </Menu.Item>
        </Menu>
    );


    const updateSrc = () => {
        if (urlExists) {
            setImgSrc(axios.defaults.baseURL + frameId+`?fakeRender=${imgUpdated.toString()}`)
            return;
        };
        urlExist(axios.defaults.baseURL + frameId).then( exists =>
            {   // console.log("exists: ", exists);
                setUrlExists(exists)}
        )
    }

    React.useEffect(()=> {
        updateSrc()
    }, [isSelected, imgUpdated]);


    React.useEffect(()=> {
        if (urlExists === true){
            setImgSrc(axios.defaults.baseURL + frameId+`?fakeRender=${imgUpdated.toString()}`)
        }
    }, [urlExists]);


    return (
        <>
        <Dropdown overlay={menu} trigger={['contextMenu']}>
        <LazyLoadImage
            src={imgSrc}
            style={{
                width: "100%",
                height: "100%",
                objectFit:"cover"
            }}
        />
        </Dropdown>
        </>
    )
}

export default FrameThumbnail;
