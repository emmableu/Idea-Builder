import ActorPanelButtonGroup from "./ActorPanelButtonGroup";
import ImgCard from "../../primitives/ImgCard/ImgCard";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    addStar,
    deleteActor,
    deleteState,
    updateActorName,
    updateStateName
} from "../../../redux/features/projectSlice";
import {Input} from "antd";
import ActorPanelImgCardButtonGroup from "./ActorPanelImgCardButtonGroup";
import { Collapse } from 'antd';
import urlExist from "url-exist";
import axios from "../../../axios/ideaServerAxiosConfig";
import ActorImgCard from "./ActorImgCard";



const ActorPanelCardTitle = (props) => {
    const {_id, name} = props;
    const dispatch = useDispatch();
    return (
        <>
            <Input
                onChange={e => dispatch(
                    updateActorName({
                        _id: _id,
                        name: e.target.value
                    })
                )}
                value={name}
                placeholder="Actor name"
                bordered={false}
            />
        </>
    )
}





export const ActorPanelImgCard = (props) => {
    const {actorData} = props;

    const dispatch = useDispatch();

    const handleSave = React.useCallback((e, actorId, _id, name) => {
        // dispatch(
        //     updateActorName({
        //         "_id": _id,
        //         "name": name
        //     }));
        dispatch(updateStateName(
            {
                actorId,
                stateId: _id,
                stateName: name,
            }
        ))
    }, []);

    const handleDelete = React.useCallback((e, actorId, _id) => {
        dispatch(deleteState(
            {
                actorId,
                stateId:_id,
            }
        ));
    }, []);

    const handleUse = React.useCallback((e, actorId, _id) => {
        dispatch(addStar({
            actorId,
            stateId:_id}));
    }, []);
    return (
        <div
            style={{
                width: "100%",
                margin: "10px 0px"
            }}
        >
            <ActorImgCard
                actorName={actorData.name}
                title = {<ActorPanelCardTitle
                    _id={actorData._id}
                    name={actorData.name}
                />}
                type= "state"
                buttonGroup={<ActorPanelImgCardButtonGroup
                    actorId={actorData._id}
                    actorData={actorData}
                />}
                actorId={actorData._id}
                dataList = {actorData.stateList}
                imgWidth={4}
                handleSave={handleSave}
                handleDelete={handleDelete}
                handleUse={handleUse}
                ratio="100%"
                textContent={""}
                readOnly={false}
                description={actorData.description?actorData.description:""}
            />
        </div>
    )
}
