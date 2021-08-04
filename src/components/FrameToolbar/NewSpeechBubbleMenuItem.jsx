import { Modal } from 'antd';
import React from 'react';
import { Input } from 'antd';
import MenuItem from '@material-ui/core/MenuItem';
import {SpeechBubbleModal} from "./SpeechBubbleModal";

const NewSpeechBubbleMenuItem = props => {
    const {storyboardId, frameId, selectedStar, selectedActor, hasSpeechBubble, setHasSpeechBubble} = props
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const showModal = e => {
        setIsModalVisible(true);
        setTimeout(() => {}, 500);
    };




    return (
        <>
            <MenuItem
                disabled={hasSpeechBubble}
                onClick={e => showModal(e)}>Add speech bubble</MenuItem>
                <SpeechBubbleModal
                    storyboardId={storyboardId}
                    frameId={frameId}
                    selectedStar={selectedStar}
                    selectedActor={selectedActor}
                    isModalVisible={isModalVisible}
                    setIsModalVisible={setIsModalVisible}
                    setHasSpeechBubble={setHasSpeechBubble}
                />
        </>
    );
};

export default NewSpeechBubbleMenuItem;
