import {Button, Modal, Tooltip} from 'antd';
import {
    DeleteTwoTone,
    DragOutlined,
    SearchOutlined,
    UploadOutlined
} from '@ant-design/icons';
import React from 'react';
import {useDispatch} from "react-redux";
import {addSpeechChildStar, deleteActor} from "../../../redux/features/projectSlice";
import {Add} from "@material-ui/icons";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import globalConfig from "../../../globalConfig";
import * as UUID from "uuid";
import {toPng} from "html-to-image";
import {ProjectAPI} from "../../../api/ProjectAPI";
import {DecorDialog} from "./DecorDialog/DecorDialog";
import UploadStateButton from "./UploadStateButton";

const ActorPanelImgCardButtonGroup = props => {
    const {actorId, actorData} = props;
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [okPressed, setOkPressed] = React.useState(false);
    const [cancelPressed, setCancelPressed] = React.useState(false);
    const [okEnabled, setOkEnabled] = React.useState(false);

    const handleDeleteActor = (e) => {
        dispatch(deleteActor(actorId));

    }

    const handleOk = React.useCallback(() => {
        setOkPressed(true);
        setIsModalVisible(false);
    }, [])


    const handleCancel = () => {
        setCancelPressed(true);
        setIsModalVisible(false);
    };
    return (
        <>
            <div  style={{flex: "0 0 90px"}}>
                <UploadStateButton
                    actorId={actorId}
                />

                <Tooltip title="Add state">
                    <Button
                        type="link"
                        shape="circle"
                        size="small"
                        onClick={(e) => {setIsModalVisible(true)}}
                        icon={<PlusOutlined />}
                    />
                </Tooltip>
                <Tooltip title="Delete actor">
                    <Button
                        type="link"
                        shape="circle"
                        size="small"
                        onClick={handleDeleteActor}
                        icon={<DeleteTwoTone twoToneColor="#eb2f96" />}
                    />
                </Tooltip>
            </div>
            <Modal
                title={"Add state"}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Create"
                cancelText="Cancel"
                okButtonProps={
                    { disabled: !okEnabled}
                }
            >
                <DecorDialog
                    actorData={actorData}
                    okPressed={okPressed}
                    setOkPressed={setOkPressed}
                    cancelPressed={cancelPressed}
                    setCancelPressed={setCancelPressed}
                    setOkEnabled={setOkEnabled}
                />
            </Modal>
        </>
    );
};

export default ActorPanelImgCardButtonGroup;
