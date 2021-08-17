import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import FrameCardContainer from "../Frame/FrameCardContainer";
import React from "react";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { useSelector } from 'react-redux';
import globalConfig from "../../globalConfig";
import {ProjectDataHandler} from "../../data/ProjectData";
import FrameThumbnail from "../FrameList/FrameThumbnail";



const useStyles = makeStyles((theme) => ({

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

const StaticFrameList = (props) => {
    const {storyboardData} = props;
    const classes = useStyles();
    const frameList = storyboardData.frameList;

    return (<>
        <Grid container wrap="nowrap" justify="flex-start" alignItems="center" spacing={3}
              className={classes.box}>
            {frameList.map((frameData, i) => (
                <Grid className={classes.grid} item key={i}>
                    <Card variant="outlined"
                          className={classes.paper}
                          style={{
                              border:"1px solid #e0e0e0"
                          }}
                    >
                        <CardMedia>
                            <FrameThumbnail
                                key={frameData._id}
                                frameId={frameData._id}
                                frameIndex={i}
                                handleDelete={null}
                            />

                        </CardMedia>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </>);
};

export default StaticFrameList
