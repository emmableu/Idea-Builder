import ActorPanelButtonGroup from "./ActorPanelButtonGroup";
import ImgCard from "../../primitives/ImgCard/ImgCard";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {addStar, deleteActor, deleteState, updateActorName} from "../../../redux/features/projectSlice";
import {Input} from "antd";
import Grid from "@material-ui/core/Grid";
import ActorPanelImgCardButtonGroup from "./ActorPanelImgCardButtonGroup";

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

const ActorPanelImgButtonGroup = (props) => {

}


export const ActorPanelImgCard = (props) => {
    const {actorData} = props;
    const dispatch = useDispatch();

    const handleSave = React.useCallback((data) => {
        const {_id, name} = data;
        dispatch(
            updateActorName({
                "_id": _id,
                "name": name
            }));
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
        <ImgCard
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
            imgWidth={5}
            handleSave={null}
            handleDelete={handleDelete}
            handleUse={handleUse}
            ratio="100%"
    />
        </div>
    )
}
