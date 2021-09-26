import React, {useCallback} from "react"
import StarImage from "../Star/StarImage.jsx";
import {Image, Layer, Stage, Group, Line} from 'react-konva';
import {useDispatch, useSelector} from 'react-redux';
import {updateStarList, updateStarListInMemory} from "../../redux/features/projectSlice";
import {setSelectedStarId} from "../../redux/features/projectSlice";
import {StarDataHandler} from "../../data/StarData";
import useImage from "use-image";
import axios from "../../axiosConfig";
import {StaticStarUnit} from "./StaticStar";



const Star = (props) => {
    const {storyboardId, frameId, selectedStar, starData} = props;
    const starImageData = JSON.parse(JSON.stringify(starData));
    const dispatch = useDispatch();
    const selectedStarId = (selectedStar!==undefined && selectedStar!==null)?selectedStar._id:null;
    const [strokeEnabled, setStrokeEnabled] = React.useState(false);


    const selectStar = async (starId) => {
        dispatch(setSelectedStarId(starId));
        setStrokeEnabled(false);
    }


    // const saveStarDebounce = useCallback(debounce(dispatchSaveNote, 1000), [])
    //
    // const onFieldTextChange = async (e) => {
    //     const text = e.target.value
    //     setValue(text)
    //     saveNoteDebounce(text);
    // };
    //

    const updatePositionAndSize = (attrs) => {
        const {x, y, width} = attrs;
        const deltaX = x - starData.x;
        const deltaY = y - starData.y;
        const newSpeechStar = {
            ...starData.childStar.speechStar,
            x: x + width,
            y: y,
        }
        let newLineStar = null;
        let newMotionStarList = [];
        if (starData.childStar.motionStarList.length > 0) {
            const points = starData.childStar.lineStar.points.map(
                (p, i) => (i%2===0? p+deltaX:p+deltaY)
            )
            newLineStar = {
                ...starData.childStar.lineStar,
                points,
            }
            newMotionStarList = starData.childStar.motionStarList.map(
                s => (
                    {
                        ...s,
                        x: s.x + deltaX,
                        y: s.y + deltaY,
                    }
                )
            )
        }

        const newData = {
            ...starData,
            ...attrs,
            childStar: {
                speechStar: newSpeechStar,
                lineStar: newLineStar,
                motionStarList:newMotionStarList,
            },
        };

        dispatch(updateStarList({
                storyboardId,
                frameId,
                starData: newData
            })
        )
    }


    return (
        <>
            {StarDataHandler.isChildStarEmpty(starImageData) &&
                <StarImage
                    listening={true}
                    key={starImageData._id}
                    starImageData={starImageData}
                    strokeEnabled={strokeEnabled}
                    setStrokeEnabled={setStrokeEnabled}
                    isSelected={starImageData._id === selectedStarId}
                    onSelect={() => {
                        selectStar(starImageData._id);
                    }}
                    updatePositionAndSize={updatePositionAndSize}
                />
            }
            {
                StarDataHandler.isChildStarEmpty(starImageData) === false &&
            <Group>
                {
                    starData.childStar.motionStarList.length > 0 &&
                    (
                        <>
                        {starData.childStar.motionStarList.map((starData) => {
                            return (
                                <StaticStarUnit
                                    key={starData._id}
                                    starData={starData}
                                />
                            );
                        })}
                        </>
                        )
                }


                <StarImage
                    listening={true}
                    key={starImageData._id}
                    starImageData={starImageData}
                    isSelected={starImageData._id === selectedStarId}
                    onSelect={() => {
                        selectStar(starImageData._id);
                    }}
                    strokeEnabled={strokeEnabled}
                    setStrokeEnabled={setStrokeEnabled}
                    updatePositionAndSize={updatePositionAndSize}
                />
                {
                    starData.childStar.speechStar !== null &&
                    <StaticStarUnit
                        starData={starData.childStar.speechStar}
                    />
                }
                {
                    starData.childStar.lineStar !== null &&
                    <Line
                        key={"line"}
                        points={starData.childStar.lineStar.points}
                        stroke="black"
                        strokeWidth={2}
                        tension={0.5}
                        lineCap="round"
                        globalCompositeOperation={
                            'source-over'
                        }
                    />
                }

            </Group>
            }

        </>
    )
}


export default Star;
