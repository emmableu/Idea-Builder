import React from "react";
import {Button, Card, Select, Avatar, Input, Modal} from 'antd';
import Box from "@material-ui/core/Box";
import './SpeechBubble.css'
import SpeechBubbleEdiText from "./SpeechBubbleEdiText";
import axios from "../../axiosConfig";
import { toPng } from 'html-to-image';
import * as UUID from "uuid"
import {ProjectAPI} from "../../api/ProjectAPI";
import {useDispatch} from "react-redux";
import {addSpeechChildStar} from "../../redux/features/projectSlice";
import globalConfig from "../../globalConfig";




export const SpeechBubbleModal = (props) => {
    const {storyboardId, frameId, selectedStar, selectedActor, isModalVisible, setIsModalVisible, setHasSpeechBubble} = props;
    const bubbleRef = React.useRef(null);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const dispatch = useDispatch();

    const handleOk = React.useCallback(() => {
        if (bubbleRef.current === null) {
            return
        }
        setConfirmLoading(true);
        const childStarPrototypeId = globalConfig.imageServer.student.speech + UUID.v4() + ".png";
        toPng(bubbleRef.current, { cacheBust: true, })
            .then((dataUrl) => {
                ProjectAPI.sendSpeechBubbleImg({
                    _id: childStarPrototypeId,
                    img: dataUrl}
                ).then( res => {
                        dispatch(addSpeechChildStar({
                            storyboardId, frameId,
                            starId: selectedStar._id,
                            childStarPrototypeId,
                            type: "speech"
                        }))
                        setConfirmLoading(false);
                        setIsModalVisible(false);
                        setHasSpeechBubble(true)
                    }
                )
            })
            .catch((err) => {
                console.log(err)
            })
        }, [bubbleRef])


    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
            <>
                {selectedStar !== null && selectedActor !== undefined && selectedActor !== null &&
                <Modal
                    title={selectedActor.name + " says..."}
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    confirmLoading={confirmLoading}
                    okText="Create"
                    cancelText="Cancel"
                >
                    <Box
                        style={{
                        display: "flex",
                        height: "inherit",
                        padding: "0px 10px",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                    }}>
                        <Avatar src={axios.defaults.baseURL + selectedStar.prototypeId}/>
                        <Box
                            ref={bubbleRef}
                            style={{
                                padding: "0px 10px",
                            }}
                        >
                             <div className={`bubble-container left`}
                             key={0}>
                            <div className={`bubble me`}>
                                <SpeechBubbleEdiText/>

                            </div>
                        </div>
                        </Box>
                    </Box>
                </Modal>
                }


            </>
    )
}


