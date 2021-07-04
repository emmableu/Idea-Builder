import React from 'react';
import { Menu, Dropdown } from 'antd';
import {IconButton} from '@material-ui/core'
import MoreIcon from '@material-ui/icons/MoreVert';
import globalConfig from "../../globalConfig";
import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined, CopyOutlined, DeleteOutlined } from '@ant-design/icons';

const { confirm } = Modal;
const showDeleteConfirm = () => {
    confirm({
        title: 'Are you sure you want to delete this storyboard?',
        icon: <ExclamationCircleOutlined />,
        content: 'This action is irreversible.',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
            console.log('OK');
        },
        onCancel() {
            console.log('Cancel');
        },
    });
}


const actionMenu =
     (
        <Menu
        >
            <Menu.Item
                key="1"
                icon={<CopyOutlined />}
            >Duplicate</Menu.Item>
            <Menu.Item
                key="2"
                icon={<DeleteOutlined />}
                onClick={showDeleteConfirm}>
                Delete
            </Menu.Item>
        </Menu>
    );

const StoryboardActionDropdown  = () => {
    return (
    <Dropdown overlay={actionMenu}>
        <IconButton aria-label="display more actions" color="inherit" size="small">
            <MoreIcon
            />
        </IconButton>
    </Dropdown>
    )
};

export default StoryboardActionDropdown;
