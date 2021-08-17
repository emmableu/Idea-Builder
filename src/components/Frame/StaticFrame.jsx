import {Layer, Stage} from "react-konva";
import React from "react";
import {Provider, ReactReduxContext, useDispatch, useSelector} from "react-redux";
import StarLayer from "./StarLayer";
import globalConfig, {globalLog} from "../../globalConfig";
import {sendFrameImg} from "../../redux/features/frameThumbnailStateSlice";

const StaticFrame = (props) => {
    const {storyboardId, frameData, width,} = props;
    const frameId = frameData._id;
    const starList = frameData.starList;
    const backdropStar = frameData.backdropStar;
    const frameRef = React.useRef();
    const dispatch = useDispatch();
    React.useEffect(() => {
        frameRef.current.listening(false);
    }, [])

    React.useEffect(
        () => {
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
                globalLog("failed to save image to remote: ", error);
            }
        }, []
    )


    return (

        <ReactReduxContext.Consumer>
            {({ store }) => (
                <Stage
                    ref={frameRef}
                    width={width}
                    height={(width * 3) / 4}>

                    <Provider store={store}>
                        <StarLayer
                            storyboardId={storyboardId}
                            frameId={frameId}
                            starList={starList}
                            backdropStar={backdropStar}
                            selectedStar={null}
                        />
                    </Provider>
                </Stage>)}
        </ReactReduxContext.Consumer>
    )
}


export default StaticFrame;
