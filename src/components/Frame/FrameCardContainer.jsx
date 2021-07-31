import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { IconButton, makeStyles } from '@material-ui/core';
import globalConfig, { calcFrameWidth } from '../../globalConfig';
import Frame from "./Frame.jsx";
import FrameToolbar from "../FrameToolbar/FrameToolbar";
import {createSelector} from "reselect";
import {connect} from "react-redux";
import EmptyFrameCardContainer from "./EmptyFrameCardContainer";

const useStyles = makeStyles((theme) => ({
        frame: { flex: `0 0 calc(100vh - ${globalConfig.toolBarHeight}px
                         - ${globalConfig.storyboardToolBarHeight}px
                         - ${globalConfig.storyboardPageMargin*2}px
                         - ${globalConfig.responsiveSizeData.frameListHeight}px
                         - ${globalConfig.trashToolBarHeight}px)`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }
}));


const getSelectedStarAndActorData = createSelector(
    state => state.project.value.selectedId.storyboardId,
    state => state.project.value.storyboardList,
    state => state.project.value.selectedId.frameId,
    state => state.project.value.selectedId.starId,
    state => state.project.value.actorList,
    (storyboardId, storyboardList, frameId, starId, actorList) => {
        const selectedStoryboard = storyboardList.find(s => s._id === storyboardId);
        let selectedFrame, starList, backdropStar, selectedStar, actorData;
        if ([null, undefined].includes(frameId)) {
            selectedFrame = null;
            starList = null;
            backdropStar = null;
            selectedStar = null;
            actorData = null;
        }
        else {
            console.log("frameId: ", frameId);
            selectedFrame = selectedStoryboard.frameList.find(s => s._id === frameId);
            starList = selectedFrame.starList;
            backdropStar = selectedFrame.backdropStar;
            if ([null, undefined].includes(starId)) {
                selectedStar = null;
                actorData = null;
            }
            else{
                selectedStar = selectedFrame.starList.find(s => s._id === starId);
                actorData = actorList.find(s => s._id === selectedStar.actorId);
            }
        }

        return {
            storyboardId: storyboardId,
            frameId: frameId,
            starList,
            backdropStar,
            selectedStar: selectedStar,
            selectedActor:  actorData,
        }
    }
);

const mapStateToProps = (state) => {
    return getSelectedStarAndActorData(state);
}

const FrameCardContainer = props => {
    const classes = useStyles();
    const initialWidth = calcFrameWidth(window.innerWidth, window.innerHeight);
    const initialScale = initialWidth/globalConfig.noScaleWidth;

    const [updatedWidth, setUpdatedWidth] = React.useState(initialWidth);
    const [updatedScale, setUpdatedScale] = React.useState(initialScale);


    const fitFrameWidth = () => {
        const newFrameWidth = calcFrameWidth(window.innerWidth, window.innerHeight);
        setUpdatedScale(newFrameWidth/initialWidth * initialScale);
        setUpdatedWidth(newFrameWidth);
    };
    useEffect(() => {
        window.addEventListener('resize', fitFrameWidth);
        fitFrameWidth();
    }, []);



    return (
            <>
                {[null, undefined].includes(props.frameId)
                    && <EmptyFrameCardContainer/>}
                {
                ![null, undefined].includes(props.frameId)
                  &&
                    <>
                        <FrameToolbar {...props}/>
                        <div
                            style={{
                                width: updatedWidth,
                            }}
                            className={classes.frame}
                        >
                            <Paper
                                style={{
                                    width: updatedWidth,
                                    height: (updatedWidth * 3) / 4,
                                    backgroundColor: 'white'
                                }}
                                square
                                elevation={4}
                            >
                                <Frame width={initialWidth}
                                       scale={initialScale}
                                       updatedWidth={updatedWidth}
                                       updatedScale={updatedScale}
                                       {...props}
                                />
                            </Paper>
                        </div>
                    </>
                }


        </>
    );
};

export default connect(mapStateToProps)(FrameCardContainer);
