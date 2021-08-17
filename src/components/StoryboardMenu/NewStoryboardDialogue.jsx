import {Modal, Button, Space, Dropdown} from 'antd';
import {ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons';
import MenuList from '@material-ui/core/MenuList/MenuList';
import React from 'react';
import { Input } from 'antd';
import MenuItem from '@material-ui/core/MenuItem';
import * as UUID from 'uuid';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {addStoryboard} from "../../redux/features/projectSlice";
import StoryboardGallery from "./StoryboardGallery";
import GalleryStepper from "./GalleryStepper";

const NewStoryboardDialogue = props => {
    const {type} = props;
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [newStoryboardName, setNewStoryboardName] = React.useState("");
    const dispatch = useDispatch();

    const showModal = e => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        dispatch(addStoryboard({
            type,
            storyboardName: newStoryboardName}))
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Modal
                width={650}
                title="New Storyboard"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={
                    { disabled: newStoryboardName===""}
                }
                okText="Create"
                cancelText="Cancel"
            >
                <Input
                    onChange={e => setNewStoryboardName(e.target.value)}
                    placeholder="Storyboard Name"
                />
                <GalleryStepper/>
            </Modal>
            <Button
                type="ghost"
                shape="circle"
                style={{"float": "right", fontSize: "100%", color: "white"}}
                onClick={e => showModal(e)}
                icon={<PlusOutlined/>}
                />

        </>
    );
};

export default NewStoryboardDialogue;
