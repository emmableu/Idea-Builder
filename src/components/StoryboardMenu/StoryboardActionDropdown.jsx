import React from 'react';
import { Menu, Dropdown } from 'antd';
import {IconButton} from '@material-ui/core'
import MoreIcon from '@material-ui/icons/MoreVert';
import globalConfig from "../../globalConfig";
import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined, CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import {deleteStoryboard} from "../../redux/features/projectSlice";
import {useDispatch} from "react-redux";
import {setSelectedStoryboardId} from "../../redux/features/projectSlice";

const { confirm } = Modal;



const StoryboardActionDropdown  = (props) => {
    const {storyboardId} = props;
    const dispatch = useDispatch();


    const showDeleteConfirm = async (e, storyboardId) => {
        confirm({
            title: 'Are you sure you want to delete this storyboard?',
            icon: <ExclamationCircleOutlined />,
            content: 'This action is irreversible.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            async onOk() {
                dispatch(deleteStoryboard(storyboardId));
            },
            onCancel() {
                // // globalLog('Cancel');
            },
        });
    }


    const actionMenu = (storyboardId) => {
        return (
            <Menu
            >
                {/*<Menu.Item*/}
                {/*    key="1"*/}
                {/*    icon={<CopyOutlined />}*/}
                {/*>Duplicate</Menu.Item>*/}
                <Menu.Item
                    key="2"
                    icon={<DeleteOutlined />}
                    onClick={e => {showDeleteConfirm(e, storyboardId)}}>
                    Delete
                </Menu.Item>
            </Menu>
        )};


    return (
        <Dropdown overlay={actionMenu(storyboardId)} placement="bottomLeft">
            <IconButton aria-label="display more actions"
                            color="inherit"
                            size="small">
                    <MoreIcon
                    />
                </IconButton>
         </Dropdown>
    )
};

export default StoryboardActionDropdown;

