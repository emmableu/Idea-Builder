import {Layer, Stage} from "react-konva";
import React from "react";
import {Provider, ReactReduxContext, useDispatch, useSelector} from "react-redux";
import Paper from "@material-ui/core/Paper/Paper";
import StarLayer from "./StarLayer";
import axios from "../../axiosConfig";
import {addState} from "../../redux/features/projectSlice";
import {ProjectAPI} from "../../api/ProjectAPI";
import globalConfig from "../../globalConfig";
import {setSelectedStarId} from "../../redux/features/projectSlice";
import {sendFrameImg, updateUserActionCounter} from "../../redux/features/frameThumbnailStateSlice";

const Frame = (props) => {
    const {width, updatedWidth, updatedScale} = props;
    const frameRef = React.useRef();
    const dispatch = useDispatch();
    // const [selectedId, setSelectedId] = React.useState(null);
    React.useEffect(() => {
        console.log("updated scale: ", updatedScale)
        frameRef.current.width(updatedWidth);
        frameRef.current.height(updatedWidth*3/4);
        frameRef.current.scale({
            x: updatedScale,
            y: updatedScale
        })
    }, [updatedScale])

    const storyboardId = useSelector(state => state.project.value.selectedId.storyboardId);
    const userActionCounter = useSelector((state) => state.frameThumbnailState.value.userActionCounter);
    const frameId = useSelector((state) => state.project.value.selectedId.frameId);


    React.useEffect(
        () => {
            if (storyboardId === "UNDEFINED" || frameId === "UNDEFINED") {
                return;
            }
            try {
            frameRef.current.toImage({
                pixelRatio: 1,
                callback(img) {
                    img = img.src;
                    dispatch(sendFrameImg({
                        _id: frameId,
                        img,
                    }))
                }
            });
            }
            catch (error) {
                console.log("failed to save image to remote: ", error);
            }


        }, [userActionCounter]
    )



    const checkDeselect = (e) => {
        // deselect when clicked on empty area
        console.log("e.target: ", e.target);
        const clickedOnEmpty = ( e.target === e.target.getStage() || e.target.id() === "backdropStar");
        if (clickedOnEmpty) {
            dispatch(setSelectedStarId("UNDEFINED"));
            dispatch(updateUserActionCounter());
        }
    };


    return (

        <ReactReduxContext.Consumer>
            {({ store }) => (
        <Stage
            ref={frameRef}
            width={width}
            height={(width * 3) / 4}
            backgroundColor={globalConfig.color.veryLightGrey}
            onMouseDown={checkDeselect}
            onTouchStart={checkDeselect} >

            <Provider store={store}>
                <StarLayer
                    storyboardId={storyboardId}
                    frameId={frameId}
                    updatedWidth={updatedWidth}
                />
            </Provider>
        </Stage>)}
        </ReactReduxContext.Consumer>
    )
}


export default Frame;
