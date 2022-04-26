import React from "react";
import globalConfig from "../../globalConfig";
import {Button, Paper, Grid} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import StoryboardTitleEdiText from "./StoryboardTitleEdiText";
import {OutBoundIcon} from "../primitives/Icon/Icon";

const useStyles = makeStyles((theme) => ({
    titlePaper: {
        height: "40px",
        width: "100%",
        backgroundColor: globalConfig.storyboardMenuColor.titleBar.background,
        color: globalConfig.storyboardMenuColor.titleBar.text,
        padding: "0px 24px"
    },
    middleTitleGrid:
        {
            padding: "5px 0px",
            textAlign: "center",
            width: "fit-content",
        },
    endActionGrid:
        {
            padding: "5px 0px 5px 0px",
        },
    button: {
        "& span": {
            textTransform: "none",
            color:"#505050",
            fontSize: 12,
        },
    }
}));
const StoryboardTitleBar =  () => {
    const classes = useStyles();
    return (
        <Paper
            variant="elevation"
            elevation={3}
            square={true}
            className={classes.titlePaper}
            >
            <Grid container>
                <Grid item xs={2}/>
                <Grid item xs={8} align="center">
                    <div
                        className={classes.middleTitleGrid}
                    >
                        <StoryboardTitleEdiText />
                    </div>
                </Grid>
                <Grid item xs={2} align="right">
                    <Button
                        className={classes.button}
                        target="_blank"
                        href="https://go.ncsu.edu/csc110project1"
                        endIcon={<OutBoundIcon/>}
                    >
                        Project 1 Design Requirements
                    </Button>
                </Grid>
            </Grid>


        </Paper>
    )
}


export default StoryboardTitleBar;
