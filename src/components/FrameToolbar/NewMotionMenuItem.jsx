import { Modal } from 'antd';
import React from 'react';
import { Input } from 'antd';
import MenuItem from '@material-ui/core/MenuItem';
import {MotionModal} from "./MotionModal";

const NewMotionMenuItem = props => {
    const {storyboardId, frameId, selectedStar, selectedActor, backdropStar, starList, hasMotion} = props
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const showModal = e => {
        setIsModalVisible(true);
    };

    return (
        <>
            <MenuItem
                disabled={hasMotion}
                onClick={e => showModal(e)}>Add new motion</MenuItem>
            <MotionModal
                storyboardId={storyboardId}
                frameId={frameId}
                starList={starList}
                selectedStar={selectedStar}
                selectedActor={selectedActor}
                backdropStar={backdropStar}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
            />
        </>
    );
};

export default NewMotionMenuItem;
