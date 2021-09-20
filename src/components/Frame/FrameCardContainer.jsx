import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { IconButton, makeStyles, Tooltip } from '@material-ui/core';
import globalConfig, { calcFrameWidth, globalLog } from '../../globalConfig';
import Frame from "./Frame.jsx";
import FrameToolbar from "../FrameToolbar/FrameToolbar";
import {createSelector} from "reselect";
import {connect, useDispatch} from "react-redux";
import EmptyFrameCardContainer from "./EmptyFrameCardContainer";
import {PaletteOutlined, Refresh} from "@material-ui/icons";
import {deleteBackdrop, deleteBackdropStar, deleteStar} from "../../redux/features/projectSlice";
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
        frame: { flex: `0 0 calc(100vh - ${globalConfig.toolBarHeight}px
                         - ${globalConfig.storyboardToolBarHeight}px
                         - ${globalConfig.storyboardPageMargin*2}px
                         - ${globalConfig.responsiveSizeData.frameListHeight}px
                         - ${globalConfig.trashToolBarHeight}px)`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
        }
}));



const getSelectedStarAndActorData = createSelector(
    state => state.project.value.selectedId.storyboardId,
    state => state.project.value.storyboardList,
    state => state.project.value.selectedId.frameId,
    state => state.project.value.selectedId.starId,
    state => state.project.value.actorList,
    state => state.project.value.eventList,
    (storyboardId, storyboardList, frameId, starId, actorList, eventList) => {
        if (storyboardId === null) {
            return {
                storyboardId: null,
                frameId: null,
                starList: [],
                backdropStar: null,
                selectedStar: null,
                selectedActor: null,
            }
        }
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
            globalLog("frameId: ", frameId);
            selectedFrame = selectedStoryboard.frameList.find(s => s._id === frameId);
            if (selectedFrame === undefined) {
                frameId = null;
                selectedFrame = null;
                starList = null;
                backdropStar = null;
                selectedStar = null;
                actorData = null;
            }
            else {
                starList = selectedFrame.starList;
                backdropStar = selectedFrame.backdropStar;
                if ([null, undefined].includes(starId)) {
                    selectedStar = null;
                    actorData = null;
                } else {
                    selectedStar = selectedFrame.starList.find(s => s._id === starId);
                    if (selectedStar !== undefined) {
                        if (selectedStar.actorId === "event-events-are-different-states-under-this-same-actorId") {
                            actorData = {
                                _id: "event-events-are-different-states-under-this-same-actorId",
                                name: "event",
                                stateList: eventList,
                            }
                        }
                        else {
                            actorData = actorList.find(s => s._id === selectedStar.actorId);
                        }
                    } else {
                        selectedStar = null;
                        actorData = null;
                    }
                }
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
    const dispatch = useDispatch();

    const [updatedWidth, setUpdatedWidth] = React.useState(initialWidth);
    const [updatedScale, setUpdatedScale] = React.useState(initialScale);

    const [refresh, setRefresh] = React.useState(0); // integer state
    let refreshTimeoutId = null;

    const fitFrameWidth = () => {
        // globalLog("updatedWidth, updatedScale: --------------------------------------------------- ", updatedWidth, updatedScale)
        const newFrameWidth = calcFrameWidth(window.innerWidth, window.innerHeight);
        setUpdatedScale(newFrameWidth/initialWidth * initialScale);
        setUpdatedWidth(newFrameWidth);
        clearTimeout(refreshTimeoutId);
        refreshTimeoutId = setTimeout(() => {
            setRefresh(refresh => refresh+1); //must use refresh=>refresh+1 here because settimeout is a closure.
            //https://stackoverflow.com/questions/55198517/react-usestate-why-settimeout-function-does-not-have-latest-state-value
        }, 500);
    };

    useEffect(() => {
        window.addEventListener('resize', fitFrameWidth);
        fitFrameWidth();
    }, []);

    const clearFrame = () => {
        dispatch(deleteBackdropStar({
            storyboardId: props.storyboardId,
            frameId: props.frameId,
        }))
        for (const star of props.starList) {
            dispatch(deleteStar({
                storyboardId: props.storyboardId,
                frameId: props.frameId,
                starId: star._id,
            }))
        }
    }

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
                            <div
                                style={{
                                    width: updatedWidth,
                                    height: globalConfig.trashToolBarHeight,
                                    backgroundColor: globalConfig.color.veryLightGrey,
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    margin:`${globalConfig.topAndBottomMarginOutsideFrame}px 0 ${globalConfig.topAndBottomMarginOutsideFrame}px 0`,
                                }}
                            >
                                <Tooltip title="Clear backdrop">
                                    <Button aria-label="clear backdrop"
                                                color="inherit"
                                                size="small"
                                                disabled={(props.backdropStar === undefined || props.backdropStar === null || props.backdropStar.prototypeId === null)}
                                                onClick={(e) => {
                                                    dispatch(deleteBackdropStar({
                                                        storyboardId: props.storyboardId,
                                                        frameId: props.frameId,
                                                    }
                                                )); // update the state to force render
                                                }}
                                    >
                                        {/*<PaletteOutlined style={{ color: 'grey' }} />*/}
                                        clear backdrop
                                    </Button>
                                </Tooltip>

                                {/*<Tooltip title="Refresh frame">*/}
                                {/*    <IconButton aria-label="refresh frame"*/}
                                {/*                color="inherit"*/}
                                {/*                size="small"*/}
                                {/*                onClick={(e) => {*/}
                                {/*                    setRefresh(refresh + 1); // update the state to force render*/}
                                {/*                }}*/}
                                {/*    >*/}
                                {/*        <Refresh style={{ color: 'grey' }} />*/}
                                {/*    </IconButton>*/}
                                {/*</Tooltip>*/}

                                {/*<Tooltip title="Clear frame">*/}
                                {/*    <IconButton aria-label="clear frame"*/}
                                {/*                color="inherit"*/}
                                {/*                size="small"*/}
                                {/*                onClick={clearFrame}*/}
                                {/*    >*/}
                                {/*        <Refresh style={{ color: 'grey' }} />*/}
                                {/*    </IconButton>*/}
                                {/*</Tooltip>*/}
                            </div>
                            <Paper
                                style={{
                                    width: updatedWidth,
                                    height: (updatedWidth * 3) / 4,
                                    backgroundColor: 'white'
                                }}
                                square
                                elevation={4}
                            >
                                <Frame
                                        refresh={refresh}
                                        width={initialWidth}
                                        scale={initialScale}
                                        updatedWidth={updatedWidth}
                                        updatedScale={updatedScale}
                                       {...props}
                                />
                            </Paper>
                            <div
                                style={{
                                    width: updatedWidth,
                                    height: globalConfig.trashToolBarHeight,
                                    backgroundColor: globalConfig.color.veryLightGrey,
                                    zIndex: -5,
                                    margin:`${globalConfig.topAndBottomMarginOutsideFrame}px 0 0 0`,
                                }}
                            />
                        </div>
                    </>
                }


        </>
    );
};

export default connect(mapStateToProps)(FrameCardContainer);
