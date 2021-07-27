import React from "react"
import axios from '../../axiosConfig'
import Star from "../Star/Star.jsx";
import {Image, Layer, Stage} from 'react-konva';
import useImage from "use-image";
import backdropImg from ".//Frame";
import {useDispatch, useSelector} from 'react-redux';
import {updateStarList} from "../../redux/features/projectSlice";
import {setSelectedStarId} from "../../redux/features/projectSlice";
import BackdropStar from "../Star/BackdropStar";
import globalConfig from "../../globalConfig";
import {ProjectDataHandler} from "../../data/ProjectData";
import {StoryboardDataHandler} from "../../data/StoryboardData";



const StarLayer = (props) => {
    const {storyboardId, frameId, updatedWidth} = props;
    const dispatch = useDispatch();

    const selectedStar = useSelector(state => state.project.value.selectedId.starId);

    const starList = useSelector(state => {
            if (state.project.value === null) return [];
            if (storyboardId === "UNDEFINED") return [];
            if (frameId === "UNDEFINED") return [];

            // undefined can still happen when page reloads.
            try {
                const storyboardData = ProjectDataHandler.getStoryboard(state.project.value, storyboardId);
                const frameData = StoryboardDataHandler.getFrame(storyboardData, frameId);
                //need to make a copy, otherwise changing props have side effects
                return JSON.parse(JSON.stringify(frameData.starList));
            }
            catch (error) {
                // console.log(error);
                return [];
            }
        }
    );

    const backdropStar = useSelector(state => {
            try {
                const storyboardData = ProjectDataHandler.getStoryboard(state.project.value, storyboardId);
                const frameData = StoryboardDataHandler.getFrame(storyboardData, frameId);
                return frameData.backdropStar;
            }
            catch (error) {
                // console.log(error);
                    return JSON.stringify({
                        _id: "UNDEFINED", prototypeId: "UNDEFINED"
                    })
            }
        }
    );


    const [backdropImg] = useImage(axios.defaults.baseURL + backdropStar.prototypeId);
    if (backdropImg !== undefined) {
        backdropImg.crossOrigin = "Anonymous";
    }


 return (
     <>
         <Layer
         >
             {
                 backdropStar._id !== "UNDEFINED" && (
                     <Image
                         image={backdropImg}
                         key={backdropStar._id}
                         id={backdropStar._id}
                         width={globalConfig.noScaleWidth}
                         height={globalConfig.noScaleWidth*3/4}
                         onClick={(e) => {
                             dispatch(setSelectedStarId("UNDEFINED"));
                         }}
                         onTap={(e) => {
                             dispatch(setSelectedStarId("UNDEFINED"));
                         }}
                     />
                 )
             }
             {starList.map((img, i) => {
                 return (
                     <Star
                         starData={img}
                         isSelected={img._id === selectedStar}
                         onSelect={() => {
                             dispatch(setSelectedStarId(img._id));
                         }}
                         onChange={(newAttrs) => {
                             const rects = starList.slice();
                             rects[i] = newAttrs;
                             // setStarList(rects);
                             // // console.log("on change!==========: ", rects, i, newAttrs);
                             dispatch(updateStarList(JSON.stringify({
                                 storyboardId,
                                 frameId,
                                 starData: newAttrs,})
                             ))
                         }}
                     />
                 );
             })}
         </Layer
>
     </>
 )
}


export default StarLayer;
