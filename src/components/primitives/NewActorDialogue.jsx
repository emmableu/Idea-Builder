import {Modal, Button, Space, Dropdown} from 'antd';
import React from 'react';
import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import {addActor, addStoryboard} from "../../redux/features/projectSlice";

const NewActorDialogue = props => {
    const {isModalVisible, setIsModalVisible, imgId} = props;
    const [newActorName, setNewActorName] = React.useState("");
    const dispatch = useDispatch();



    const handleOk = async () => {
        dispatch(addActor(
            {
                stateList: [{
                    _id: imgId,
                    name: "",
                }],
                name: newActorName,
            }
        ))
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Modal
                width={300}
                title="New Actor"
                style={{zIndex: 20}}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={
                    { disabled: newActorName===""}
                }
                okText="Create"
                cancelText="Cancel"
            >
                <Input
                    onChange={e => setNewActorName(e.target.value)}
                    placeholder="Actor Name"
                />
            </Modal>

        </>
    );
};

export default NewActorDialogue;
