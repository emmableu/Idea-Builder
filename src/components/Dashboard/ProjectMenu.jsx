import React from 'react';
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import {
    AppstoreOutlined,
    MailOutlined,
    SettingOutlined
} from '@ant-design/icons';

const { SubMenu } = Menu;

const ProjectMenu = () => {
    const handleClick = e => {
        console.log('click ', e);
    };

    return (
        <Menu
            onClick={handleClick}
            style={{ width: 'inherit' , zIndex: "-1"}}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
        >
            <Menu.Item key="1">My projects</Menu.Item>
            <Menu.Item key="2">Example projects</Menu.Item>
        </Menu>
    );
};

export default ProjectMenu;
