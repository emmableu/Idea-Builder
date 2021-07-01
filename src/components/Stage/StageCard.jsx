import {Stage} from "react-konva";
import ActorsLayer from "./ActorsLayer";
import React, {useEffect} from "react";
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import { ReactReduxContext, Provider } from "react-redux";
import {makeStyles} from "@material-ui/core";



const useStyles = makeStyles((theme) => ({
    mainCanvasBox: {
        height: "65vh",
        width: `calc(${65*4/3}vh)`
    },
    canvasPaper: {
        height: "inherit",
        width: "inherit",
        overflow: "auto"
    }
}));

const StageCard = (props) => {
    const {images, setImages, stageRef, dragUrl} = props;
    const cardContainerRef = React.useRef(null);
    const classes = useStyles();
    const initialStageHeight = window.innerHeight*0.65;
    const [stageHeight, setStageHeight] = React.useState(initialStageHeight);
    const fitStageIntoParentContainer = () => {
        var containerHeight = cardContainerRef.current.clientHeight;
        var scale = containerHeight / stageHeight;
        setStageHeight(stageHeight*scale);
    };
    useEffect(() => {
        // adapt the stage on any window resize
        window.addEventListener('resize', fitStageIntoParentContainer);
        fitStageIntoParentContainer();
    }, []);


    return (
                    <Box
                        className={classes.mainCanvasBox}
                    >
                    <Paper
                        className={classes.canvasPaper}
                          ref={cardContainerRef}
                        onDrop={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            // register event position
                            stageRef.current.setPointersPositions(e);
                            // add image
                            setImages(
                                images.concat([
                                    {
                                        ...stageRef.current.getPointerPosition(),
                                        name: dragUrl.current,
                                        count: images.length + 1
                                    }
                                ])
                            );
                            console.log('stageRef.current.getPointerPosition(): ', stageRef.current.getPointerPosition());
                        }}
                        onDragOver={(e) => {
                            e.preventDefault()}}
                    >
                        <ReactReduxContext.Consumer>
                            {({ store }) => (
                        <Stage
                            width={initialStageHeight*4/3}
                            height={initialStageHeight}
                            ref={stageRef}
                        >
                            <Provider store={store}>
                            <ActorsLayer
                                stageRef={stageRef}
                                layerHeight={stageHeight}
                                copiedActorData = {images.map(d => ({
                                key:d.name + d.count.toString(),
                                name: d.name,
                                id:d.name + d.count.toString(),
                                "x": d.x,
                                "y": d.y,
                                'width':100,
                                'height':100,
                            }))}/>
                            </Provider>
                        </Stage>)}
                        </ReactReduxContext.Consumer>

                    </Paper>
                    </Box>
    );
};

export default  StageCard;



