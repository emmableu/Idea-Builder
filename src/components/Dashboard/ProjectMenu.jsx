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
            style={{ width: 'inherit' , zIndex: "-1", backgroundColor: "inherit"}}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
        >
            <Menu.Item
                key="1"
                style={{zIndex: "0"}}
            >My projects</Menu.Item>
            <Menu.Item
                style={{zIndex: "0"}}
                key="2">Example projects</Menu.Item>
        </Menu>
    );
};

export default ProjectMenu;
