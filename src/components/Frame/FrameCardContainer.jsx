import { Stage } from 'react-konva';
import StarLayerOld from './StarLayerOld';
import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { ReactReduxContext, Provider, useSelector } from 'react-redux';
import { IconButton, makeStyles } from '@material-ui/core';
import { DeleteOutline } from '@material-ui/icons';
import globalConfig, { calcFrameWidth } from '../../globalConfig';
import { Button, Tooltip } from 'antd';
import { DeleteFilled, DeleteTwoTone } from '@ant-design/icons';
import { ArrowForward } from '@material-ui/icons';
import Frame from "./Frame.jsx";

const useStyles = makeStyles(theme => ({}));

const FrameCardContainer = props => {
    const fitFrameWidth = () => {
        const newFrameWidth = calcFrameWidth(window.innerWidth, window.innerHeight);
        setWidth(newFrameWidth);
    };
    const [width, setWidth] = React.useState(0);
    useEffect(() => {
        window.addEventListener('resize', fitFrameWidth);
        fitFrameWidth();
    }, []);

    return (
        <div
            style={{
                width: width,
                height: (width * 3) / 4 + 2 * globalConfig.trashToolBarHeight
            }}
        >
            <div
                style={{
                    width: width,
                    height: globalConfig.trashToolBarHeight,
                    backgroundColor: globalConfig.color.veryLightGrey,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    margin:`0 0 ${globalConfig.topAndBottomMarginOutsideFrame}px 0`,
                }}
            >
                <Tooltip title="Delete Actor">
                    <IconButton aria-label="delete star" color="inherit" size="small">
                        <DeleteOutline style={{ color: 'grey' }} />
                    </IconButton>
                </Tooltip>
            </div>
            <Paper
                style={{
                    width: width,
                    height: (width * 3) / 4,
                    backgroundColor: 'white'
                }}
                square
                elevation={4}
            >
                <Frame width={width}/>
            </Paper>
            <div
                style={{
                    width: width,
                    height: globalConfig.trashToolBarHeight,
                    backgroundColor: globalConfig.color.veryLightGrey,
                    margin:`${globalConfig.topAndBottomMarginOutsideFrame}px 0 0 0`,
                }}
            />
            <div />
        </div>
    );
};

export default FrameCardContainer;
