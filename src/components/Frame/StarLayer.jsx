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



const StarLayer = (props) => {
    const {storyboardId, frameId, updatedWidth} = props;
    const [starList, setStarList] = React.useState([]);
    const dispatch = useDispatch();

    const selectedStar = useSelector(state => state.project.value.selectedId.starId);

    const starListString = useSelector(state => {
            if (state.project.value === null) return "[]";
            if (storyboardId === "UNDEFINED") return "[]";
            if (frameId === "UNDEFINED") return "[]";

            // undefined can still happen when page reloads.
            try {
                return JSON.stringify(state.project.value.getStoryboard(storyboardId).getFrame(frameId).starListJSON())
            }
            catch (error) {
                // console.log(error);
                return "[]";
            }
        }
    );

    const backdropStar = useSelector(state => {
            try {
                // console.log("backdropstar: ", JSON.stringify(state.project.value.getStoryboard(storyboardId).getFrame(frameId).backdropStar))
                return JSON.stringify(state.project.value.getStoryboard(storyboardId).getFrame(frameId).backdropStar)
            }
            catch (error) {
                // console.log(error);
                    return JSON.stringify({
                        _id: "EMPTY", prototypeId: "EMPTY"
                    })
            }
        }
    );

    React.useEffect(()=> {
        setStarList(JSON.parse(starListString));
    }, [starListString])

    // const [imgSrc, setImgSrc] = React.useState();
    const [backdropImg] = useImage(axios.defaults.baseURL + JSON.parse(backdropStar).prototypeId);
    if (backdropImg !== undefined) {
        backdropImg.crossOrigin = "Anonymous";
    }
    // React.useEffect( () => {
    //         // console.log("img src updated: ", axios.defaults.baseURL + backdropStar.prototypeId)
    //         setImgSrc(axios.defaults.baseURL + backdropStar.prototypeId);
    //     }
    //     , [backdropStar._id]
    // )

 return (
     <>
         <Layer
         >
             {
                 backdropStar._id !== "EMPTY" && (
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
