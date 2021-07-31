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


const snapshotHeight = 0.15*window.innerHeight;

const useStyles = makeStyles((theme) => ({
    // highlighted: {
    //     backgroundColor: "pink"
    // },
    grid: {
    },
    box: {
        overflow: "auto",
        height: "100%",
        margin: "0 0",
        width: "100%",
        "--background": "rgba(0, 0, 0, .15)",
        "--size": "7px",
        "backgroundImage":`
                linear-gradient(to right, var(--background) var(--size), transparent var(--size)),
                linear-gradient(to bottom, var(--background) var(--size), transparent var(--size)),
                linear-gradient(to right, var(--background) var(--size), transparent var(--size)),
                linear-gradient(to bottom, var(--background) var(--size), transparent var(--size)),
                linear-gradient(to bottom, transparent var(--size), var(--background) var(--size))`,
        "backgroundSize": `calc(var(--size) * 2) var(--size), calc(var(--size) * 2) var(--size), calc(var(--size) * 2) var(--size), calc(var(--size) * 2) var(--size), 100% calc(100% - var(--size) * 3)`,
        "backgroundRepeat": "repeat-x",
        "backgroundPosition": "0 var(--size), top left, 0 calc(100% - var(--size)), bottom left, 0 var(--size)",
        "padding": "calc(var(--size) * 3) calc(var(--size) * 2.5)",
        "boxSizing": "border-box",
    },
    paper: {
      height: globalConfig.responsiveSizeData.frameListHeight*0.75,
        backgroundColor: "white",
        width: globalConfig.responsiveSizeData.frameListHeight*0.75*4/3
    },

}));

const FrameList = () => {
    const classes = useStyles();
    const _id = useSelector((state) => state.project.value.selectedId.frameId);


    const storyboardId = useSelector(state => state.project.value.selectedId.storyboardId);


    // const [frameList, setFrameList] = React.useState([]);
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
            console.log("to delete id ", frameList[frameIndex]._id, "is the same as ", frameId);
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

    return (<>
                    <Grid container wrap="nowrap" justify="flex-start" alignItems="center" spacing={3}
                          className={classes.box}>
                        {frameList.map((frameData, i) => (
                            <Grid className={classes.grid} item key={i}>
                                <Card variant="outlined"
                                      className={classes.paper}
                                      style={{
                                          border: frameData._id===_id? "2px solid orange":"1px solid #e0e0e0"
                                      }}
                                >
                                    <CardActionArea onClick={(e) => {
                                        dispatch(setSelectedFrameId(frameData._id));
                                    }}>

                                        <FrameThumbnail
                                            key={frameData._id}
                                            frameId={frameData._id}
                                            frameIndex={i}
                                            handleDelete={handleDeleteFrame}
                                        />

                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                        <Grid item xs={2} align="middle">
                            <Fab color="default" aria-label="add"
                                 onClick={(e) =>{ handleAddFrame(e)}}
                            >
                                <AddIcon />
                            </Fab>
                        </Grid>

                    </Grid>
            </>);
};

export default FrameList
