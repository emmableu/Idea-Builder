import {createSelector} from "reselect";
import {ProjectDataHandler} from "../../data/ProjectData";
import {connect, useDispatch} from "react-redux";
import {saveRating} from "../../redux/features/projectSlice";
import {Button, notification, Rate} from "antd";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import {getProgram, setCodeModalOpen} from "../../redux/features/codeSlice";
import CodeIcon from "@material-ui/icons/Code";
import Paper from "@material-ui/core/Paper";
import React from "react";
import {PlusOutlined} from "@ant-design/icons";

const getStoryboardData = createSelector(
    state => state.project.value.selectedId.storyboardId,
    state => state.project.value.storyboardList,
    state => state.project.value.storyboardMenu,
    (storyboardId, storyboardList,storyboardMenu) => {
        if (storyboardId === null) {
            return {
                storyboardId: null,
                showCodeNotification: false,
                showRating:false,
                confidenceRating:0,
                knowledgeRating:0,
            }
        }

        const {showRating, showCodeNotification, confidenceRating, knowledgeRating} = ProjectDataHandler.calcNotification(storyboardId, storyboardList, storyboardMenu);


        return {
            storyboardId,
            showCodeNotification, ///change this to just showCodeNotification after dev
            showRating, //change this to just showRating after dev
            confidenceRating,
            knowledgeRating,
        }
    }
);

const mapStateToProps = (state) => {
    return getStoryboardData(state)
};



const NotificationHOC = (props) => {
    const {storyboardId, showCodeNotification, showRating, confidenceRating, knowledgeRating, normalHandleClick, children} =  props;
    const dispatch = useDispatch();
    const handleChangeConfidence = (val) => {dispatch(saveRating({storyboardId, type:"confidenceRating", val}))};
    const handleChangeKnowledge = (val) => {dispatch(saveRating({storyboardId, type: "knowledgeRating", val}))};


    const openShowCodeNotification = () => {
        notification.open({
            message: 'Check Code for Current Storyboard',
            description:
                <>
                    <p>Before changing or creating another storyboard, check out code for this current storyboard first.</p>

                    <Tooltip title="Show Code for this Storyboard">
                        <Fab size="medium" color="secondary" aria-label="code"
                             onClick={() => {dispatch(getProgram(storyboardId));
                                 dispatch(setCodeModalOpen(true));
                             }}
                        >
                            <CodeIcon
                            />
                        </Fab>
                    </Tooltip>
                </>,
            style:{top: 100}
        });
    };


    const openShowRatingNotification = () => {
        notification.open({
            message: 'Rate your current storyboard',
            description:
                <Paper  style={{padding: "10px 10px", margin:"0px 0px"
                }} variant="outlined">
                    <p style={{color:"grey", fontStyle:"italic"}}>
                        Before changing or creating another storyboard, rate from strongly disagree to strongly agree:
                    </p>
                    <li>I feel confident I can turn this storyboard's idea into <i>Snap!</i> code.</li>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><Rate onChange={handleChangeConfidence} defaultValue={confidenceRating}/>
                    <li>I could apply some cool coding knowledge to make this!</li>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><Rate onChange={handleChangeKnowledge} defaultValue={knowledgeRating}/>
                </Paper>
            ,
            style:{top: 100}
        });
    };

    const handleClick = () => {
        if (showCodeNotification) {
            openShowCodeNotification();
        }
        else if (showRating) {
            openShowRatingNotification();
        }
        else {
            normalHandleClick();
        }
    }
    return (
        <>
            {children(handleClick)}
        </>
    )
}

export default connect(mapStateToProps)(NotificationHOC);
