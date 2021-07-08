import React from 'react';
import { Upload, message, Button, Tooltip } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from "../../../../../../axiosConfig";
import {useDispatch} from "react-redux";
import {addStateToActorStateList} from "../../../../../../redux/features/projectSlice";

const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text'
    },
    showUploadList: false,
    accept:"image/*",
};

const ActorPanelUploadButton = (props) => {
    const {uuid} = props;
    const [progress, setProgress] = React.useState(0);
    const dispatch = useDispatch();

    const uploadImage = async options => {
        const { onSuccess, onError, file, onProgress } = options;

        const fmData = new FormData();
        const config = {
            headers: { 'content-type': 'multipart/form-data' },
            onUploadProgress: event => {
                const percent = Math.floor((event.loaded / event.total) * 100);
                setProgress(percent);
                if (percent === 100) {
                    setTimeout(() => setProgress(0), 1000);
                }
                onProgress({ percent: (event.loaded / event.total) * 100 });
            }
        };
        fmData.append('file', file);
        axios({
            method: "post",
            url: "/states/new",
            data: fmData,
            config
        }).then(response => {
            dispatch(addStateToActorStateList(JSON.stringify(
         {
             actorUUID: uuid,
             stateUUID: response.data.uuid,
                }
            )))
        })

        // try {
        //     const res = await axios.post(
        //         'https://jsonplaceholder.typicode.com/posts',
        //         fmData,
        //         config
        //     );
        //     onSuccess('Ok');
        //     console.log('server res: ', res);
        // } catch (err) {
        //     console.log('Eroor: ', err);
        //     const error = new Error('Some error');
        //     onError({ err });
        // }
    };


    return (
        <>
            <Upload
                customRequest={uploadImage}
                {...props}>
                <Tooltip title="Upload">
                    <Button type="link" shape="circle" icon={<UploadOutlined />} />
                </Tooltip>
            </Upload>
        </>
    );
};

export default ActorPanelUploadButton;
