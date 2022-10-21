import {Button, Dropdown, Menu, Modal, Tooltip} from 'antd';
import {
    DeleteOutlined,
    DeleteTwoTone,
    DragOutlined, ExclamationCircleOutlined,
    SearchOutlined, StarTwoTone,
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
const { confirm } = Modal;


const ActorGalleryButton = props => {
    const {actorId, actorData} = props;
    const dispatch = useDispatch();

    // const handleAddActor = () => {
    //     dispatch(addActor(
    //         ActorDataHandler.deepCopy(actorData)
    //     ))
    //     modal.info(config);
    // }

    const showAddInfo = async (e, actorData) => {
        confirm({
            title: `Add actor ${actorData.name}?`,
            icon: <ExclamationCircleOutlined />,
            content: `Do you want to add the actor ${actorData.name} to your actor list?`,
            okText: 'Yes',
            cancelText: 'No',
            async onOk() {
                    dispatch(addActor(
                        ActorDataHandler.deepCopy(actorData)
                    ))
            },
            onCancel() {
                // // globalLog('Cancel');
            },
        });
    }

    const config = {
        title: 'Actor Added',
        content: (
            <>
                You've added {actorData.name} to your actors.
            </>
        ),
    };

    return (
        <>
            <div  style={{flex: "0 0 90px"}}>

                    <Tooltip title="Use this actor">
                        <Button
                            type="ghost"
                            size="small"
                            onClick={e => {showAddInfo(e, actorData)}}
                            icon={<StarTwoTone twoToneColor={"#FF8C00"}/>}
                        ><span style={{color: "grey"}}><i>Use</i></span></Button>
                    </Tooltip>
            </div>
        </>
    );
};

export default ActorGalleryButton;
