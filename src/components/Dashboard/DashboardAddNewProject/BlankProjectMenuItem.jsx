import { Modal } from 'antd';
import React from 'react';
import { Input } from 'antd';
import MenuItem from '@material-ui/core/MenuItem';
import * as UUID from 'uuid';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { insertEmptyProjectToDatabase } from '../../../redux/features/projectSlice';
import { useDispatch } from 'react-redux';

const BlankProjectMenuItem = props => {
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [newProjectName, setNewProjectName] = React.useState("");
    const match = useRouteMatch();
    const history = useHistory();
    const dispatch = useDispatch();

    const showModal = e => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        setConfirmLoading(true);
        const newProjectId = UUID.v4();
        try {
            await dispatch(
                insertEmptyProjectToDatabase( { _id: newProjectId, name: newProjectName })
            );
            setIsModalVisible(false);
            setConfirmLoading(false);
            history.push(`${match.url}/${newProjectId}`);
        } catch (rejectedValueOrSerializedError) {
            console.log('Error: ', rejectedValueOrSerializedError);
        }
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
                okButtonProps={
                   { disabled: newProjectName===""}
                }
                confirmLoading={confirmLoading}
                cancelText="Cancel"
            >
                <Input
                    onChange={e => setNewProjectName(e.target.value)}
                    placeholder="Project Name"
                />
            </Modal>
        </>
    );
};

export default BlankProjectMenuItem;
