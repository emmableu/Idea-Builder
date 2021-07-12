import {Stage} from "react-konva";
import StarLayerOld from "./StarLayerOld";
import React, {useEffect} from "react";
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import {ReactReduxContext, Provider, useSelector} from "react-redux";
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

const FrameCardOld = (props) => {
    // const {images, setImages, frameRef, dragUrl} = props;
    const frameRef = React.useRef();
    const [images, setImages] = React.useState([]);
    const dragUrl = useSelector(state => state.dragUrl.value);
    const cardContainerRef = React.useRef(null);
    const classes = useStyles();
    const initialFrameHeight = window.innerHeight*0.65;
    const [frameHeight, setFrameHeight] = React.useState(initialFrameHeight);
    const fitFrameIntoParentContainer = () => {
        var containerHeight = cardContainerRef.current.clientHeight;
        var scale = containerHeight / frameHeight;
        setFrameHeight(frameHeight*scale);
    };
    useEffect(() => {
        // adapt the frame on any window resize
        window.addEventListener('resize', fitFrameIntoParentContainer);
        fitFrameIntoParentContainer();
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
                            frameRef.current.setPointersPositions(e);
                            // add image
                            setImages(
                                images.concat([
                                    {
                                        ...frameRef.current.getPointerPosition(),
                                        name: dragUrl.current,
                                        count: images.length + 1
                                    }
                                ])
                            );
                            // console.log('frameRef.current.getPointerPosition(): ', frameRef.current.getPointerPosition());
                        }}
                        onDragOver={(e) => {
                            e.preventDefault()}}
                    >
                        <ReactReduxContext.Consumer>
                            {({ store }) => (
                        <Stage
                            width={initialFrameHeight*4/3}
                            height={initialFrameHeight}
                            ref={frameRef}
                        >
                            <Provider store={store}>
                            <StarLayerOld
                                frameRef={frameRef}
                                layerHeight={frameHeight}
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

export default  FrameCardOld;



