import {Stage} from "react-konva";
import React from "react";
import {Provider, ReactReduxContext, useDispatch, useSelector} from "react-redux";
import Paper from "@material-ui/core/Paper/Paper";
import StarLayer from "./StarLayer";
import axios from "../../axiosConfig";
import {addState} from "../../redux/features/projectSlice";
import {setSelectedFrameImgAsLoaded} from "../../redux/features/selectedFrameSlice";
import {ProjectAPI} from "../../api/ProjectAPI";

const Frame = (props) => {
    const {width} = props;
    const frameRef = React.useRef();
    const dispatch = useDispatch();

    const frameActionUpdate = useSelector((state) => state.frameAction.value);
    const selectedFrame = useSelector((state) => state.selectedFrame.value._id);

    React.useEffect(
        () => {
            frameRef.current.toImage({
                pixelRatio: 0.5,
                callback(img) {
                    console.log("selectedFrame: ", selectedFrame)
                    console.log("img: ", img.src)
                    ProjectAPI.sendFrameImg({

                        selectedFrame,
                        img: img.src,
                    }).then(response => {
                        dispatch(setSelectedFrameImgAsLoaded())
                    })
                    ;
                }
            });

        }, [frameActionUpdate]
    )


    return (

        <ReactReduxContext.Consumer>
            {({ store }) => (
        <Stage
            ref={frameRef}
            width={width}
            height={(width * 3) / 4}
            backgroundColor="yellow">
            <Provider store={store}>
                <StarLayer/>
            </Provider>
        </Stage>)}
        </ReactReduxContext.Consumer>
    )
}


export default Frame;
