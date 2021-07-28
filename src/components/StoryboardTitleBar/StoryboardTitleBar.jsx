import React from "react";
import globalConfig from "../../globalConfig";
import {Paper, Grid} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import StoryboardTitleEdiText from "./StoryboardTitleEdiText";

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
                <Grid item xs={1}/>
                <Grid item xs={10} align="center">
                    <div
                        className={classes.middleTitleGrid}
                    >
                        <StoryboardTitleEdiText />
                    </div>
                </Grid>
                <Grid item xs={1} align="right">
                </Grid>
            </Grid>


        </Paper>
    )
}


export default StoryboardTitleBar;
