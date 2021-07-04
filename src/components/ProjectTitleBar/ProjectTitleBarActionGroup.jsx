import {Dropdown} from "antd";
import {IconButton, Tooltip} from "@material-ui/core";
import {Home, SaveAlt} from "@material-ui/icons";
import React from "react";

const ProjectTitleBarActionGroup  = () => {
    return (
        <>
            <Tooltip title="Save">
                <IconButton aria-label="display more actions" color="inherit" size="medium">
                    <SaveAlt/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Back to home">
                <IconButton aria-label="display more actions" color="inherit" size="medium">
                    <Home/>
                </IconButton>
            </Tooltip>
        </>
    )
};

export default ProjectTitleBarActionGroup;
