import React from "react";
import globalConfig from "../../globalConfig";
import {Paper, Typography, Grid} from "@material-ui/core";
import StoryboardActionDropdown from "../StoryboardToolbar/StoryboardActionDropdown";



const StoryboardTitleBar = () => {
    return (
        <Paper
            variant="elevation"
            elevation={3}
            square={true}
            style={{height: "40px",
                    width: "100%",
                    backgroundColor: globalConfig.storyboardMenuColor.titleBar.background,
                    color: globalConfig.storyboardMenuColor.titleBar.text,
                }}
            >
            <Grid container>
                <Grid item xs/>
                <Grid item xs={6} align="center">
                    <span
                        style={{
                            textAlign: "center",
                        }}
                    >
                    paper
                    </span>
                </Grid>
                <Grid item xs align="right">
                    <StoryboardActionDropdown/>
                </Grid>
            </Grid>


        </Paper>
    )
}


export default StoryboardTitleBar;
