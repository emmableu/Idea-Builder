import React from "react"
import StarImage from "../Star/StarImage.jsx";
import {Image, Layer, Stage, Group} from 'react-konva';
import {useDispatch, useSelector} from 'react-redux';
import {updateStarList} from "../../redux/features/projectSlice";
import {setSelectedStarId} from "../../redux/features/projectSlice";
import {StarDataHandler} from "../../data/StarData";



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
        const newSpeechStar = {
            ...starData.childStar.speechStar,
            x: x + width,
            y: y,
        }

        const newData = {
            ...starData,
            ...attrs,
            childStar: {
                ...starData.childStar,
                newSpeechStar,
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
                <StarImage
                    listening={false}
                    key={starData.childStar.speechStar._id}
                    strokeEnabled={strokeEnabled}
                    setStrokeEnabled={setStrokeEnabled}
                    ref={childStarRef}
                    starImageData={starData.childStar.speechStar}
                />
            </Group>
            }

        </>
    )
}


export default Star;
