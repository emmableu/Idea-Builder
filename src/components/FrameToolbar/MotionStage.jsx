import React from 'react';
import {Stage, Layer, Line, Text, Image} from 'react-konva';
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import globalConfig from "../../globalConfig";
import useImage from "use-image";
import axios from "../../axiosConfig";
import * as UUID from "uuid"
import "./Blink.css";
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import Button from "@material-ui/core/Button";
import {glob} from "konva/lib/Global";
import {StarDataHandler} from "../../data/StarData";
import {updateStarList} from "../../redux/features/projectSlice";
import {useDispatch} from "react-redux";

const MotionStar = (props) => {
    const {starData} = props;
    const [image] = useImage(axios.defaults.baseURL + starData.prototypeId)
    return (
        <Image
            image={image}
            key={starData._id}
            {...starData}
        />
    )
}



export const MotionStage = (props) => {
    const {storyboardId, frameId, backdropStar, starList, selectedStar, okPressed, setOkPressed, setIsModalVisible} = props;
    const isDrawing = React.useRef(false);
    const [stopped, setStopped] = React.useState(false);
    const [backdropImg] = useImage(axios.defaults.baseURL + backdropStar.prototypeId);
    const [selectedStarImg, setSelectedStarImg] = React.useState(JSON.parse(JSON.stringify(selectedStar)))
    const [points, setPoints] = React.useState([]);
    const [tempMotionStarList,setTempMotionStarList] = React.useState([]);
    const frameRef = React.useRef(null);
    const motionStarRef = React.useRef(null);
    const dispatch = useDispatch();
    React.useEffect(() => {
        if (frameRef.current !== null) {
            frameRef.current.listening(false);
        }
        if (motionStarRef.current !== null) {
            motionStarRef.current.listening(false);
        }
    }, [])

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
        setIsModalVisible(false);
        setOkPressed(false);
    }, [okPressed])

    /*
    opac: 0.1 0.4 0.7 1
    num of child: 3
    how to calculate:
    0.1 + 0.9*0/3, 0.1 + 0.9*1/3, 0.1 + 0.9*2/3
     */

    React.useEffect(() => {
        if (points.length === 0) {
            return;
        }
        const numChild = Math.floor(points.length/20)+1;
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
        const lastChildPointIndex = 10*(numChild-1);
        console.log("pointIndex: ", lastChildPointIndex);
        console.log( points[lastChildPointIndex*2])
        const lastChildMotion = StarDataHandler.initializeMotionChildStar(
            {
                prototypeId: selectedStarImg.prototypeId,
                x : points[lastChildPointIndex*2] - selectedStarImg.width/2,
                y : points[lastChildPointIndex*2+1] - selectedStarImg.height/2,
                width : selectedStarImg.width,
                height : selectedStarImg.height,
                transform:selectedStarImg.transform,
                opacity: 0.1 + unitOpac*(numChild-1),
            }
        )
        newTempMotionStarList.push(lastChildMotion);
        setTempMotionStarList(newTempMotionStarList);
    //     console.log("len points: ", points.length);
    //     console.log("tempMotionStarList: ",
    //         tempMotionStarList.map(m => (
    //            [m.x, m.y]
    //         ))
    //         );
    }, [points.length%20===2]);

    const handleMouseMove = (e) => {
        // no drawing - skipping
        if (stopped) {
            return;
        }
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        setSelectedStarImg(
            {...selectedStarImg,
                x: point.x - selectedStarImg.width/2,
                y: point.y - selectedStarImg.height/2,
            }
        );

        if (!isDrawing.current) {
            return;
        }
        // replace last
        setPoints(points.concat([point.x, point.y]));
    };


    const toggleIsDrawing = (e) => {
        if (points.length>0 && !isDrawing.current) {
            return;
        }
        isDrawing.current = !isDrawing.current
        if (isDrawing.current) {
            // const pos = e.target.getStage().getPointerPosition();
        }
        else if (isDrawing.current === false) {
            setStopped(true);
        }
    }

    const handleReset = (e) => {
        setPoints( [] );
        setStopped(false);
        isDrawing.current=false;
        setTempMotionStarList([]);
    }


    return (
        <Box
            style={{
                width: "100%",
                height: "inherit",
                display: "flex",
                flexDirection:"column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div>
                    Click inside the stage to start/stop recording.
                <br/>
                <RadioButtonCheckedIcon
                    className={isDrawing.current?
                        "Blink":"Default"
                    }
                />   {'\u00A0'} Recording
            </div>
        <Paper
            style={{width: globalConfig.noScaleWidth,
                   height: globalConfig.noScaleWidth*3/4}}
        >
            <Stage
                width={globalConfig.noScaleWidth}
                height={globalConfig.noScaleWidth*3/4}
                onMousemove={handleMouseMove}
                onClick={toggleIsDrawing}
                onTap={toggleIsDrawing}
            >
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
                <Layer
                    ref={motionStarRef}
                >

                    {tempMotionStarList.map((starData, i) => {
                        return (
                            <MotionStar
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
            </Stage>
        </Paper>
            <br/>
            <Button
                variant="contained"
                onClick={handleReset}
            >
                Reset
            </Button>
        </Box>
    );
};
