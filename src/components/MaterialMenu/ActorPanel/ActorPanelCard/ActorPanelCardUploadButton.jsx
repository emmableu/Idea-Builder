import React from 'react';
import { Upload, message, Button, Tooltip } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from "../../../../axiosConfig";
import {useDispatch} from "react-redux";
import {addState} from "../../../../redux/features/projectSlice";

const uploadButtonProps = {
    name: 'file',
    headers: {
        authorization: 'authorization-text'
    },
    showUploadList: false,
    accept:"image/*",
};

const ActorPanelCardUploadButton = (props) => {
    const {_id} = props;
    const [progress, setProgress] = React.useState(0);
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
            dispatch(addState(
         {
             actorId: _id,
             stateId: response.data._id,
                }
            ))
        })

        // try {
        //     const res = await axios.post(
        //         'https://jsonplaceholder.typicode.com/posts',
        //         fmData,
        //         config
        //     );
        //     onSuccess('Ok');
        //     // console.log('server res: ', res);
        // } catch (err) {
        //     // console.log('Eroor: ', err);
        //     const error = new Error('Some error');
        //     onError({ err });
        // }
    };


    return (
        <>
            <Upload
                customRequest={uploadImage}
                {...uploadButtonProps}>
                <Tooltip title="Upload">
                    <Button type="link" shape="circle"  size="small" icon={<UploadOutlined />} />
                </Tooltip>
            </Upload>
        </>
    );
};

export default ActorPanelCardUploadButton;
