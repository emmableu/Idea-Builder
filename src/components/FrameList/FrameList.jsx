import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import React from "react";
import globalConfig, {calcFrameWidth} from "../../globalConfig";
import StaticFrameContainer from "../Frame/StaticFrameContainer";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import StaticFrameContainerWithAction from "../Frame/StaticFrameContainerWithAction";


const useStyles = makeStyles((theme) => ({
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
        height: globalConfig.responsiveSizeData.frameListPaperHeight,
        backgroundColor: "white",
        width: globalConfig.responsiveSizeData.frameListPaperHeight*4/3
    },
}));

const FrameList = (props) => {
    const {frameList, handleDelete, handleAdd, _id} = props;
    const classes = useStyles();

    return (<>
        <Grid container wrap="nowrap" justify="flex-start" alignItems="center" spacing={2}
              className={classes.box}>
            {
                <>
                {handleAdd===null &&
                (
                    <>
                        {frameList.map((frameData, i) => (
                            <StaticFrameContainer
                                key={frameData._id}
                                frameIndex={i}
                                frameData={frameData}
                                _id={_id}
                            />
                        ))}
                    </>
                )}
                </>
            }
        </Grid>
    </>);
};

export default FrameList
