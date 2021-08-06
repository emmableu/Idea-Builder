import React from "react";
import {Button, Card, Select, Avatar, Input, Modal} from 'antd';
import {useDispatch} from "react-redux";
import {MotionStage} from "./MotionStage";
import axios from "../../axiosConfig";


export const MotionModal = (props) => {
    const {storyboardId, frameId, selectedStar, selectedActor, backdropStar, isModalVisible, setIsModalVisible,
         starList,
    } = props;
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
                title={
                    <>
                    <Avatar src={axios.defaults.baseURL + selectedStar.prototypeId}
                    />
                    <span>{"   Record motion for " + selectedActor.name }</span>
                    </>
                    }
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
                    okPressed={okPressed}
                    setOkPressed={setOkPressed}
                    setIsModalVisible={setIsModalVisible}
                />
            </Modal>
            }


        </>
    )
}


