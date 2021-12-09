import {Upload, message, Modal} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import React from "react";
import axios from "../../axios/ideaServerAxiosConfig";
import {addActor, mergeProject} from "../../redux/features/projectSlice";
import JSZip from  'jszip';
import {useDispatch} from "react-redux";

const { Dragger } = Upload;


const MergeUploadModalContent = (props) => {
    const {isModalVisible, setIsModalVisible} = props;
    const dispatch = useDispatch();
    const [currentFileList, setCurrentFileList] = React.useState([]);


    // const fakeUpload = async () => {
    //     return await new Promise(() => {setTimeout(() => {return;}, 2000)});
    // };
    const dummyRequest = async ({ file, onSuccess, onError }) => {
        const zip = await JSZip.loadAsync(file);
        for (const filename of Object.keys(zip.files)) {
            if (filename.endsWith("project.json")) {
                const fileData = await zip.files[filename].async('text');
                await dispatch(mergeProject(JSON.parse(fileData)));
                onSuccess("ok");
                setTimeout(() => {
                    setIsModalVisible(false);
                    success();
                }, 100)
                setCurrentFileList([]);
                return;
            }
        }
        onError("error")
        Modal.error({
            title: 'Merge error',
            content: 'Cannot find project.json file inside the zip folder',
        });
    };

    const handleChange = ({fileList}) => {
        setCurrentFileList(fileList);
    }
    const uploaderProps = {
        name: 'file',
        multiple: false,
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
            fileList={currentFileList}
            onChange={handleChange}
            {...uploaderProps}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag .zip file to this area to upload</p>
        </Dragger>
    )
}

export default MergeUploadModalContent;
