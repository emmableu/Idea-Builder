import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import MenuList from "@material-ui/core/MenuList/MenuList";
import React from "react";
import { Input } from 'antd';
import MenuItem from "@material-ui/core/MenuItem";


const ProjectNameInput = () => {
    return  (
        <Input placeholder="Project Name"/>
    )
}

const BlankProjectMenuItem = (props) => {
    const {setMenuOpen} = props;
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const showModal = (e) => {
        setMenuOpen(false);
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
            <MenuItem onClick={e => showModal(e)}>Blank Project</MenuItem>
            <Modal
                title="New Project"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Create"
                cancelText="Cancel"
            >
                < ProjectNameInput />
            </Modal>
        </>
    );
};


export default BlankProjectMenuItem;
