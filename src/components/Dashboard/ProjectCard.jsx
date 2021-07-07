import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    Box,
    Button,
    Tooltip,
    CardHeader,
    IconButton,
    CardActionArea
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {MoreVert, Edit} from '@material-ui/icons';
import {CopyOutlined, DeleteOutlined} from "@ant-design/icons";

const useStyles = makeStyles({
    root: {
        width: "inherit"
    },
    projectTitle: {
        '& .MuiCardHeader-title': {
            fontSize: 16
        }
    },
    projectBox: {
        padding: "5px 0px"
    }
});

const CardButtonGroup = () => {
    return (
    <>
        <Tooltip title={"edit project"}>
        <IconButton aria-label="settings">
            <Edit />
        </IconButton>
        </Tooltip>
        <Tooltip title={"duplicate project"}>
            <IconButton aria-label="settings">
                <CopyOutlined />
            </IconButton>
        </Tooltip>
        <Tooltip title={"delete project"}>
            <IconButton aria-label="settings">
                <DeleteOutlined />
            </IconButton>
        </Tooltip>
    </>
    )
}

const ProjectCard = () => {
    const classes = useStyles();

    return (
        <Box className={classes.projectBox}>
            <Card
                variant="outlined"
                className={classes.root}>
                <CardHeader
                    className={classes.projectTitle}
                    action={
                        <CardButtonGroup/>
                    }
                    title={'Build a new city'}
                />
            </Card>
        </Box>
    );
}

export default ProjectCard;
