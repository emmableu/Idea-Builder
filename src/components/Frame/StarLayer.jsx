import React from "react"
import axios from '../../axiosConfig'
import {Image, Layer, Stage} from 'react-konva';
import useImage from "use-image";
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedStarId} from "../../redux/features/projectSlice";
import globalConfig, {globalLog} from "../../globalConfig";
import Star from "../Star/Star";
import StaticStar from "../Star/StaticStar";



const StarLayer = (props) => {
    const {storyboardId, frameId, starList,backdropStar,selectedStar,disabled} = props;
    const dispatch = useDispatch();
    const backdropLayerRef = React.useRef(null);
    const allStarLayerRef = React.useRef(null);
    React.useEffect(() => {
        backdropLayerRef.current.listening(false);
        if (disabled) {
            allStarLayerRef.current.listening(false)
        }
    }, [])
    const [backdropImg] = useImage(axios.defaults.baseURL + backdropStar.prototypeId);
    if (backdropImg !== undefined) {
        backdropImg.crossOrigin = "Anonymous";
    }


 return (
     <>
         <Layer
             ref={backdropLayerRef}
         >
             {
                 backdropStar._id !== null && (
                     <Image
                         image={backdropImg}
                         key={backdropStar._id}
                         id={backdropStar._id}
                         width={globalConfig.noScaleWidth}
                         height={globalConfig.noScaleWidth*3/4}
                         onClick={(e) => {
                             globalLog("clicking");
                         }}
                         onTap={(e) => {
                             globalLog("tapping");
                         }}
                     />
                 )
             }
         </Layer>
         <Layer
             ref={allStarLayerRef}
         >
             {
                 disabled === false && starList.map((starData, i) => {
                         return (
                             <Star
                                 key={starData._id}
                                 storyboardId={storyboardId}
                                 frameId={frameId}
                                 selectedStar={selectedStar}
                                 starData={starData}
                             />
                         );
                     })
             }

             {
                 disabled === true && starList.map((starData, i) => {
                     return (
                         <StaticStar
                             key={starData._id}
                             starData={starData}
                         />
                     );
                 })
             }

         </Layer>
     </>
 )
}


export default StarLayer;
