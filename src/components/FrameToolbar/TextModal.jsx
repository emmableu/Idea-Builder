import React from "react";
import {Button, Card, Select, Avatar, Input, Modal} from 'antd';
import Box from "@material-ui/core/Box";
import './SpeechBubble.css'
import SpeechBubbleEdiText from "./SpeechBubbleEdiText";
import axios from "../../axios/ideaServerAxiosConfig";
import { toPng } from 'html-to-image';
import * as UUID from "uuid"
import {ProjectAPI} from "../../api/ProjectAPI";
import {useDispatch} from "react-redux";
import {addFrameText, addSpeechChildStar} from "../../redux/features/projectSlice";
import globalConfig, {globalLog} from "../../globalConfig";
import FrameTextEdiText from "./FrameTextEdiText";




export const TextModal = (props) => {
    const {storyboardId, frameId, isTextModalVisible, setIsTextModalVisible} = props;
    const bubbleRef = React.useRef(null);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const dispatch = useDispatch();

    const handleOk = React.useCallback(() => {
        if (bubbleRef.current === null) {
            return
        }
        setConfirmLoading(true);
        const textId = globalConfig.imageServer.student.text + UUID.v4() + ".png";
        toPng(bubbleRef.current, { cacheBust: true, })
            .then((dataUrl) => {
                ProjectAPI.sendFrameTextImg({
                    _id: textId,
                    img: dataUrl}
                ).then( res => {
                        dispatch(addFrameText({
                            storyboardId, frameId,
                            textId,
                            type: "text"
                        }))
                        setConfirmLoading(false);
                        setIsTextModalVisible(false);
                    }
                )
            })
            .catch((err) => {
                globalLog(err)
            })
    }, [bubbleRef])


    const handleCancel = () => {
        setIsTextModalVisible(false);
    };
    return (
        <>
                <Modal
                    title={"Add Text"}
                    visible={isTextModalVisible}
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
                        <Box
                            ref={bubbleRef}
                            style={{
                                padding: "0px 10px",
                            }}
                        >
                            <FrameTextEdiText/>

                        </Box>
                    </Box>
                </Modal>


        </>
    )
}


