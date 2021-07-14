import { Stage } from 'react-konva';
import StarLayerOld from './StarLayerOld';
import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import {ReactReduxContext, Provider, useSelector, useDispatch} from 'react-redux';
import { IconButton, makeStyles } from '@material-ui/core';
import { DeleteOutline } from '@material-ui/icons';
import globalConfig, { calcFrameWidth } from '../../globalConfig';
import { Button, Tooltip } from 'antd';
import { DeleteFilled, DeleteTwoTone } from '@ant-design/icons';
import { ArrowForward } from '@material-ui/icons';
import Frame from "./Frame.jsx";
import {deleteStar} from "../../redux/features/projectSlice";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "inherit",
    },

    instruction: {
        color: "grey",
        fontStyle: "italic",
    },

}));
const EmptyFrameCardContainer = props => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Typography component="h1" variant="subtitle1" className={classes.instruction}>
                Your storyboard is currently empty. Please create a new frame.
            </Typography>
        </div>
    );
};

export default EmptyFrameCardContainer;
