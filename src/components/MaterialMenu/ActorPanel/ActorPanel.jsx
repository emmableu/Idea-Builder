import ActorPanelButtonGroup from "./ActorPanelButtonGroup";
import React from "react";
import ImgCard from "../../primitives/ImgCard/ImgCard";
import {useDispatch, connect} from "react-redux";
import {addStar, deleteActor, updateActorName} from "../../../redux/features/projectSlice";
import {createSelector} from "reselect";



const getActorList = createSelector(
    state => state.project.value.actorList,
    actorList => actorList.map(a => a.stateList[0]),
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
                "actorId": _id,
                "actorName": name
            }));
    }, []);

    const handleDelete = React.useCallback((e, _id) => {
        dispatch(deleteActor(
            _id
        ));
    }, []);

    const handleUse = React.useCallback((e, _id) => {
        dispatch(addStar(_id));
    }, []);


    return (
        <ImgCard
            title = "My actors"
            type= "actor"
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
