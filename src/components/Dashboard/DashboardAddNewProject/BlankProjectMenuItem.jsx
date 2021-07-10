import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import MenuList from "@material-ui/core/MenuList/MenuList";
import React from "react";
import { Input } from 'antd';
import MenuItem from "@material-ui/core/MenuItem";
import * as UUID from "uuid";


const BlankProjectMenuItem = (props) => {
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [newProjectName, setNewProjectName] = React.useState(null);

    const showModal = (e) => {
        setIsModalVisible(true);

        setTimeout(()=> {
        }, 500)
    };

    const handleOk = () => {
        setConfirmLoading(true);
        const newProjectUUID = UUID.v4();
        await dispatch(insertNewProjectToDatabase(
            JSON.stringify({newProjectUUID,
                newProjectName})));
        setIsModalVisible(false);
        setConfirmLoading(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <MenuItem onClick={e => showModal(e)}>Blank Project</MenuItem>
            <Modal
                title="New Project"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Create"
                confirmLoading={confirmLoading}
                cancelText="Cancel"
            >
                <Input
                    onChange={(e) => setNewProjectName(e.target.value)}
                    placeholder="Project Name"
                />
            </Modal>
        </>
    );
};


export default BlankProjectMenuItem;
