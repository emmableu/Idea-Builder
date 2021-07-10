import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import MenuList from "@material-ui/core/MenuList/MenuList";
import React from "react";
import { Input } from 'antd';
import MenuItem from "@material-ui/core/MenuItem";
import UploadModalContent from "./UploadModalContent";



const UploadProjectMenuItem = (props) => {
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
            <MenuItem onClick={e => showModal(e)}>Upload Project</MenuItem>
            <Modal
                title="Upload Zipped Project"
                visible={isModalVisible}
                footer={[
                    <Button key="Cancel" onClick={handleCancel}>
                        Cancel
                    </Button>]}
            >
                < UploadModalContent />
            </Modal>
        </>
    );
};


export default UploadProjectMenuItem;
