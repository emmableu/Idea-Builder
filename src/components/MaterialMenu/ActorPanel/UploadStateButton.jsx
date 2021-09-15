import React from 'react';
import { Upload, Button } from 'antd';
import {Tooltip} from "@material-ui/core";
import { UploadOutlined } from '@ant-design/icons';
import axios from "../../../axiosConfig"
import {useDispatch} from "react-redux";
import {addActor, updateStateName} from "../../../redux/features/projectSlice";

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
        // }).then(response => {
        //     dispatch(addActor({
        //         stateList: [{
        //             _id: response.data._id,
        //             name: "Untitled"
        //         }]
        //     }));
        // })


        // callback(img) {
        //     img = img.src;
        //     axios({
        //         method: "post",
        //         url: "/state/upload/img",
        //         data: {img},
        //     }).then(response => {
        //         dispatch(updateStateName(
        //             {
        //                 actorId: actorData._id,
        //                 stateId: response.data._id,
        //                 stateName: stateName,
        //             }
        //         ))
        //     })
        // }
    };


    return (
        <>
            <Upload
                customRequest={uploadImage}
                {...uploadButtonProps}>
                <Tooltip title="Upload new state">
                    <Button type="link" shape="circle"  size="small" icon={<UploadOutlined />} />
                </Tooltip>
            </Upload>
        </>
    );
};

export default UploadStateButton;
