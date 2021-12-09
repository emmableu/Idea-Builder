import React from 'react';
import { Upload, Button } from 'antd';
import {Tooltip} from "@material-ui/core";
import { UploadOutlined } from '@ant-design/icons';
import axios from "../../../axios/ideaServerAxiosConfig"
import {useDispatch} from "react-redux";
import {addBackdrop} from "../../../redux/features/projectSlice";

const uploadButtonProps = {
    name: 'file',
    headers: {
        authorization: 'authorization-text'
    },
    showUploadList: false,
    accept:"image/*",
};

const BackdropPanelUploadButton = (props) => {
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
            url: "/backdrop/upload",
            data: fmData,
            config
        }).then(response => {
            dispatch(addBackdrop(response.data._id));
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

export default BackdropPanelUploadButton;
