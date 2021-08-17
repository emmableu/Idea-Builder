import {Typography} from "@material-ui/core";
import React from "react";
import {
    makeStyles,
} from '@material-ui/core/styles';
import globalConfig from "../../globalConfig";
import ProjectTitleEdiText from "./ProjectTitleEdiText";

const useStyles = makeStyles((theme) => ({
    storyboardTitleInput: {
        color: globalConfig.storyboardMenuColor.whiteText,
        flexGrow: 1,
    },
}));


const ProjectTitleBar = () => {
    const classes = useStyles();
    return (
        <Typography className={classes.storyboardTitleInput}>
            <ProjectTitleEdiText />
        </Typography>
    )
}


export default ProjectTitleBar;
