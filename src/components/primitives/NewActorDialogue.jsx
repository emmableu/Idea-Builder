import {Modal, Button, Space, Dropdown} from 'antd';
import React from 'react';
import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import {addActor, addStoryboard} from "../../redux/features/projectSlice";
import Paper from "@material-ui/core/Paper";
import globalConfig from "../../globalConfig";
import axios from "../../axiosConfig";

const NewActorDialogue = React.memo(props => {
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
                centered
                title="New Actor"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={
                    { disabled: newActorName===""}
                }
                okText="Create"
                cancelText="Cancel"
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                }}>
                <Paper
                    style={{width: 100, height: 100, margin:"20px 20px"}}
                    variant="outlined"
                >
                    <img
                        draggable
                        style={{objectFit: "contain",
                            width: '100%',
                            height: '100%',
                        }}
                        src={axios.defaults.baseURL + imgId}
                        alt="img"
                    />
                </Paper>
                <Input
                    onChange={e => setNewActorName(e.target.value)}
                    placeholder="Actor Name"
                />
                </div>
            </Modal>
        </>
    );
});

export default NewActorDialogue;
