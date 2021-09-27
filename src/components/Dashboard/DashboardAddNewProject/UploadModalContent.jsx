import {Upload, message, Modal} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import React from "react";
import JSZip from  'jszip';
import {useDispatch} from "react-redux";
import { useRouteMatch, useHistory } from 'react-router-dom';
import {insertProjectToDatabase} from "../../../redux/features/projectSlice";
import {ProjectDataHandler} from "../../../data/ProjectData";
const { Dragger } = Upload;


const UploadModalContent = (props) => {
    const {isModalVisible, setIsModalVisible} = props;
    const [currentFileList, setCurrentFileList] = React.useState([]);
    const match = useRouteMatch();
    const history = useHistory();
    const dispatch = useDispatch();


    // const fakeUpload = async () => {
    //     return await new Promise(() => {setTimeout(() => {return;}, 2000)});
    // };
    const dummyRequest = async ({ file, onSuccess, onError }) => {
        const zip = await JSZip.loadAsync(file);
        for (const filename of Object.keys(zip.files)) {
            if (filename.endsWith("project.json")) {
                const fileData = await zip.files[filename].async('text');
                const projectData = ProjectDataHandler.deepCopy(JSON.parse(fileData));
                await dispatch(insertProjectToDatabase(projectData));
                history.push(`${match.url}/${projectData._id}`);
                onSuccess();
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

export default UploadModalContent;

