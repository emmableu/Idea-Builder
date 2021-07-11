import {Input} from "antd";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateActorName} from "../../../../redux/features/projectSlice";

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

export default ActorPanelCardTitle;
