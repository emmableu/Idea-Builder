import {Layer, Stage} from "react-konva";
import React from "react";
import {Provider, ReactReduxContext, useDispatch, useSelector} from "react-redux";
import StarLayer from "./StarLayer";
import globalConfig, {globalLog} from "../../globalConfig";

const StaticFrame = React.memo((props) => {
    const {frameData, handleDelete} = props;
    const frameId = frameData._id;
    const starList = frameData.starList;
    const backdropStar = frameData.backdropStar;
    const frameRef = React.useRef();

    React.useEffect(() => {
        const updatedScale = globalConfig.responsiveSizeData.frameListPaperHeight/(globalConfig.noScaleWidth*3/4);
        frameRef.current.width(globalConfig.responsiveSizeData.frameListPaperHeight*4/3);
        frameRef.current.height(globalConfig.responsiveSizeData.frameListPaperHeight);
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
                            storyboardId={null}
                            frameId={null}
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
