import React from "react";
import {Button, Card, Select, Avatar, Input, Modal} from 'antd';
import {useDispatch} from "react-redux";
import {MotionContainer} from "./MotionContainer";
import axios from "../../axios/ideaServerAxiosConfig";
import {DecorDialog} from "../MaterialMenu/ActorPanel/DecorDialog/DecorDialog";


export const MotionModal = (props) => {
    const {storyboardId, frameId, selectedStar, selectedActor, backdropStar, isModalVisible, setIsModalVisible,
         starList,
    } = props;
    const [okPressed, setOkPressed] = React.useState(false);
    const [cancelPressed, setCancelPressed] = React.useState(false);
    const [okEnabled, setOkEnabled] = React.useState(false);
    const headline = selectedActor?"   Record motion for  " + selectedActor.name: "   Record motion";
    const handleOk = () => {
        setIsModalVisible(false);
        setOkPressed(true);
    };


    const handleCancel = () => {
        setIsModalVisible(false);
        setCancelPressed(true);
    };
    return (
        <>
            {selectedStar !== null &&
            <Modal
                title={
                    <>
                    <Avatar src={axios.defaults.baseURL + selectedStar.prototypeId}
                    />
                    <span>{ headline }</span>
                    </>
                    }
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Add motion"
                cancelText="Cancel"
                okButtonProps={
                    { disabled: !okEnabled}
                }
            >
                <MotionContainer
                    storyboardId={storyboardId}
                    frameId={frameId}
                    backdropStar={backdropStar}
                    starList={starList}
                    selectedStar={selectedStar}
                    okPressed={okPressed}
                    setOkPressed={setOkPressed}
                    cancelPressed={cancelPressed}
                    setCancelPressed={setCancelPressed}
                    setOkEnabled={setOkEnabled}
                />
            </Modal>
            }


        </>
    )
}


