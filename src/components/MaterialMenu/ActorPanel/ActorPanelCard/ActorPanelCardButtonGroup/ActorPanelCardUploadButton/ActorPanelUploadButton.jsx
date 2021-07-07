import React from 'react';
import { Upload, message, Button, Tooltip } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text'
    },
    showUploadList: false,
    accept:"image/*"
};

const ActorPanelUploadButton = () => {
    return (
        <>
            <Upload {...props}>
                <Tooltip title="Upload">
                    <Button type="link" shape="circle" icon={<UploadOutlined />} />
                </Tooltip>
            </Upload>
        </>
    );
};

export default ActorPanelUploadButton;
