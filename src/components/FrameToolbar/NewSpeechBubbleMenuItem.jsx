import { Modal } from 'antd';
import React from 'react';
import { Input } from 'antd';
import MenuItem from '@material-ui/core/MenuItem';
import {SpeechBubbleModal} from "./SpeechBubbleModal";

const NewSpeechBubbleMenuItem = props => {

    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [newProjectName, setNewProjectName] = React.useState(null);

    const showModal = e => {
        setIsModalVisible(true);

        setTimeout(() => {}, 500);
    };



    return (
        <>
            <MenuItem onClick={e => showModal(e)}>Add speech bubble</MenuItem>
                <SpeechBubbleModal
                    {...props}
                    isModalVisible={isModalVisible}
                    setIsModalVisible={setIsModalVisible}
                />
        </>
    );
};

export default NewSpeechBubbleMenuItem;
