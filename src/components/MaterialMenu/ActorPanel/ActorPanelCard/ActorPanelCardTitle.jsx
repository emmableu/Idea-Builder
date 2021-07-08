import {Input} from "antd";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateActorName} from "../../../../redux/features/projectSlice";

const ActorPanelCardTitle = (props) => {
    const {uuid} = props;
    const dispatch = useDispatch();
    const actorName = useSelector(state =>
        state.project.value===null? "":state.project.value.actorDataMap[uuid].name
    );
    return (
        <>
            <Input
                onChange={e => dispatch(
                    updateActorName(JSON.stringify({
                        uuid: uuid,
                        name: e.target.value
                    }))
                )}
                value={actorName}
                placeholder="Enter actor name"
                bordered={false}
            />
        </>
    )
}

export default ActorPanelCardTitle;
