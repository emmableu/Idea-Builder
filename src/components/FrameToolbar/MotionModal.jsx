import React from "react";
import {Button, Card, Select, Avatar, Input, Modal} from 'antd';
import {useDispatch} from "react-redux";
import {MotionStage} from "./MotionStage";




export const MotionModal = (props) => {
    const {storyboardId, frameId, selectedStar, selectedActor, backdropStar, isModalVisible, setIsModalVisible, setHasMotion, starList} = props;
    const bubbleRef = React.useRef(null);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const dispatch = useDispatch();

    const handleOk = React.useCallback(() => {
       setIsModalVisible(false);
    }, [])


    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <>
            {selectedStar !== null && selectedActor !== undefined && selectedActor !== null &&
            <Modal
                title={"Add motion for " + selectedActor.name}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                confirmLoading={confirmLoading}
                okText="Create"
                cancelText="Cancel"
            >
                <MotionStage
                    frameId={frameId}
                    backdropStar={backdropStar}
                    starList={starList}
                    selectedStar={selectedStar}
                />
            </Modal>
            }


        </>
    )
}


