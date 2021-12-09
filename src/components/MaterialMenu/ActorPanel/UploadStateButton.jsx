import React from 'react';
import { Upload, Button } from 'antd';
import {Tooltip} from "@material-ui/core";
import { UploadOutlined } from '@ant-design/icons';
import axios from "../../../axios/ideaServerAxiosConfig"
import {useDispatch} from "react-redux";
import {addActor, updateStateName} from "../../../redux/features/projectSlice";
import MenuItem from '@material-ui/core/MenuItem';

const uploadButtonProps = {
    name: 'file',
    headers: {
        authorization: 'authorization-text'
    },
    showUploadList: false,
    accept:"image/*",
};

const UploadStateButton = (props) => {
    const {actorId} = props;
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
            config}).then(response => {
            dispatch(updateStateName(
                {
                    actorId,
                    stateId: response.data._id,
                    stateName: "untitled",
                }
            ))
        })
    };


    return (
        <>
            <Upload
                customRequest={uploadImage}
                {...uploadButtonProps}>
                    <MenuItem> Upload new state</MenuItem>
            </Upload>
        </>
    );
};

export default UploadStateButton;
