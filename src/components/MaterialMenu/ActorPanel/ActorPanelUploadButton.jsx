import React from 'react';
import { Upload, message, Button, Tooltip } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from "../../../axiosConfig"
import {useDispatch} from "react-redux";
import {addActor} from "../../../redux/features/projectSlice";

const uploadButtonProps = {
    name: 'file',
    headers: {
        authorization: 'authorization-text'
    },
    showUploadList: false,
    accept:"image/*",
};

const ActorPanelUploadButton = (props) => {
    const dispatch = useDispatch();

    const uploadImage = async options => {
        const { file } = options;

        const fmData = new FormData();
        const config = {
            headers: { 'content-type': 'multipart/form-data' },
        };
        fmData.append('file', file);
        axios({
            method: "post",
            url: "/state/upload",
            data: fmData,
            config
        }).then(response => {
            dispatch(addActor({
                stateList: [{
                    _id: response.data._id,
                    name: "Untitled"
                }]
                }));
            })
        };


    return (
        <>
            <Upload
                customRequest={uploadImage}
                {...uploadButtonProps}>
                <Tooltip title="Upload">
                    <Button type="link" shape="circle"  size="medium" icon={<UploadOutlined />} />
                </Tooltip>
            </Upload>
        </>
    );
};

export default ActorPanelUploadButton;
