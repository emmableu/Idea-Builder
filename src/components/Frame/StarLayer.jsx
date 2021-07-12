import React from "react"
import axios from '../../axiosConfig'
import Star from "../Star/Star.jsx";
import {Image, Layer} from 'react-konva';
import useImage from "use-image";
import backdropImg from ".//Frame";
import {useDispatch, useSelector} from 'react-redux';
import { updateFrameAction } from '../../redux/features/frameActionSlice';
import {updateStarList} from "../../redux/features/projectSlice";



const StarLayer = (props) => {
    const {storyboardId, frameId} = props;
    const [starList, setStarList] = React.useState([]);
    const [selectedId, selectImg] = React.useState(null);
    const dispatch = useDispatch();


    const starListString = useSelector(state => {
            if (state.project.value === null) return "[]";
            if (storyboardId === null) return "[]";
            if (frameId === null) return "[]";
            return JSON.stringify(state.project.value.getStoryboard(storyboardId).getFrame(frameId).starListJSON())
        }
    );

    React.useEffect(()=> {
        setStarList(JSON.parse(starListString));
    }, [starListString])

 return (
     <>
         <Layer
         >
             {starList.map((img, i) => {
                 return (
                     <Star
                         starData={img}
                         isSelected={img.id === selectedId}
                         onSelect={() => {
                             selectImg(img.id);
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
