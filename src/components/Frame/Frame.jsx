import {Layer, Stage} from "react-konva";
import React from "react";
import {Provider, ReactReduxContext, useDispatch, useSelector} from "react-redux";
import StarLayer from "./StarLayer";
import globalConfig, {globalLog} from "../../globalConfig";
import {setSelectedStarId} from "../../redux/features/projectSlice";

const Frame = (props) => {
    const {refresh, storyboardId, frameId, starList,backdropStar,selectedStar,
        width, updatedWidth, updatedScale} = props;
    const frameRef = React.useRef();
    const dispatch = useDispatch();
    React.useEffect(() => {
        frameRef.current.width(updatedWidth);
        frameRef.current.height(updatedWidth*3/4);
        frameRef.current.scale({
            x: updatedScale,
            y: updatedScale
        })
    }, [refresh, updatedScale])

    const checkDeselect = (e) => {
        // deselect when clicked on empty area
        // globalLog("e.target: ", e.target);
        // globalLog("e.target: ", e.target.attrs.id);
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            dispatch(setSelectedStarId(null));
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
                        starList={starList}
                        backdropStar={backdropStar}
                        selectedStar={selectedStar}
                        disabled={false}
                    />
                </Provider>
            </Stage>)}
        </ReactReduxContext.Consumer>
    )
}


export default Frame;
