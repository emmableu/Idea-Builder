import {Divider} from "@material-ui/core";
import React from "react";
import {makeStyles,} from '@material-ui/core/styles';
import globalConfig from "../../globalConfig";
import StoryboardMenuListGroup from "./StoryboardMenuListGroup";

const useStyles = makeStyles((theme) => ({
    // necessary for content to be below app bar
    toolbar: {
        height: globalConfig.toolBarHeight,
        color: "white",

    },    // necessary for content to be below app bar
    baseToolbar: {
        height: globalConfig.toolBarHeight,
        backgroundColor: globalConfig.storyboardMenuColor.titleBar,
        color: "white",
        border: "0px"
    },

}));

const StoryboardMenu = () => {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.toolbar} />
            <Divider/>
            <StoryboardMenuListGroup/>
        </div>
    );
};

export default StoryboardMenu;
