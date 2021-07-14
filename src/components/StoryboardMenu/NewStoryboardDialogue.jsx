import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import MenuList from '@material-ui/core/MenuList/MenuList';
import React from 'react';
import { Input } from 'antd';
import MenuItem from '@material-ui/core/MenuItem';
import * as UUID from 'uuid';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { insertEmptyProjectToDatabase } from '../../../redux/features/projectSlice';
import { useDispatch } from 'react-redux';

const NewStoryboardDialogue = props => {
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [newProjectName, setNewProjectName] = React.useState(null);
    const match = useRouteMatch();
    const history = useHistory();
    const dispatch = useDispatch();

    const showModal = e => {
        setIsModalVisible(true);

        setTimeout(() => {}, 500);
    };

    const handleOk = async () => {
        setConfirmLoading(true);
        const newProjectId = UUID.v4();
        try {
            const originalPromiseResult = await dispatch(
                insertEmptyProjectToDatabase(
                    JSON.stringify({ newProjectId, newProjectName })
                )
            ).unwrap();
            setIsModalVisible(false);
            setConfirmLoading(false);
            history.push(`${match.url}/${newProjectId}`);
        } catch (rejectedValueOrSerializedError) {
            // console.log('Error: ', rejectedValueOrSerializedError);
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

export default NewStoryboardDialogue;