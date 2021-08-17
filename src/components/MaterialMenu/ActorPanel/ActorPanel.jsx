import ActorPanelButtonGroup from "./ActorPanelButtonGroup";
import React from "react";
import ImgCard from "../../primitives/ImgCard/ImgCard";
import {useDispatch, connect} from "react-redux";
import {addStar, deleteActor, updateActorName} from "../../../redux/features/projectSlice";
import {createSelector} from "reselect";
import {ActorPanelImgCard} from "./ActorPanelImgCard";
import {Box} from "@material-ui/core";
import globalConfig from "../../../globalConfig";
import grey from "@material-ui/core/colors/grey";

const toolBarHeight = globalConfig.toolBarHeight;
const addNewActorBoxHeight = globalConfig.addNewActorBoxHeight;

export const getBoxStyle = () => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: addNewActorBoxHeight,
    backgroundColor: grey[50]
    // border: 3px solid green;
});

const getListStyle = () => ({
    background: grey[50],
    padding: "6px 0",
    width: "100%",
    overflowY: "scroll",
    height: `calc(100vh - ${globalConfig.toolBarHeight}px
                         - ${globalConfig.storyboardToolBarHeight}px
                        - ${globalConfig.addNewActorBoxHeight}px
                         - ${globalConfig.storyboardPageMargin*2}px)`,
    position: 'relative',
});


const getActorList = createSelector(
    state => state.project.value.actorList,
    actorList => actorList.filter(a => (a.deleted===false)),
);

const mapStateToProps = (state) => {
    return {
        actorList: getActorList(state),
    };
};

const ActorPanel = (props) => {
    const {actorList} = props;


    return (
        <Box
            style={{width: "100%",
                backgroundColor: grey[50]
            }}
        >
            <div
                style={getBoxStyle()}
            >
                <ActorPanelButtonGroup/>
            </div>
            <div
                style={getListStyle()}
            >
        {
            actorList.map(actorData => (
                <ActorPanelImgCard
                    actorData={actorData}
                    key={actorData._id}
                />

            ))
        }
            </div>
        </Box>
    )
};

export default connect(mapStateToProps)(ActorPanel);

