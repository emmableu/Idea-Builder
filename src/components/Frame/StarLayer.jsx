import React from "react"
import axios from '../../axiosConfig'
import {Image, Layer, Stage} from 'react-konva';
import useImage from "use-image";
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedStarId} from "../../redux/features/projectSlice";
import globalConfig from "../../globalConfig";
import Star from "../Star/Star";



const StarLayer = (props) => {
    const {storyboardId, frameId, starList,backdropStar,selectedStar,} = props;
    const dispatch = useDispatch();
    const [backdropImg] = useImage(axios.defaults.baseURL + backdropStar.prototypeId);
    if (backdropImg !== undefined) {
        backdropImg.crossOrigin = "Anonymous";
    }

    const selectStar = async (starId) => {
        dispatch(setSelectedStarId(starId));
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
                             selectStar("UNDEFINED");
                         }}
                         onTap={(e) => {
                             selectStar("UNDEFINED");
                         }}
                     />
                 )
             }
             {starList.map((starData, i) => {
                 return (
                     <Star
                         storyboardId={storyboardId}
                         frameId={frameId}
                        selectedStar={selectedStar}
                         starData={starData}
                     />
                 );
             })}
         </Layer
>
     </>
 )
}


export default StarLayer;
