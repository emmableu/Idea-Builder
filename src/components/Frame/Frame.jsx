import {Layer, Stage} from "react-konva";
import React from "react";
import {Provider, ReactReduxContext, useDispatch, useSelector} from "react-redux";
import Paper from "@material-ui/core/Paper/Paper";
import StarLayer from "./StarLayer";
import axios from "../../axiosConfig";
import {addState} from "../../redux/features/projectSlice";
import {setSelectedFrameImgAsUpdated} from "../../redux/features/selectedFrameSlice";
import {ProjectAPI} from "../../api/ProjectAPI";
import globalConfig from "../../globalConfig";

const Frame = (props) => {
    const {width} = props;
    const frameRef = React.useRef();
    const dispatch = useDispatch();
    const [selectedId, setSelectedId] = React.useState(null);


    const storyboardId = useSelector(state => state.selectedStoryboard.value);
    const frameActionUpdate = useSelector((state) => state.frameAction.value.toString());
    const frameId = useSelector((state) => state.selectedFrame.value._id);

    React.useEffect(
        () => {
            // console.log('[[[[[[[[[[[[[[frame action updated]]]]]]]]]]]]]');
            try {
            frameRef.current.toImage({
                pixelRatio: 1,
                callback(img) {
                    // // console.log("frameId: ", frameId);
                    // // console.log("img: ", img.src);
                    ProjectAPI.sendFrameImg({
                        "selectedFrame": frameId,
                        img: img.src,
                    }).then(response => {
                        dispatch(setSelectedFrameImgAsUpdated())
                    })
                    ;
                }
            });
            }
            catch (error) {
                // console.log("failed to save image to remote: ", error);
            }


        }, [frameActionUpdate]
    )



    const checkDeselect = (e) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            setSelectedId(null);
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
                    width={width}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                />
            </Provider>
        </Stage>)}
        </ReactReduxContext.Consumer>
    )
}


export default Frame;
