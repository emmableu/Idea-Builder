import React from "react"
import axios from '../../axiosConfig'
import Star from "../Star/Star.jsx";
import {Image, Layer, Stage} from 'react-konva';
import useImage from "use-image";
import backdropImg from ".//Frame";
import {useDispatch, useSelector} from 'react-redux';
import { updateFrameAction } from '../../redux/features/frameActionSlice';
import {updateStarList} from "../../redux/features/projectSlice";



const StarLayer = (props) => {
    const {storyboardId, frameId, width, selectedId, setSelectedId} = props;
    const [starList, setStarList] = React.useState([]);
    const dispatch = useDispatch();


    const starListString = useSelector(state => {
            if (state.project.value === null) return "[]";
            if (storyboardId === null) return "[]";
            if (frameId === null) return "[]";
            try {
                return JSON.stringify(state.project.value.getStoryboard(storyboardId).getFrame(frameId).starListJSON())
            }
            catch (error) {
                console.log(error);
                console.log(state.project.value.getStoryboard(storyboardId));
                console.log(state.project.value.getStoryboard(storyboardId).getFrame(frameId));
                console.log("frameId: ", frameId);
                return "[]";
            }
        }
    );

    React.useEffect(()=> {
        setStarList(JSON.parse(starListString));
    }, [starListString])



 return (
     <>
         <Layer
             width={width}
             height={(width * 3) / 4}

         >
             {starList.map((img, i) => {
                 return (
                     <Star
                         starData={img}
                         isSelected={img._id === selectedId}
                         onSelect={() => {
                             setSelectedId(img._id);
                         }}
                         onChange={(newAttrs) => {
                             const rects = starList.slice();
                             rects[i] = newAttrs;
                             // setStarList(rects);
                             // console.log("on change!==========: ", rects, i, newAttrs);
                             dispatch(updateStarList(JSON.stringify({
                                 storyboardId,
                                 frameId,
                                 starData: newAttrs,})
                             ))
                         }}
                     />
                 );
             })}
         </Layer>
     </>
 )
}


export default StarLayer;
