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
import {addFrame, deleteFrame} from "../../redux/features/projectSlice";
import {setSelectedFrameId} from "../../redux/features/projectSlice";
import globalConfig from "../../globalConfig";
import FrameThumbnail from "./FrameThumbnail";
import {setSelectedStarId} from "../../redux/features/projectSlice";


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
    },
    paper: {
      height: globalConfig.frameListHeight*0.75,
        backgroundColor: "white",
        width: globalConfig.frameListHeight*0.75*4/3
    },

}));

const FrameList = () => {
    const classes = useStyles();
    const _id = useSelector((state) => state.project.value.selectedId.frameId);


    const storyboardId = useSelector(state => state.project.value.selectedId.storyboardId);


    // const [frameList, setFrameList] = React.useState([]);
    const frameList = useSelector(state =>
        state.project.value.getStoryboard(storyboardId).frameList);



    // React.useEffect(
    //     () => {
    //         // console.log("--------------usEffECT, framelIST: ", frameList, frameListString, JSON.parse(frameListString));
    //         setFrameList(JSON.parse(frameListString))
    //         // console.log("--------------usEffECT, framelIST: ", frameList);
    //     }
    // , [frameListString])

    const dispatch = useDispatch();

    const handleAddFrame = (e) => {
        dispatch(addFrame());
    }

    const handleDeleteFrame = async (e, frameIndex) => {
        // // console.log("deleting:: : ", frameId)
        // dispatch(deleteFrame
        //     (frameIndex)
        // );
        await dispatch(deleteFrame(frameIndex));
        // setTimeout(() => {
            // const frameList = JSON.parse(frameListString);
        // console.log("frameIndex, frameList: ", frameIndex, frameList);
        if (frameIndex < frameList.length) {
            dispatch(setSelectedFrameId(frameList[frameIndex]._id));
        }
        else if (frameList.length === 0 ) {
            dispatch(setSelectedFrameId("UNDEFINED"));
        }
        else if (frameIndex === frameList.length) {
            dispatch(setSelectedFrameId(frameList[frameIndex - 1]._id));
        }
        // }, 1000)
    }

    React.useEffect(() => {
        // console.log("selected frame id updated: ", _id)
        // console.log("frameList: ", frameList);
    }, [_id])

    return (<>
                    <Grid container wrap="nowrap" justify="flex-start" alignItems="center" spacing={3} className={classes.box}>
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
