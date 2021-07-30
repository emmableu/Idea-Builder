import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { IconButton, makeStyles } from '@material-ui/core';
import globalConfig, { calcFrameWidth } from '../../globalConfig';
import Frame from "./Frame.jsx";
import FrameToolbar from "./FrameToolbar";

const useStyles = makeStyles((theme) => ({
        frame: { flex: `0 0 calc(100vh - ${globalConfig.toolBarHeight}px
                         - ${globalConfig.storyboardToolBarHeight}px
                         - ${globalConfig.storyboardPageMargin*2}px
                         - ${globalConfig.responsiveSizeData.frameListHeight}px
                         - ${globalConfig.trashToolBarHeight}px)`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }
}));


const FrameCardContainer = props => {
    const classes = useStyles();
    const initialWidth = calcFrameWidth(window.innerWidth, window.innerHeight);
    const initialScale = initialWidth/globalConfig.noScaleWidth;

    const [updatedWidth, setUpdatedWidth] = React.useState(initialWidth);
    const [updatedScale, setUpdatedScale] = React.useState(initialScale);


    const fitFrameWidth = () => {
        const newFrameWidth = calcFrameWidth(window.innerWidth, window.innerHeight);
        setUpdatedScale(newFrameWidth/initialWidth * initialScale);
        setUpdatedWidth(newFrameWidth);
    };
    useEffect(() => {
        window.addEventListener('resize', fitFrameWidth);
        fitFrameWidth();
    }, []);



    return (
            <>
                <FrameToolbar/>
            <div
                style={{
                    width: updatedWidth,
                   }}
                className={classes.frame}
            >
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
        </div>
        </>
    );
};

export default FrameCardContainer;
