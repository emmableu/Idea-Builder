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

    const selectStar = async (starId) => {
        dispatch(setSelectedStarId(starId));
    }


    return (
        <>
            {starImageData.childStarList.length === 0 &&
                <StarImage
                    listening={true}
                    key={starImageData._id}
                    starImageData={starImageData}
                    isSelected={starImageData._id === selectedStarId}
                    onSelect={() => {
                        selectStar(starImageData._id);
                    }}
                    onChange={(newAttrs) => {
                        dispatch(updateStarList({
                            storyboardId,
                            frameId,
                            starData: newAttrs,}
                        ))
                    }}
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
                    onChange={(newAttrs) => {
                        dispatch(updateStarList({
                            storyboardId,
                            frameId,
                            starData: newAttrs})
                        )
                    }}
                />
                {starImageData.childStarList.map((childStar) => (
                        <StarImage
                            listening={false}
                            key={childStar._id}
                            ref={childStarRef}
                            starImageData={childStar}
                            onSelect={() => {console.log("i am selected")}}
                        />
                    )
                )}
            </Group>
            }

        </>
    )
}


export default Star;
