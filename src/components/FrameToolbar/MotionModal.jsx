import React from "react";
import {Button, Card, Select, Avatar, Input, Modal} from 'antd';
import {useDispatch} from "react-redux";
import {MotionStage} from "./MotionStage";
import {updateStarList} from "../../redux/features/projectSlice";
import * as UUID from "uuid";


export const MotionModal = (props) => {
    const {storyboardId, frameId, selectedStar, selectedActor, backdropStar, isModalVisible, setIsModalVisible,
        setHasMotion, starList,
    } = props;
    const dispatch = useDispatch();
    const [okPressed, setOkPressed] = React.useState(false);

    const handleOk = () => {
        setOkPressed(true);
    };


    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <>
            {selectedStar !== null && selectedActor !== undefined && selectedActor !== null &&
            <Modal
                title={"Record motion for " + selectedActor.name}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Add motion"
                cancelText="Cancel"
            >
                <MotionStage
                    storyboardId={storyboardId}
                    frameId={frameId}
                    backdropStar={backdropStar}
                    starList={starList}
                    selectedStar={selectedStar}
                    setHasMotion={setHasMotion}
                    okPressed={okPressed}
                    setOkPressed={setOkPressed}
                    setIsModalVisible={setIsModalVisible}
                />
            </Modal>
            }


        </>
    )
}


