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
import {addFrame} from "../../redux/features/projectSlice";
import {setSelectedFrameId} from "../../redux/features/selectedFrameSlice";
import globalConfig from "../../globalConfig";
import FrameThumbnail from "./FrameThumbnail";
import {setSelectedStar} from "../../redux/features/selectedStarSlice";


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
    const _id = useSelector((state) => state.selectedFrame.value._id);


    const [storyboardId, setStoryboardId] = React.useState(null);
    const selectedStoryboard = useSelector(state => state.selectedStoryboard.value);
    React.useEffect(
        () => setStoryboardId(selectedStoryboard), [selectedStoryboard]
    )

    const [frameList, setFrameList] = React.useState([]);
    const frameListString = useSelector(state => JSON.stringify(state.project.value.frameListJSON(storyboardId)));

    React.useEffect(
        () => {
            // console.log("--------------usEffECT")
            setFrameList(JSON.parse(frameListString))}
    , [frameListString])

    const dispatch = useDispatch();

    const handleAddFrame = (e) => {
        dispatch(addFrame());
    }

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
                                        dispatch(setSelectedStar(null));
                                    }}>

                                        <FrameThumbnail
                                            frameData={frameData}
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
