import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import MenuList from "@material-ui/core/MenuList/MenuList";
import React from "react";
import { Input } from 'antd';
import MenuItem from "@material-ui/core/MenuItem";
import {IconButton, Tooltip} from "@material-ui/core";
import {CloudUpload} from "@material-ui/icons";
import MergeUploadModalContent from "./MergeUploadModalContent";



const MergeUploadButton = (props) => {
    const {view, } = props;
    const [isModalVisible, setIsModalVisible] = React.useState(false);


    const showModal = (e) => {
        setIsModalVisible(true);

        setTimeout(()=> {
        }, 500)
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };



    return (
        <>
            <Tooltip title="Merge another project into this">
                <IconButton
                    aria-label="files"
                    size="medium"
                    onClick={showModal}
                    disabled={view}
                >
                    <CloudUpload style={{color:
                            view?null:"white"}}/>
                </IconButton>
            </Tooltip>
            <Modal
                title="Merge another project into the current project"
                visible={isModalVisible}
                footer={[
                    <Button key="Cancel" onClick={handleCancel}>
                        Cancel
                    </Button>]}
            >
                < MergeUploadModalContent
                    isModalVisible={isModalVisible}
                    setIsModalVisible={setIsModalVisible}
                />
            </Modal>
        </>
    );
};


export default MergeUploadButton;
