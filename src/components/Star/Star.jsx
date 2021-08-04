import React from "react"
import StarImage from "../Star/StarImage.jsx";
import {Image, Layer, Stage, Group} from 'react-konva';
import {useDispatch, useSelector} from 'react-redux';
import {updateStarList} from "../../redux/features/projectSlice";
import {setSelectedStarId} from "../../redux/features/projectSlice";



const Star = (props) => {
    const {storyboardId, frameId, selectedStar, starData} = props;
    const starImageData = JSON.parse(JSON.stringify(starData));
    const dispatch = useDispatch();
    const childStarRef = React.useRef(null);
    const selectedStarId = (selectedStar!==undefined && selectedStar!==null)?selectedStar._id:null;
    const [strokeEnabled, setStrokeEnabled] = React.useState(false);


    const selectStar = async (starId) => {
        dispatch(setSelectedStarId(starId));
        setStrokeEnabled(false);
    }

    const updatePositionAndSize = (attrs) => {
        const {x, y, width} = attrs;
        const newChildStarList = [];
        for (const childStar of starData.childStarList) {
            newChildStarList.push(
                {
                    ...childStar,
                    x: x + width,
                    y: y,
                }
            )
        }

        console.log("starData.childStarLis", starData.childStarList)
        console.log("newChildStarList", newChildStarList);
        const newData = {
            ...starData,
            ...attrs,
            childStarList: newChildStarList,
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
            {starImageData.childStarList.length === 0 &&
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
                starImageData.childStarList.length > 0 &&
            <Group>
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
                {starImageData.childStarList.map((childStar) => (
                        <StarImage
                            listening={false}
                            key={childStar._id}
                            strokeEnabled={strokeEnabled}
                            setStrokeEnabled={setStrokeEnabled}
                            ref={childStarRef}
                            starImageData={childStar}
                        />
                    )
                )}
            </Group>
            }

        </>
    )
}


export default Star;
