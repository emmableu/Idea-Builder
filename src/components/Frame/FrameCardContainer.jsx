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

const useStyles = makeStyles(theme => ({}));

const FrameCardContainer = props => {
    const initialWidth = calcFrameWidth(window.innerWidth, window.innerHeight);
    const initialScale = 1 //todo: update later.

    const [updatedWidth, setUpdatedWidth] = React.useState(initialWidth);
    const [updatedScale, setUpdatedScale] = React.useState(initialScale);


    const fitFrameWidth = () => {
        const newFrameWidth = calcFrameWidth(window.innerWidth, window.innerHeight);
        console.log("new frame width: ", newFrameWidth, "initial width: ", initialWidth)
        setUpdatedScale(newFrameWidth/initialWidth * initialScale);
        setUpdatedWidth(newFrameWidth);
        // console.log("fitting frame width, updated scale: ", updatedScale);
    };
    useEffect(() => {
        window.addEventListener('resize', fitFrameWidth);
        fitFrameWidth();
    }, []);

    const selectedStar = useSelector(state => state.project.value.selectedId.starId);
    const dispatch = useDispatch();

    const handleDeleteStar = (e) => {
        if ( selectedStar === null ) return;
        dispatch(deleteStar(selectedStar));
    }

    return (
        <div
            style={{
                width: updatedWidth,
                height: (updatedWidth * 3) / 4 + 2 * globalConfig.trashToolBarHeight
            }}
        >
            <div
                style={{
                    width: updatedWidth,
                    height: globalConfig.trashToolBarHeight,
                    backgroundColor: globalConfig.color.veryLightGrey,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    margin:`0 0 ${globalConfig.topAndBottomMarginOutsideFrame}px 0`,
                }}
            >
                <Tooltip title="Delete Actor">
                    <IconButton aria-label="delete star"
                                color="inherit"
                                size="small"
                                onClick={handleDeleteStar}
                    >
                        <DeleteOutline style={{ color: 'grey' }} />
                    </IconButton>
                </Tooltip>
            </div>
            <Paper
                style={{
                    width: updatedWidth,
                    height: (updatedWidth * 3) / 4,
                    backgroundColor: 'white'
                }}
                square
                elevation={4}
            >
                <Frame width={initialWidth}
                       scale={initialScale}
                       updatedWidth={updatedWidth}
                       updatedScale={updatedScale}
                />
            </Paper>
            <div
                style={{
                    width: updatedWidth,
                    height: globalConfig.trashToolBarHeight,
                    backgroundColor: globalConfig.color.veryLightGrey,
                    zIndex: -5,
                    margin:`${globalConfig.topAndBottomMarginOutsideFrame}px 0 0 0`,
                }}
            />
            <div />
        </div>
    );
};

export default FrameCardContainer;
