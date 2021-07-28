import ActorPanelButtonGroup from "./ActorPanelButtonGroup";
import React from "react";
import ImgCard from "../../primitives/ImgCard/ImgCard";
import {useDispatch, connect} from "react-redux";
import {addStar, deleteActor, updateActorName} from "../../../redux/features/projectSlice";
import {createSelector} from "reselect";



const getActorList = createSelector(
    state => state.project.value.actorList,
    actorList => actorList,
);

const mapStateToProps = (state) => {
    return {
        actorList: getActorList(state),
    };
};

const ActorPanel = (props) => {
    const {actorList} = props;
    const dispatch = useDispatch();

    const handleSave = React.useCallback((data) => {
        const {_id, name} = data;
        dispatch(
            updateActorName({
                "_id": _id,
                "name": name
            }));
    }, []);

    const handleDelete = React.useCallback((e, actorId) => {
        dispatch(deleteActor(
            actorId
        ));
    }, []);

    const handleUse = React.useCallback((e, stateId) => {
        console.log("in handloing use: ", stateId);
        dispatch(addStar(stateId));
    }, []);


    return (
        <ImgCard
            title = "My actors"
            type= "state"
            buttonGroup={<ActorPanelButtonGroup/>}
            dataList = {actorList}
            imgWidth={10}
            handleSave={handleSave}
            handleDelete={handleDelete}
            handleUse={handleUse}
        />
    )
};

export default connect(mapStateToProps)(ActorPanel);
