import {Avatar} from "antd";
import {IconButton, makeStyles, Paper, Tooltip} from "@material-ui/core";
import {DeleteOutline, Chat} from "@material-ui/icons";
import React from "react";
import {createSelector} from "reselect";
import {ProjectDataHandler} from "../../data/ProjectData";
import globalConfig from "../../globalConfig";
import {useDispatch, connect} from "react-redux";
import {copyStar, deleteStar} from "../../redux/features/projectSlice";
import axios from "../../axiosConfig";
import {CopyIcon} from "../primitives/Icon/Icon";


const useStyles = makeStyles((theme) => ({
    frameToolbar: {
        width: `calc(100vw  - ${globalConfig.responsiveSizeData.storyboardDrawerWidth}px
                                            -  ${globalConfig.panelTabsWidth}px
                                            - ${globalConfig.responsiveSizeData.actorDrawerWidth}px
                                             - ${globalConfig.responsiveSizeData.noteWidth}px
                                              -  ${globalConfig.innerBoxLeftRightPaddingEach*2}px 
                                             )`,
        flex: `0 0 ${globalConfig.trashToolBarHeight}px`,
        backgroundColor: "white",
        display: 'flex',
        justifyContent: 'space-between',
        padding: "0px 10px",
    },
}));

const getSelectedStarAndActorData = createSelector(
    state => state.project.value.selectedId.storyboardId,
    state => state.project.value.storyboardList,
    state => state.project.value.selectedId.frameId,
    state => state.project.value.selectedId.starId,
    state => state.project.value.actorList,
    (storyboardId, storyboardList, frameId, starId, actorList) => {
        if (starId === null || starId === undefined || starId === "UNDEFINED") {
            return {
                selectedStar: null,
                selectedActor: null
            };
        }
        const selectedStoryboard = storyboardList.find(s => s._id === storyboardId);
        const selectedFrame = selectedStoryboard.frameList.find(s => s._id === frameId);
        const selectedStar = selectedFrame.starList.find(s => s._id === starId);
        const actorData = ProjectDataHandler.findState(actorList, selectedStar.prototypeId);
        return {
            storyboardId: storyboardId,
            frameId: frameId,
            selectedStar: selectedStar,
            selectedActor:  actorData,
        }
    }
);

const mapStateToProps = (state) => {
    return getSelectedStarAndActorData(state);
}

const FrameToolbar = (props) => {
    const classes = useStyles();
    const {storyboardId, frameId, selectedStar, selectedActor} = props;
    const dispatch = useDispatch();

    const handleDeleteStar = (e) => {
        if ( selectedStar === null ) return;
        dispatch(deleteStar({
            storyboardId,
            frameId,
            starId: selectedStar,
        }));
    }
    const handleCopyStar = (e) => {
        if ( selectedStar === null ) return;
        dispatch(copyStar({
            storyboardId,
            frameId,
            selectedStar,
        }));
    }
    return (
       <>
           <Paper
               square={true}
               variant="elevation"
               className={classes.frameToolbar}
           >
               <div>
                   { selectedActor !== null && <Avatar src={axios.defaults.baseURL + selectedStar.prototypeId}/>}
                   <Tooltip title="Add speech bubble">
                       <IconButton aria-label="add speech bubble"
                                   color="inherit"
                                   size="small"
                       >
                           <Chat style={{ color: 'grey'}} />
                       </IconButton>
                   </Tooltip>
                </div>
           <div>
               <Tooltip title="Copy Actor">
                   <IconButton aria-label="copy star"
                               color="inherit"
                               size="small"
                               onClick={handleCopyStar}
                   >
                       <CopyIcon style={{ color: 'grey'}} />
                   </IconButton>
               </Tooltip>
               <Tooltip title="Delete Actor">
                   <IconButton aria-label="delete star"
                               color="inherit"
                               size="small"
                               onClick={handleDeleteStar}
                   >
                       <DeleteOutline style={{ color: 'grey' }} />
                   </IconButton>
               </Tooltip>
           </div>
           </Paper>
       </>
    )
}

export default connect(mapStateToProps)(FrameToolbar);
