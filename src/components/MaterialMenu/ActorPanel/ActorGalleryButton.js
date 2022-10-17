import {Button, Dropdown, Menu, Modal, Tooltip} from 'antd';
import {
    DeleteOutlined,
    DeleteTwoTone,
    DragOutlined,
    SearchOutlined,
    UploadOutlined
} from '@ant-design/icons';
import React from 'react';
import {useDispatch} from "react-redux";
import {
    addActor,
    addBackdrop,
    addSpeechChildStar,
    addStar,
    addState,
    deleteActor
} from "../../../redux/features/projectSlice";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import * as UUID from "uuid";
import {ActorDataHandler} from "../../../data/ActorData";


const ActorGalleryButton = props => {
    const {actorId, actorData} = props;
    const dispatch = useDispatch();

    const handleAddActor = () => {
        dispatch(addActor(
            ActorDataHandler.deepCopy(actorData)
        ))
    }

    return (
        <>
            <div  style={{flex: "0 0 90px"}}>

                    <Tooltip title="Use this actor">
                        <Button
                            type="link"
                            shape="circle"
                            size="small"
                            onClick={handleAddActor}
                            icon={<PlusOutlined />}
                        />
                    </Tooltip>
            </div>
        </>
    );
};

export default ActorGalleryButton;
