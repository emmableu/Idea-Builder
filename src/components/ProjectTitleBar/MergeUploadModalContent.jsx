import {Upload, message, Modal} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import React from "react";
import axios from "../../axiosConfig";
import {addActor} from "../../redux/features/projectSlice";

const { Dragger } = Upload;


const MergeUploadModalContent = (props) => {
    const {isModalVisible, setIsModalVisible} = props;

    const loadProject = file => {
        console.log("file: ", file)
        return;
    };
    // const fakeUpload = async () => {
    //     return await new Promise(() => {setTimeout(() => {return;}, 2000)});
    // };
    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
            setTimeout(() => {
                setIsModalVisible(false);
                success();
            }, 1000)
        }, 2000);
    };
    const uploaderProps = {
        name: 'file',
        multiple: false,
        // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                // // globalLog(info.file, info.fileList);
            }
            if (status === 'done') {
                console.log("success");
                // setIsModalVisible(false);
                // message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                // message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            // // globalLog('Dropped files', e.dataTransfer.files);
        },
    };


    function success() {
        Modal.success({
            title: 'Success!',
            content: (
                <div>
                    <p>Merge success.</p>
                </div>
            ),
            onOk() {},
        });
    }

    return (
        <Dragger
            customRequest={dummyRequest}
            action={loadProject}
            {...uploaderProps}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag .zip file to this area to upload</p>
        </Dragger>
    )
}

export default MergeUploadModalContent;
