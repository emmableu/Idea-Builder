import ActorPanelButtonGroup from "./ActorPanelButtonGroup";
import React from "react";
import ImgCard from "../../primitives/ImgCard/ImgCard";
import {useDispatch, useSelector} from "react-redux";
import {addStar, deleteActor, updateActorName} from "../../../redux/features/projectSlice";



const ActorPanel = (props) => {
    //, buttonGroup, dataList, imgWidth, handleSave, handleUse, handleDelete
    const dispatch = useDispatch();
    const actorList = useSelector(state =>{
        console.log("actorList: ", state.project.value.actorList.map(a => a.stateList[0]));
        return state.project.value.actorList.map(a => a.stateList[0]);
    });

    const handleSave = (data) => {
        const {_id, name} = data;
        dispatch(
            updateActorName({
                "actorId": _id,
                "actorName": name
            }));
    };

    const handleDelete = (e, _id) => {
        dispatch(deleteActor(
            _id
        ));
    };

    const handleUse = (e, _id) => {
        dispatch(addStar(_id));
    };


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

export default ActorPanel;
