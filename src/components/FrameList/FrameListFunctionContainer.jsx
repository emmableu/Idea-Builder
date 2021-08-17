import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import FrameCardContainer from "../Frame/FrameCardContainer";
import React from "react";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import axios from "../../axiosConfig";
import { useSelector } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CardActionArea from '@material-ui/core/CardActionArea';
import {useDispatch} from 'react-redux';
import Box from '@material-ui/core/Box';
import * as UUID from "uuid"
import {
    addFrame,
    deleteFrame,
    setSelectedFrameIdInMemory,
    updateFrameListInMemory
} from "../../redux/features/projectSlice";
import {setSelectedFrameId} from "../../redux/features/projectSlice";
import globalConfig from "../../globalConfig";
import FrameThumbnail from "./FrameThumbnail";
import {setSelectedStarId} from "../../redux/features/projectSlice";
import {ProjectDataHandler} from "../../data/ProjectData";
import StaticFrame from "../Frame/StaticFrame";
import StaticFrameContainer from "../Frame/StaticFrameContainer";
import {Dropdown} from "antd";
import FrameList from "./FrameList";


const FrameListFunctionContainer = () => {
    const _id = useSelector((state) => state.project.value.selectedId.frameId);
    const storyboardId = useSelector(state => state.project.value.selectedId.storyboardId);
    const frameList = useSelector(state =>
        ProjectDataHandler.getStoryboard(
            state.project.value, storyboardId
        ).frameList

        );


    const dispatch = useDispatch();

    const handleAddFrame = (e) => {
        dispatch(addFrame());
    }

    const handleDeleteFrame = (e, frameIndex) => {
        e.stopPropagation();
        if (frameList[frameIndex]._id === _id) {
            if (frameIndex < frameList.length - 1) {
                dispatch(setSelectedFrameIdInMemory(frameList[frameIndex+1]._id));
            }
            else if (frameList.length === 1 ) {
                dispatch(setSelectedFrameIdInMemory(null));
            }
            else if (frameIndex === frameList.length - 1) {
                dispatch(setSelectedFrameIdInMemory(frameList[frameIndex - 1]._id));
            }
        }
        dispatch(deleteFrame(frameIndex));
    }

    return (<FrameList
        _id={_id}
        frameList={frameList}
        handleAdd={handleAddFrame}
        handleDelete={handleDeleteFrame}
    />);
};

export default FrameListFunctionContainer
