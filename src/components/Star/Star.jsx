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
    const selectedStarId = (selectedStar!==undefined && selectedStar!==null)?selectedStar._id:null;

    const selectStar = async (starId) => {
        dispatch(setSelectedStarId(starId));
    }


    return (
        <>
            {starImageData.childStarList.length === 0 &&
                <StarImage
                    starImageData={starImageData}
                    isSelected={starImageData._id === selectedStarId}
                    onSelect={() => {
                        selectStar(starImageData._id);
                    }}
                    onChange={(newAttrs) => {
                        dispatch(updateStarList(JSON.stringify({
                            storyboardId,
                            frameId,
                            starData: newAttrs,})
                        ))
                    }}
                />
            }
            {
                starImageData.childStarList.length > 0 &&
            <Group>
                <StarImage
                    starImageData={starImageData}
                    isSelected={starImageData._id === selectedStarId}
                    onSelect={() => {
                        selectStar(starImageData._id);
                    }}
                    onChange={(newAttrs) => {
                        dispatch(updateStarList(JSON.stringify({
                            storyboardId,
                            frameId,
                            starImageData: newAttrs,})
                        ))
                    }}
                />
                {starImageData.childStarList.map((childStar) => (
                        <StarImage
                            starImageData={childStar}
                            isSelected={null}
                            onSelect={null}
                            onChange={null}
                        />
                    )
                )}
            </Group>
            }

        </>
    )
}


export default Star;
