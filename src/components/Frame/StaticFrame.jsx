import {Layer, Stage} from "react-konva";
import React from "react";
import {Provider, ReactReduxContext, useDispatch, useSelector} from "react-redux";
import StarLayer from "./StarLayer";
import globalConfig, {globalLog} from "../../globalConfig";

const StaticFrame = React.memo((props) => {
    const {storyboardId, frameData, handleDelete} = props;
    const frameId = frameData._id;
    const starList = frameData.starList;
    const backdropStar = frameData.backdropStar;
    const frameRef = React.useRef();
    const dispatch = useDispatch();

    React.useEffect(() => {
        const updatedScale = 128/globalConfig.noScaleWidth;
        frameRef.current.width(128);
        frameRef.current.height(128*3/4);
        frameRef.current.scale({
            x: updatedScale,
            y: updatedScale
        })
    }, [])

    React.useEffect(() => {
        frameRef.current.listening(false);
    }, [])


    return (

        <ReactReduxContext.Consumer>
            {({ store }) => (
                <Stage
                    ref={frameRef}
                    width={globalConfig.noScaleWidth}
                    height={(globalConfig.noScaleWidth * 3) / 4}>

                    <Provider store={store}>
                        <StarLayer
                            storyboardId={storyboardId}
                            frameId={frameId}
                            starList={starList}
                            backdropStar={backdropStar}
                            selectedStar={null}
                            disabled={true}
                        />
                    </Provider>
                </Stage>)}
        </ReactReduxContext.Consumer>
    )
})


export default StaticFrame;
