import React from "react";
import useImage from "use-image";
import axios from "../../axiosConfig";
import {Provider, ReactReduxContext, useDispatch} from "react-redux";
import * as UUID from "uuid";
import {updateStarList} from "../../redux/features/projectSlice";
import globalConfig, {globalLog} from "../../globalConfig";
import {StarDataHandler} from "../../data/StarData";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper/Paper";
import {Image, Layer, Line, Stage} from "react-konva";
import {MotionStar} from "./MotionStar";



export const StaticLayer = React.memo((props) => {
    const { backdropStar, starList, selectedStar } = props;
    const frameRef = React.useRef(null);
    const [backdropImg] = useImage(axios.defaults.baseURL + backdropStar.prototypeId);
    React.useEffect(() => {
        if (frameRef.current !== null) {
            frameRef.current.listening(false);
        }
    }, [])

    return (
        <Layer
            ref={frameRef}
        >

            {
                backdropStar._id !== null && (
                    <Image
                        image={backdropImg}
                        key={backdropStar._id}
                        id={backdropStar._id}
                        width={globalConfig.noScaleWidth}
                        height={globalConfig.noScaleWidth*3/4}
                    />
                )
            }
            {starList.map((starData, i) => {
                if (starData._id === selectedStar._id) {
                    return;
                }
                return (
                    <MotionStar
                        starData={starData}
                    />
                );
            })}
        </Layer>
    )
});



export const MotionStage = (props) => {
    const {storyboardId, frameId, backdropStar, starList, selectedStar,
        okPressed, setOkPressed, setOkEnabled, cancelPressed, setCancelPressed,
        resetPressed, setIsDrawing, setResetPressed, isDrawing
    } = props;
    const stopped = React.useRef(false);
    const [selectedStarImg, setSelectedStarImg] = React.useState(JSON.parse(JSON.stringify(selectedStar)));
    const [tempMotionStarList, setTempMotionStarList] = React.useState([]);
    const [points, setPoints] = React.useState([]);
    const motionLayerRef = React.useRef(null);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (motionLayerRef.current !== null) {
            motionLayerRef.current.listening(false);
        }
    }, [])

    React.useEffect(() => {
        setOkEnabled(points.length>0);
    }, [points.length>0])


    React.useEffect(() => {
        if (cancelPressed === false) {
            return;
        }
        if (points.length === 0) {
            return;
        }
        reset();
        setCancelPressed(false);
    }, [cancelPressed])

    React.useEffect(() => {
        if (okPressed === false) {
            return;
        }
        if (points.length === 0) {
            return;
        }

        const newStarData = {
            ...selectedStar,
            ...selectedStarImg,
            childStar: {
                speechStar: {
                    ...selectedStar.childStar.speechStar,
                    x: selectedStarImg.x + selectedStarImg.width,
                    y: selectedStarImg.y,
                },

                lineStar: {
                    _id: UUID.v4(),
                    points: points,
                },
                motionStarList: tempMotionStarList,
            }
        }
        dispatch(updateStarList(
            {
                storyboardId, frameId,
                starData: newStarData
            }
        ));
        reset();
        setOkPressed(false);
    }, [okPressed])


    React.useEffect(() => {
        if (points.length%20 !== 2) {
            return;
        }
        const numChild = Math.floor(points.length/20)+1;
        // console.log("point length: ", points.length);
        // console.log("numChild: ", numChild);
        const unitOpac = 0.9/numChild;
        const newTempMotionStarList = [];
        for (let i= 0; i < tempMotionStarList.length; i++) {
            let star = tempMotionStarList[i];
            let opacity = 0.1 + unitOpac*i;
            newTempMotionStarList.push(
                {
                    ...star,
                    opacity,
                }
            )
        }
        const lastChildPointIndex = 20*(numChild-1);
        const {prototypeId, width, height, transform} = selectedStarImg
        const lastChildMotion = StarDataHandler.initializeMotionChildStar(
            {
                prototypeId: prototypeId,
                x : points[lastChildPointIndex] - width/2,
                y : points[lastChildPointIndex+1] - height/2,
                width : width,
                height : height,
                transform:transform,
                opacity: 0.1 + unitOpac*(numChild-1),
            }
        )
        newTempMotionStarList.push(lastChildMotion);
        setTempMotionStarList(newTempMotionStarList);
        // console.log('newTempMotionStarList: ', newTempMotionStarList.map(
        //     t => ([t.x, t.y, t.opacity])
        // ))
    }, [points.length%20===2]);

    const handleMouseMove = (e) => {
        // no drawing - skipping

        if (stopped.current) {
            return;
        }

        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        setSelectedStarImg(
            {...selectedStarImg,
                x: point.x - selectedStarImg.width/2,
                y: point.y - selectedStarImg.height/2,
            });

        if (!isDrawing) {
            return;
        }
        setPoints( points.concat([point.x, point.y]));
    };


    const toggleIsDrawing = (e) => {
        if (points.length>0 && !isDrawing) {
            return;
        }
        if (!isDrawing) {
            setIsDrawing(true);
        }
        else {
            setIsDrawing(false);
            stopped.current=true;
        }
    }

    const reset = () => {
        setPoints( [] );
        stopped.current=false;
        setIsDrawing(false);
        setTempMotionStarList([]);
    }


    React.useEffect(
        () => {
            if (resetPressed === false) {
                return;
            }
            reset();
            setResetPressed(false);
        }, [resetPressed]
    )


    return (
        <ReactReduxContext.Consumer>
            {({ store }) => (
                <Stage
                    width={globalConfig.noScaleWidth}
                    height={globalConfig.noScaleWidth*3/4}
                    onMousemove={handleMouseMove}
                    onClick={toggleIsDrawing}
                    onTap={toggleIsDrawing}
                >
                    <StaticLayer
                        backdropStar={backdropStar}
                        starList={starList}
                        selectedStar={selectedStar}
                />
                    <Provider store={store}>
                    <Layer
                        ref={motionLayerRef}
                    >

                        {tempMotionStarList.map((starData, i) => {
                            return (
                                <MotionStar
                                    key={starData._id}
                                    starData={starData}
                                />
                            );
                        })}
                        <MotionStar
                            starData={selectedStarImg}
                        />
                        <Line
                            key={"line"}
                            points={points}
                            stroke="black"
                            strokeWidth={2}
                            tension={0.5}
                            lineCap="round"
                            globalCompositeOperation={
                                'source-over'
                            }
                        />


                    </Layer>

                    </Provider>
                </Stage>
            )}
        </ReactReduxContext.Consumer>
    );
};
