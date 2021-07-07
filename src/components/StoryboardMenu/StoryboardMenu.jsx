import {Divider, Typography, Grid} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import React from "react";
import {makeStyles,} from '@material-ui/core/styles';
import globalConfig from "../../globalConfig";
import StoryboardMenuListGroup from "./StoryboardMenuListGroup";
import ArtTrack from "@material-ui/icons/ArtTrack";
import {ActorData} from "../../data/ActorData";
import {ProjectData} from "../../data/ProjectData";
import {ProjectDataParser} from "../../parser/ProjectDataParser";

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

    const projectData = new ProjectData();
    projectData.addNewActor();
    const projectJSON = projectData.toString();
    console.log("projectJSON: ", projectJSON);
    const parser = new ProjectDataParser();
    console.log(parser.parse(JSON.parse(projectJSON)));


    return (
        <div>
            <div className={classes.toolbar} />
            <Divider/>
            <StoryboardMenuListGroup/>
        </div>
    );
};

export default StoryboardMenu;
