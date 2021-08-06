import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import React from "react";

const { Dragger } = Upload;

const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            // // globalLog(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        // // globalLog('Dropped files', e.dataTransfer.files);
    },
};

const UploadModalContent = () => {
    return (
        <Dragger {...props}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag .zip file to this area to upload</p>
        </Dragger>
    )
}

export default UploadModalContent;
