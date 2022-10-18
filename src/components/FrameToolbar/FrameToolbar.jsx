import {Avatar} from "antd";
import {IconButton, makeStyles, Paper, Tooltip} from "@material-ui/core";
import {DeleteOutline, Chat, TextFields} from "@material-ui/icons";
import React from "react";
import {createSelector} from "reselect";
import {ProjectDataHandler} from "../../data/ProjectData";
import globalConfig from "../../globalConfig";
import {useDispatch, connect} from "react-redux";
import {copyStar, deleteStar} from "../../redux/features/projectSlice";
import axios from "../../axios/ideaServerAxiosConfig";
import {CopyIcon, MotionIcon} from "../primitives/Icon/Icon";
import SpeechBubbleButton from "./SpeechBubbleButton";
import {Button} from "antd";
import MotionButton from "./MotionButton";
import {TextModal} from "./TextModal";

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



const FrameToolbar = (props) => {
    const classes = useStyles();
    const {storyboardId, frameId, selectedStar, selectedActor, backdropStar, starList} = props;
    const [isTextModalVisible, setIsTextModalVisible] = React.useState(false);
    const dispatch = useDispatch();

    const handleDeleteStar = (e) => {
        if ( selectedStar === null ) return;
        dispatch(deleteStar({
            storyboardId,
            frameId,
            starId: selectedStar._id,
        }));
    }
    const handleCopyStar = (e) => {
        if ( selectedStar === null ) return;
        if (selectedStar.type === "text") return;
        dispatch(copyStar({
            storyboardId,
            frameId,
            selectedStar,
        }));
    }

    // const toggleMotion = (e) => {
    //     setDrawing(!drawing);
    // }
    return (
       <>
           <Paper
               square={true}
               variant="elevation"
               className={classes.frameToolbar}
           >



               <div>

                       <>
                       <Tooltip title="Add Text">
                           <IconButton aria-label="add text"
                                       color="inherit"
                                       size="small"
                                       onClick={() => {setIsTextModalVisible(true)}}
                           >
                               <TextFields style={{ color: 'grey'}} />
                           </IconButton>
                       </Tooltip>
                           {'\u00A0'}{'\u00A0'}{'\u00A0'}
                           <TextModal
                       storyboardId={storyboardId}
                       frameId={frameId}
                       isTextModalVisible={isTextModalVisible}
                       setIsTextModalVisible={setIsTextModalVisible}
                       />
                       </>

                   { selectedActor !== null &&  selectedStar.type !== 'text'
                   && <Avatar src={axios.defaults.baseURL + selectedStar.prototypeId}
                   />}
                   { selectedStar !== null &&
                       selectedStar.actorId !== "event-events-are-different-states-under-this-same-actorId"
                       &&  selectedStar.type !== 'text'
                       &&
                       <>
                           {'\u00A0'}{'\u00A0'}
                           <MotionButton
                               storyboardId={storyboardId}
                               frameId={frameId}
                               selectedStar={selectedStar}
                               backdropStar={backdropStar}
                               selectedActor={selectedActor}
                               starList={starList}
                           />
                           <SpeechBubbleButton
                               storyboardId={storyboardId}
                               frameId={frameId}
                               selectedStar={selectedStar}
                               selectedActor={selectedActor}
                           />
                       </>

                   }

                </div>
               <div>
                   {selectedStar !== null &&
                       selectedStar.type !== 'text' &&
                       <Tooltip title="Copy Actor">
                           <IconButton aria-label="copy star"
                                       color="inherit"
                                       size="small"
                                       onClick={handleCopyStar}
                           >
                               <CopyIcon style={{ color: 'grey'}} />
                           </IconButton>
                       </Tooltip>
                   }
                   {selectedStar !== null &&
                       <Tooltip title="Delete Actor">
                           <IconButton aria-label="delete star"
                                       color="inherit"
                                       size="small"
                                       onClick={handleDeleteStar}
                           >
                               <DeleteOutline style={{color: 'grey'}}/>
                           </IconButton>
                       </Tooltip>
                   }
               </div>
           </Paper>
       </>
    )
}

export default FrameToolbar;
